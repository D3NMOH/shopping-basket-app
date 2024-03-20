// Login.js
import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { globalStyles } from "../styles/global";
import { UserContext } from "../context/UserProvider";
import { Link, useNavigation, useRouter } from "expo-router";
import { COLORS } from "../styles/constants";
import { FontAwesome } from "@expo/vector-icons";
import avatar from "../assets/avatar.jpeg";
import { Image } from "expo-image";

export default function Login() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const { userName, logIn, logged, logOut, userId, setUserId, setPromocode } =
    useContext(UserContext);
  const [userList, setUserList] = useState([]);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleLogin = () => {
    const selectedUser = userList.find((user) => user._id === selectedUserId);
    if (selectedUser) {
      logIn(selectedUser.username, selectedUser._id);
      navigation.navigate("(products)", {}, { replace: true });
    }
    setModalVisible(false);
  };

  useEffect(() => {
    fetch("https://shopping-basket-backend-u4xp.onrender.com/users")
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleLogout = () => {
    console.log(`Logged out`);
    logOut();
    setPromocode("");
  };

  return (
    <View style={globalStyles.modalContainer}>
      <View style={globalStyles.loginbox}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 0,
            right: -1,
          }}
        >
          <View
            style={{
              textAlign: "right",
              backgroundColor: "#000",
              alignSelf: "flex-end",
              color: "#fff",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomLeftRadius: 7,
            }}
          >
            <FontAwesome name="close" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        {logged === false ? (
          <Text style={[globalStyles.heading, { color: "#000" }]}>Login</Text>
        ) : (
          <View
            style={{ justifyContent: "center", alignItems: "center", gap: 20 }}
          >
            <Text style={[globalStyles.heading, { color: "#000" }]}>
              Hi, {userName}
            </Text>
            <Image
              source={avatar}
              style={{
                borderRadius: 30,
                width: 300,
                height: 300,
                alignSelf: "center",
                margin: "auto",
              }}
            />
          </View>
        )}
        {logged === false ? (
          <>
            {/* <ScrollView>
              {userList.map((user) => (
                <Pressable
                  key={user._id}
                  onPress={() => {
                    setUserId(user._id);
                    setName(user.username);
                  }}
                  style={{
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                  }}
                >
                  <Text>{user.username}</Text>
                </Pressable>
              ))}
            </ScrollView> */}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text
                style={{
                  paddingVertical: 10,
                  textAlign: "center",
                  fontSize: 20,
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: "#000",
                }}
              >
                {selectedUserId
                  ? userList.find((user) => user._id === selectedUserId)
                      .username
                  : "Select user"}
              </Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#00000000",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#000",
                    padding: 20,
                    borderRadius: 10,
                    width: "80%",
                  }}
                >
                  <ScrollView>
                    {userList.map((user) => (
                      <TouchableOpacity
                        key={user._id}
                        onPress={() => {
                          setSelectedUserId(user._id);
                          setModalVisible(false);
                        }}
                        style={{
                          paddingVertical: 10,
                          borderBottomWidth: 0.3,
                          borderBottomColor: "#ffffff44",
                        }}
                      >
                        <Text style={{ textAlign: "center", color: "#fff" }}>
                          {user.username}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
            {/* <TextInput
              style={globalStyles.inputbox}
              placeholder="User name"
              onChangeText={(text) => setName(text)}
              value={name}
            /> */}
          </>
        ) : (
          ""
        )}
        {logged === false ? (
          <TouchableOpacity
            style={globalStyles.loginbutton}
            onPress={handleLogin}
          >
            <Text style={globalStyles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={globalStyles.loginbutton}
            onPress={handleLogout}
          >
            <Text style={globalStyles.loginButtonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

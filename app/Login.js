// Login.js
import React, { cloneElement, useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../styles/global";
import { UserContext } from "../context/UserProvider";
import { Link, useNavigation, useRouter } from "expo-router";
import { COLORS } from "../styles/constants";
import { FontAwesome } from "@expo/vector-icons";
import avatar from "../assets/avatar.jpeg";
import { Image } from "expo-image";

export default function Login() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const { name, logIn, logged, logOut, setPromocode, promocode } =
    useContext(UserContext);
  const router = useRouter();
  const handleLogin = () => {
    console.log(`Username: ${name}`);
    logIn(userName);
    navigation.navigate("(products)", {}, { replace: true });
  };

  const handleLogout = () => {
    console.log(`Logged out`);
    logOut();
  };

  return (
    <View style={globalStyles.modalContainer}>
      <View style={globalStyles.loginbox}>
        <Pressable
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
        </Pressable>
        {logged === false ? (
          <Text style={[globalStyles.heading, { color: "#000" }]}>Login</Text>
        ) : (
          <View
            style={{ justifyContent: "center", alignItems: "center", gap: 20 }}
          >
            <Text style={[globalStyles.heading, { color: "#000" }]}>
              Hi, {name}
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
          <TextInput
            style={globalStyles.inputbox}
            placeholder="User name"
            onChangeText={(text) => setUserName(text)}
            value={userName}
          />
        ) : (
          ""
        )}
        {logged === false ? (
          <Pressable style={globalStyles.loginbutton} onPress={handleLogin}>
            <Text style={globalStyles.loginButtonText}>Submit</Text>
          </Pressable>
        ) : (
          <Pressable style={globalStyles.loginbutton} onPress={handleLogout}>
            <Text style={globalStyles.loginButtonText}>Logout</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

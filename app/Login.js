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
import { Link, useNavigation } from "expo-router";
import { COLORS } from "../styles/constants";
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera/next";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function Login() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const { name, logIn, logged, logOut, setPromocode, promocode } =
    useContext(UserContext);

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
        <Link
          href={"/(products)"}
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
        </Link>
        {logged === false ? (
          <Text style={[globalStyles.heading, { color: "#fff" }]}>Login</Text>
        ) : (
          <Text style={[globalStyles.heading, { color: "#fff" }]}>
            Hi, {name}
          </Text>
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

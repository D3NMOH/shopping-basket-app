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
import { CameraView, useCameraPermissions } from "expo-camera/next";

export default function Login() {
  const navigation = useNavigation();

  const { name, logIn, logged, logOut } = useContext(UserContext);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  if (!permission === null) {
    return <Text>Loading...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={globalStyles.container}>
        <Text>Camera permission is required</Text>
        <Button title="Request permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleLogin = () => {
    console.log(`Username: ${name}`);
    logIn(userName);
    navigation.navigate("(products)", {}, { replace: true });
  };

  const handleLogout = () => {
    console.log(`Logged out`);
    logOut();
  };
  const [userName, setUserName] = useState("");
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.loginbox}>
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
        {logged === true ? (
          <CameraView style={globalStyles.camera} facing={facing}>
            <View style={globalStyles.buttonContainer}>
              <TouchableOpacity
                style={globalStyles.button}
                onPress={toggleCameraFacing}
              >
                <Text style={globalStyles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        ) : (
          ""
        )}
      </View>
    </View>
  );
}

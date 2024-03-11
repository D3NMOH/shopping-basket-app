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
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const { name, logIn, logged, logOut, setPromocode, promocode } =
    useContext(UserContext);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  if (!permission) {
    return <Text>Loading camera...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={globalStyles.container}>
        <Text>Camera permission is required</Text>
        <Pressable
          title="Request permission"
          onPress={requestPermission}
          style={{
            backgroundColor: "#fff",
            height: 40,
            width: 40,
            borderRadius: 7,
            color: "#000",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
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

  const handlePromoCode = (code) => {
    setPromocode(code);
    console.log(promocode.data);
  };

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
          <View style={globalStyles.cameraContainer}>
            <CameraView
              facing={facing}
              style={globalStyles.camera}
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
              onBarcodeScanned={handlePromoCode}
            >
              <View style={globalStyles.buttonContainer}>
                <Pressable
                  onPress={toggleCameraFacing}
                  style={{
                    backgroundColor: "#fff",
                    height: 40,
                    width: 40,
                    borderEndEndRadius: 30,
                    color: "#000",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>
                    <Ionicons
                      name="camera-reverse-sharp"
                      size={25}
                      color={COLORS.primary}
                    />
                  </Text>
                </Pressable>
              </View>
            </CameraView>
            <Text>Promocode: {promocode.data}</Text>
          </View>
        ) : (
          ""
        )}
      </View>
    </View>
  );
}

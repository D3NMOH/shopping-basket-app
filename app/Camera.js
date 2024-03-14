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
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera/next";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function Camera() {
  const navigation = useNavigation();
  const { setPromocode, promocode } = useContext(UserContext);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
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
            height: 60,
            width: 200,
            borderRadius: 7,
            color: "#000",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View>
    );
  }

  const handlePromoCode = (code) => {
    setPromocode(code);
    console.log(promocode.data);
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
        {promocode === "" ? (
          ""
        ) : (
          <View style={globalStyles.promoContainer}>
            <Text style={globalStyles.promotext}>Promocode:</Text>
            <View style={globalStyles.promoblock}>
              <Text style={globalStyles.promocode}>{promocode.data}</Text>
            </View>
          </View>
        )}
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
                style={globalStyles.button}
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
        </View>
      </View>
    </View>
  );
}

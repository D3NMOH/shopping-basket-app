// Login.js
import React, { useContext } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import { UserContext } from "../context/UserProvider";
import { Link, useNavigation, useRouter } from "expo-router";
import { COLORS } from "../styles/constants";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { CartContext } from "../context/context";
import { Image } from "expo-image";
import {
  useFonts,
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";

export default function Cart() {
  const navigation = useNavigation();
  const { promocode, items, setItems } = useContext(UserContext);
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const router = useRouter();
  const totalCost = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

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
        <Text
          style={{
            position: "absolute",
            textAlign: "center",
            alignSelf: "center",
            fontSize: 30,
            top: 10,
            textTransform: "uppercase",
            fontWeight: "700",
          }}
        >
          Shopping cart
        </Text>
        <ScrollView style={{ marginTop: 50 }}>
          {cart.map((product) => {
            const priceDiscount = Math.round(
              (product.price * product.quantity * 0.9 * 10) / 10
            );
            const priceNormal = product.price * product.quantity;
            return (
              <View key={product.id} style={globalStyles.cartItem}>
                <Image
                  source={product.thumbnail}
                  style={[
                    globalStyles.thumbSmall,
                    { alignSelf: "center", width: "60%", objectFit: "contain" },
                  ]}
                />
                <Text
                  style={{
                    fontSize: 20,
                    textTransform: "uppercase",
                    fontWeight: "700",
                  }}
                >
                  {product.title}
                </Text>
                <Text> </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {promocode.data === "PROMO10" ? (
                    <View
                      style={[
                        globalStyles.price,
                        { backgroundColor: COLORS.secondary },
                      ]}
                    >
                      <Text style={[globalStyles.priceText, { color: "#fff" }]}>
                        {priceDiscount}€
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={[globalStyles.price, { backgroundColor: "#000" }]}
                    >
                      <Text style={[globalStyles.priceText, { color: "#fff" }]}>
                        {priceNormal}€
                      </Text>
                    </View>
                  )}
                  <View style={globalStyles.qtyBlock}>
                    <Pressable
                      onPress={() => decreaseQuantity(product.id)}
                      style={globalStyles.qtyButton}
                    >
                      <Text style={globalStyles.qtyText}>-</Text>
                    </Pressable>
                    <Text
                      style={{
                        fontSize: 25,
                        alignSelf: "center",
                      }}
                    >
                      {product.quantity}
                    </Text>
                    <Pressable
                      onPress={() => increaseQuantity(product.id)}
                      style={globalStyles.qtyButton}
                    >
                      <Text style={globalStyles.qtyText}>+</Text>
                    </Pressable>
                  </View>
                </View>
                <Pressable
                  onPress={() => removeFromCart(product.id)}
                  style={[globalStyles.qtyButton, globalStyles.removeButton]}
                >
                  <Text>
                    <FontAwesome name="trash" size={24} color="#fff" />
                  </Text>
                </Pressable>
              </View>
            );
          })}
          {cart.length === 0 ? (
            ""
          ) : (
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor:
                      promocode.data === "PROMO10" ? COLORS.secondary : "#000",
                    padding: 7,
                    borderRadius: 7,
                  }}
                >
                  <Text
                    style={{ fontSize: 20, color: "#fff", fontWeight: "800" }}
                  >
                    Total: {"  "}
                    {promocode.data === "PROMO10"
                      ? Math.round(totalCost * 0.9)
                      : totalCost}
                    €
                  </Text>
                </View>
                <Pressable
                  style={[
                    globalStyles.qtyButton,
                    {
                      width: "auto",
                      flexDirection: "row",
                      gap: 30,
                      alignSelf: "flex-end",
                      paddingHorizontal: 20,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: "#fff",
                      textTransform: "uppercase",
                      fontSize: 20,
                      fontWeight: 600,
                    }}
                  >
                    Checkout
                  </Text>
                  <FontAwesome6 name="wallet" size={24} color="#fff" />
                </Pressable>
              </View>
              <Pressable
                style={[
                  globalStyles.qtyButton,
                  {
                    width: "auto",
                    flexDirection: "row",
                    gap: 30,
                    alignSelf: "center",
                    paddingHorizontal: 20,
                    marginTop: 20,
                    marginBottom: 20,
                    backgroundColor: promocode === "" ? "#000" : "#aaa",
                  },
                ]}
                onPress={() => (promocode === "" ? router.push("/Camera") : "")}
              >
                <Text
                  style={{
                    color: promocode === "" ? "#fff" : "#888",
                    textTransform: "uppercase",
                    fontSize: 20,
                    fontWeight: 600,
                  }}
                >
                  {promocode === "" ? "Apply promocode" : "Promocode applied"}
                </Text>
                <FontAwesome
                  name={promocode === "" ? "qrcode" : "check"}
                  size={24}
                  color={promocode === "" ? "#fff" : "#888"}
                />
              </Pressable>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

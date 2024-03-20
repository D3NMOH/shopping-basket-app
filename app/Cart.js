// Login.js
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
  // const [closePressed, setClosePressed] = useState("#000");
  // const [clearPressed, setClearPressed] = useState("#000");
  // const [checkoutPressed, setCheckoutPressed] = useState("#000");
  const { promocode, userId } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      fetch();
      // `https://shopping-basket-backend-u4xp.onrender.com/users/65f820811e099e8760b1d24e`
      fetch(`https://shopping-basket-backend-u4xp.onrender.com/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.cartItem);
          // console.log(products);
        });
    };

    fetchProducts();
  }, []);
  const clearCart = async () => {
    const response = await fetch(
      `https://shopping-basket-backend-u4xp.onrender.com/users/${userId}/cart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }
    if (response) {
      navigation.navigate("(products)", {}, { replace: true });
    }
  };

  const totalCost =
    products &&
    products.reduce((acc, product) => acc + product.product.price, 0);

  return (
    <View style={globalStyles.modalContainer}>
      <View style={globalStyles.loginbox}>
        <TouchableOpacity
          onPress={() => router.back()}
          // onPressIn={() => setClosePressed("#444")}
          // onPressOut={() => setClosePressed("#000")}
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
          {products &&
            products.map((product) => {
              const priceDiscount = Math.round(
                (product.product.price * 0.9 * 10) / 10
              );
              const priceNormal = product.product.price;
              return (
                <View key={product._id} style={globalStyles.cartItem}>
                  <Image
                    source={product.product.thumbnail}
                    style={[
                      globalStyles.thumbCart,
                      {
                        alignSelf: "center",
                        width: "60%",
                        objectFit: "contain",
                      },
                    ]}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      textTransform: "uppercase",
                      fontWeight: "700",
                    }}
                  >
                    {product.product.productName}
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
                    {promocode === "PROMO10" ? (
                      <View
                        style={[
                          globalStyles.price,
                          { backgroundColor: COLORS.secondary },
                        ]}
                      >
                        <Text
                          style={[globalStyles.priceText, { color: "#fff" }]}
                        >
                          {priceDiscount}€
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={[
                          globalStyles.price,
                          { backgroundColor: "#000" },
                        ]}
                      >
                        <Text
                          style={[globalStyles.priceText, { color: "#fff" }]}
                        >
                          {priceNormal}€
                        </Text>
                      </View>
                    )}
                    <View style={globalStyles.qtyBlock}>
                      <TouchableOpacity
                        onPress={() => decreaseQuantity(product._id)}
                        style={globalStyles.qtyButton}
                      >
                        <Text style={globalStyles.qtyText}>-</Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 25,
                          alignSelf: "center",
                        }}
                      >
                        {product.product.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => increaseQuantity(product._id)}
                        style={globalStyles.qtyButton}
                      >
                        <Text style={globalStyles.qtyText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeFromCart(product._id)}
                    style={[globalStyles.qtyButton, globalStyles.removeButton]}
                  >
                    <Text>
                      <FontAwesome name="trash" size={24} color="#fff" />
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          {!products ? (
            ""
          ) : products.length > 0 ? (
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
                      promocode === "PROMO10" ? COLORS.secondary : "#000",
                    padding: 7,
                    borderRadius: 7,
                  }}
                >
                  <Text
                    style={{ fontSize: 20, color: "#fff", fontWeight: "800" }}
                  >
                    Total: {"  "}
                    {promocode === "PROMO10"
                      ? Math.round(totalCost * 0.9)
                      : totalCost}
                    €
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    globalStyles.qtyButton,
                    {
                      width: "auto",
                      flexDirection: "row",
                      gap: 30,
                      paddingHorizontal: 20,
                    },
                  ]}
                  onPress={() => {
                    clearCart();
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      textTransform: "uppercase",
                      fontSize: 20,
                      fontWeight: 600,
                    }}
                  >
                    Clear the cart
                  </Text>
                  <FontAwesome name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[
                  globalStyles.qtyButton,
                  {
                    width: "auto",
                    flexDirection: "row",
                    gap: 30,
                    alignSelf: "flex-end",
                    paddingHorizontal: 20,
                    marginTop: 20,
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
              </TouchableOpacity>
              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={{ fontSize: 25, textAlign: "center", marginTop: 200 }}>
              Your cart is empty!
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

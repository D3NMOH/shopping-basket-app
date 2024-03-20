import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { Image } from "expo-image";
import { globalStyles } from "../../../styles/global";
// import { goods } from "../../../data/goods";
import { useNavigation, useLocalSearchParams, router } from "expo-router";
// import axios from "axios";
import { UserContext } from "../../../context/UserProvider";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../../styles/constants";
import { CartContext } from "../../../context/context";

export default function ProductDetails({ route }) {
  const { addToCart } = useContext(CartContext);
  const { id } = useLocalSearchParams();
  const { promocode } = useContext(UserContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://shopping-basket-backend-u4xp.onrender.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  return (
    <ScrollView style={globalStyles.productPage}>
      {product && (
        <>
          <Text style={globalStyles.heading}>{product.productName}</Text>

          <View>
            <Image
              source={product.thumbnail}
              contentFit="contain"
              style={globalStyles.thumbnail}
            />
            <View>
              {promocode != "" ? (
                <View style={globalStyles.priceContainer}>
                  <Text style={globalStyles.oldPriceDetail}>
                    {product.price}€
                  </Text>
                  <View style={[globalStyles.price, globalStyles.off]}>
                    <Text style={[globalStyles.priceText, globalStyles.off]}>
                      {Math.round((product.price * 0.9 * 10) / 10)}€
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={globalStyles.price}>
                  <Text style={globalStyles.priceText}>{product.price}€</Text>
                </View>
              )}
            </View>
            <Text style={globalStyles.author}>{product.about}</Text>

            <Text style={globalStyles.rentDuration}>
              There are still {product.availableInStock} pcs available
            </Text>
            <TouchableOpacity
              style={[globalStyles.booksLeft]}
              onPress={() => addToCart(product)}
            >
              <Text style={globalStyles.booksLeftText}>Add to cart</Text>
              <FontAwesome name="shopping-cart" size={35} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.booksLeft,
                { backgroundColor: promocode === "" ? COLORS.primary : "#aaa" },
              ]}
              onPress={() => (promocode === "" ? router.push("/Camera") : "")}
            >
              <Text
                style={[
                  globalStyles.booksLeftText,
                  {
                    color: promocode === "" ? "#000" : "#888",
                    backgroundColor: promocode === "" ? COLORS.primary : "#aaa",
                  },
                ]}
              >
                {promocode === "" ? "Apply promocode!" : "Promocode applied"}
              </Text>
              <FontAwesome
                name={promocode === "" ? "qrcode" : "check"}
                size={35}
                color={promocode === "" ? "#000" : "#888"}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

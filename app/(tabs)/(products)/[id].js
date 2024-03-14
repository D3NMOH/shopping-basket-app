import { View, Text, ScrollView, Pressable } from "react-native";
import { useState, useEffect, useContext } from "react";
import { Image } from "expo-image";
import { globalStyles } from "../../../styles/global";
import { goods } from "../../../data/goods";
import { useNavigation, useLocalSearchParams, router } from "expo-router";
import axios from "axios";
import { UserContext } from "../../../context/UserProvider";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../../styles/constants";
import { CartContext } from "../../../context/context";

export default function BookDetails({ route }) {
  const { addToCart } = useContext(CartContext);
  const { id } = useLocalSearchParams();
  const { promocode, items, setItems } = useContext(UserContext);
  const product = goods.find((product) => product.id === parseInt(id));

  // useEffect(() => {
  //   const fetchBook = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://mini-project-library.onrender.com/books/${id}`
  //       );
  //       const bookData = response.data;
  //       setBook(bookData);
  //       setLoading(false);
  //     } catch (error) {
  //       if (axios.isCancel(error)) {
  //         console.log("Request canceled:", error.message);
  //       } else {
  //         console.log(error);
  //         alert("Something went wrong! Please try again.");
  //       }
  //     }
  //   };

  //   fetchBook();
  // }, [id]);

  // if (loading) {
  //   return (
  //     <View style={globalStyles.container}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  // if (!book) {
  //   return (
  //     <View style={globalStyles.container}>
  //       <Text>No data found.</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={globalStyles.productPage}>
      <Text style={globalStyles.heading}>{product.title}</Text>

      <View>
        <Image
          source={product.thumbnail}
          contentFit="contain"
          style={globalStyles.thumbnail}
        />
        <View>
          {promocode.data === "PROMO10" ? (
            <View style={globalStyles.priceContainer}>
              <Text style={globalStyles.oldPriceDetail}>{product.price}€</Text>
              <View style={[globalStyles.price, globalStyles.off]}>
                <Text style={[globalStyles.priceText, globalStyles.off]}>
                  {Math.round(product.price * 0.9 * 10) / 10}€
                </Text>
              </View>
            </View>
          ) : (
            <View style={globalStyles.price}>
              <Text style={globalStyles.priceText}>{product.price}€</Text>
            </View>
          )}
        </View>
        <Text style={globalStyles.author}>{product.description}</Text>

        <Text style={globalStyles.rentDuration}>
          There are still {product.stock} pcs available
        </Text>
        <Pressable
          style={[globalStyles.booksLeft]}
          onPress={() => addToCart(product)}
        >
          <Text style={globalStyles.booksLeftText}>Add to cart</Text>
          <FontAwesome name="shopping-cart" size={35} color="#000" />
        </Pressable>
        <Pressable
          style={[globalStyles.booksLeft]}
          onPress={() => router.push("/Camera")}
        >
          <Text style={globalStyles.booksLeftText}>Apply promocode!</Text>
          <FontAwesome name="qrcode" size={35} color="#000" />
        </Pressable>
      </View>
    </ScrollView>
  );
}

import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { globalStyles } from "../../../styles/global";
import { goods } from "../../../data/goods";
import { useNavigation, useLocalSearchParams } from "expo-router";
import axios from "axios";

export default function BookDetails({ route }) {
  const { id } = useLocalSearchParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
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
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>{product.title}</Text>

      <View>
        <Image source={product.thumbnail} style={globalStyles.thumbnail} />
        <Text style={globalStyles.author}>Author: {product.author}</Text>
        <Text style={globalStyles.year}>
          Year of publishing: {product.publishYear}
        </Text>
        <Text style={globalStyles.rentDuration}>
          You can rent the book for {product.rentDuration} days
        </Text>
        <View style={[globalStyles.booksLeft]}>
          <Text style={globalStyles.booksLeftText}>
            There are still {product.stock} books left
          </Text>
        </View>
      </View>
    </View>
  );
}

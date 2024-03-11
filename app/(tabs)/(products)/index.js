// Books.js
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import { globalStyles } from "../../../styles/global";
import { goods } from "../../../data/goods";
import { Link } from "expo-router";
import { UserContext } from "../../../context/UserProvider";
import axios from "axios";

export default function Books() {
  const { name, logged } = useContext(UserContext);
  const [allBooks, setAllBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   async function loadAllBooks() {
  //     try {
  //       const response = await axios.get(
  //         `https://mini-project-library.onrender.com/books`
  //       );
  //       console.log("All books:", response.data.data);
  //       setAllBooks(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //       alert("Something went wrong! Please try again.");
  //     }
  //   }
  //   loadAllBooks();
  // }, []);

  // useEffect(() => {
  //   async function loadUserBooks() {
  //     try {
  //       const userResponse = await axios.get(
  //         `https://mini-project-library.onrender.com/users/${name}`
  //       );

  //       console.log("User response:", userResponse.data);
  //       const userBookIds = userResponse.data[0].book.map((book) => book._id);

  //       console.log("User book IDs:", userBookIds);

  //       console.log("All books:", allBooks);

  //       // Проверка наличия книг у пользователя
  //       const userBooksData = allBooks.filter((book) =>
  //         userBookIds.includes(book._id)
  //       );

  //       console.log("Filtered user books:", userBooksData);
  //       setUserBooks(userBooksData);
  //     } catch (error) {
  //       console.log(error);
  //       alert("Something went wrong! Please try again.");
  //     }
  //   }

  //   if (logged && allBooks.length > 0) {
  //     loadUserBooks();
  //   }
  // }, [name, logged, allBooks]);

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <View>
          {goods.map((item) => {
            return (
              <Link
                key={item.id}
                href={logged ? `(products)/${item.id}` : "/Login"}
                asChild
                style={globalStyles.bookbox}
              >
                <Pressable>
                  <View style={[globalStyles.itemContainer]}>
                    <View style={globalStyles.thumbSmallContainer}>
                      <Image
                        source={{ uri: item.thumbnail }}
                        style={[globalStyles.thumbSmall]}
                        contentFit="contain"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={globalStyles.text}>{item.title}</Text>
                      <Text style={globalStyles.smalltext}>{item.author}</Text>
                      <Text style={globalStyles.smalltext}>
                        {item.publishYear}
                      </Text>
                    </View>
                    <View style={globalStyles.bookboxRight}>
                      <Text style={globalStyles.numCopies}>{item.price}</Text>
                    </View>
                  </View>
                </Pressable>
              </Link>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

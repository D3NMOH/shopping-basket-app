import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import { globalStyles } from "../../../styles/global";
import { goods } from "../../../data/goods";
import { Link } from "expo-router";
import { UserContext } from "../../../context/UserProvider";
import { COLORS } from "../../../styles/constants";

export default function ProductList() {
  const { name, logged, promocode } = useContext(UserContext);
  const [goods, setGoods] = useState([]);
  const [pressedButtonId, setPressedButtonId] = useState(null);

  useEffect(() => {
    fetch("https://shopping-basket-backend-u4xp.onrender.com/products")
      .then((response) => response.json())
      .then((data) => setGoods(data.product));
  }, []);

  const handlePressIn = (itemId) => {
    setPressedButtonId(itemId);
    console.log("Pressed item with id:", itemId);
    // Дополнительные действия при нажатии
  };

  const handlePressOut = () => {
    setPressedButtonId(null);
    console.log("Released item");
    // Дополнительные действия при отпускании
  };

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <View>
          {goods &&
            goods.map((item) => {
              return (
                <Link key={item._id} href={`(products)/${item._id}`} asChild>
                  <Pressable
                    onPressIn={() => handlePressIn(item._id)}
                    onPressOut={handlePressOut}
                  >
                    {({ pressed }) => (
                      <View
                        style={[
                          globalStyles.itemContainer,
                          globalStyles.bookbox,
                          pressed && { backgroundColor: COLORS.primary },
                        ]}
                      >
                        <View style={globalStyles.thumbSmallContainer}>
                          <Image
                            source={{ uri: item.thumbnail }}
                            style={[globalStyles.thumbSmall]}
                            contentFit="contain"
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={[
                              globalStyles.text,
                              pressed && { color: "#000" },
                            ]}
                          >
                            {item.productName}
                          </Text>
                        </View>
                        {promocode != "" ? (
                          <>
                            <View style={globalStyles.oldPriceContainer}>
                              <Text style={globalStyles.oldPrice}>
                                {item.price}€
                              </Text>
                            </View>
                            <View style={globalStyles.bookboxRight}>
                              <Text style={globalStyles.numCopies}>
                                {Math.round((item.price * 0.9 * 10) / 10)}€
                              </Text>
                            </View>
                          </>
                        ) : (
                          <View
                            style={[
                              globalStyles.bookboxRight,
                              { backgroundColor: COLORS.primary },
                              pressed && { backgroundColor: "#000" },
                            ]}
                          >
                            <Text
                              style={[
                                globalStyles.numCopies,
                                { color: "#000" },
                                pressed && { color: COLORS.primary },
                              ]}
                            >
                              {item.price}€
                            </Text>
                          </View>
                        )}
                      </View>
                    )}
                  </Pressable>
                </Link>
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
}

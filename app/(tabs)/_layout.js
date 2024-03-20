import { Tabs, Link } from "expo-router";
import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { FontAwesome6, FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../styles/constants";
import { UserContext } from "../../context/UserProvider";

export default function MainTabs() {
  const { userName, logged } = useContext(UserContext);
  console.log(userName, logged);
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 10,
        },
        headerStyle: {
          backgroundColor: COLORS.dark,
        },
        headerTintColor: COLORS.light,
        tabBarStyle: {
          backgroundColor: COLORS.dark,
          height: 0,
        },
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tabs.Screen
        name="(products)"
        options={{
          title: "Products",
          tabBarLabel: "Product list",
          tabBarIcon: ({ color }) => {
            return <FontAwesome6 name="book-open" size={24} color={color} />;
          },

          headerRight: () => {
            return logged === false ? (
              <View>
                <Link href="/Login" asChild>
                  <Pressable style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: COLORS.primary,
                        fontSize: 20,
                      }}
                    >
                      Login
                    </Text>
                    <View style={{ marginHorizontal: 15 }}>
                      <FontAwesome6
                        name="user"
                        size={24}
                        color={COLORS.primary}
                      />
                    </View>
                  </Pressable>
                </Link>
              </View>
            ) : (
              <View>
                <Link href="/Login" asChild>
                  <Pressable style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: COLORS.primary,
                        fontSize: 20,
                      }}
                    >
                      {userName}
                    </Text>
                    <View style={{ marginHorizontal: 15 }}>
                      <FontAwesome6
                        name="user"
                        size={24}
                        color={COLORS.primary}
                      />
                    </View>
                  </Pressable>
                </Link>
              </View>
            );
          },
          headerLeft: () => {
            return logged === false ? (
              <View></View>
            ) : (
              <View>
                <Link href="/Cart" asChild>
                  <Pressable style={{ flexDirection: "row" }}>
                    <View style={{ marginHorizontal: 15 }}>
                      <FontAwesome
                        name="shopping-cart"
                        size={35}
                        color={COLORS.primary}
                      />
                    </View>
                  </Pressable>
                </Link>
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
}

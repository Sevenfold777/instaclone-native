import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Feed from "../screens/Feed";
import { Image } from "react-native";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import Me from "../screens/Me";
import Profile from "../screens/Profile";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";
import Photo from "../screens/Photo";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          borderBottomColor: "rgba(255, 255, 255, 0.3)",
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name={"Feed"}
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{ width: 120, height: 40 }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"Search"} component={Search} />
      ) : null}
      {screenName === "Notification" ? (
        <Stack.Screen name={"Notification"} component={Notification} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}

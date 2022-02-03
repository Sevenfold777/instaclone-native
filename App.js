import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import Asyncstorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import LoggedOutNav from "./navigators/LoggedOutNav";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  /* preloadAssets --> return "Promise" */
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));

    return Promise.all([...fontPromises, ...imagePromises]);
  };

  /* Set Reactive Vars according to AsyncStorage + return preloadAssets */
  const preload = async () => {
    // get token from "Asyncstorage"
    const token = await Asyncstorage.getItem("token");

    // token exists
    if (token) {
      // set reactive var --> fast access (not await)
      isLoggedInVar(true);
      tokenVar(token);
    }

    return preloadAssets();
  };

  // Loading 중
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  // Loading 끝나면
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}

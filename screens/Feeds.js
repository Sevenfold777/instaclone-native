import { useReactiveVar } from "@apollo/client";
import React from "react";
import { Text, View } from "react-native";
import { isLoggedInVar, tokenVar } from "../apollo";

export default function Feeds() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const token = useReactiveVar(tokenVar);
  return (
    <View>
      <Text>{`isLoggedIn: ${isLoggedIn}`}</Text>
    </View>
  );
}

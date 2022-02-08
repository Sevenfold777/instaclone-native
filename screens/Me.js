import React from "react";
import { Text, View } from "react-native";
import { logUserOut } from "../apollo";

export default function Me() {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }} onPress={logUserOut}>
        Me
      </Text>
    </View>
  );
}

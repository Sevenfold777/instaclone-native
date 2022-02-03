import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feeds from "../screens/Feeds";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="feed" component={Feeds} />
    </Tabs.Navigator>
  );
}

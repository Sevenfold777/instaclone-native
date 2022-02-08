import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import { View } from "react-native";
import Notification from "../screens/Notification";
import Me from "../screens/Me";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: "rgba(255,255,255,0.3)",
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="Feed_tab"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Search_tab"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Camera_tab"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"camera"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Camera" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Notification_tab"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"heart"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Notification" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Me_tab"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

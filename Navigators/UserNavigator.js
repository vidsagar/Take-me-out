import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../Screens/Authentication/Login";
import Register from "../Screens/Authentication/Register";
import UserProfile from "../Screens/Authentication/UserProfile";
import AppTabs from "./AppTabs";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AppHome"
        component={AppTabs}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
  return <AuthStack />;
}

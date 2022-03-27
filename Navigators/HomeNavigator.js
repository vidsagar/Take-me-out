import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SavedDates from "../Screens/Dates/SavedDates";
import Search from "../Screens/Search/Search";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SavedDates"
        component={SavedDates}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}

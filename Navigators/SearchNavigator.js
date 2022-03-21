import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Search from "../Screens/Search/Search";
import DateContainer from "../Screens/Dates/DateContainer";
import SavedDates from "../Screens/Dates/SavedDates";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Results"
        component={DateContainer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function SearchNavigator() {
  return <MyStack />;
}

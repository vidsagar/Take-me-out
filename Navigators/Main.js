import React from "react";
import { NavigationContainer } from "@react-navigation/native";

//Stacks
import AppTabs from "./AppTabs";
import UserNavigator from "./UserNavigator";

const Main = () => {
  const user = false;
  return <UserNavigator />;
};

export default Main;

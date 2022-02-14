import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

//Stacks
import HomeNavigator from "./HomeNavigator";
import UserNavigator from "./UserNavigator";
import SearchNavigator from "./SearchNavigator";

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#e91e63",
      }}
    >
        <Tab.Screen
            name = "Home"
            component = {HomeNavigator}
            options = {{
                tabBarIcon: ({color})=>(
                    <Icon 
                        name = "home"
                        style = {{position: "relative"}}
                        color = {color}
                        size={30}
                    />
                )
            }}
        />
        <Tab.Screen
            name = "Search"
            component = {SearchNavigator}
            options = {{
                tabBarIcon: ({color})=>(
                    <Icon 
                        name = "search"
                        style = {{position: "relative"}}
                        color = {color}
                        size={30}
                    />
                )
            }}
        />
        <Tab.Screen
            name = "User"
            component = {UserNavigator}
            options = {{
                tabBarIcon: ({color})=>(
                    <Icon 
                        name = "user"
                        style = {{position: "relative"}}
                        color = {color}
                        size={30}
                    />
                )
            }}
        />
    </Tab.Navigator>
    
  );
};

export default Main;
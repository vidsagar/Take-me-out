import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Register from "../Screens/Authentication/Register";
import Search from "../Screens/Search/Search";
import Home from "../Screens/Home/Home";

const Stack = createStackNavigator()

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = 'Home'
                component = { Home }
                options = {{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name = 'Search'
                component = { Search }
                options = {{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name = 'Account'
                component = { Register }
                options = {{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator(){
    return <MyStack />
};
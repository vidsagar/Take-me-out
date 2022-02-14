import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Search from "../Screens/Search/Search";

const Stack = createStackNavigator()

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = 'Search'
                component = { Search }
                options = {{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function SearchNavigator(){
    return <MyStack />
};
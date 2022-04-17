import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Container, NativeBaseProvider } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseURL from "../../assets/common/baseURL";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";

var { width, height } = Dimensions.get("window");

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login");
      }

      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => setUserProfile(user.data));
        })
        .catch((error) => console.log(error));

      return () => {
        setUserProfile();
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <NativeBaseProvider>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <View style={{ width: "50%", alignItems: "flex-start" }}>
          <Text style={{ margin: 20 }}>
            First Name: {userProfile ? userProfile.fname : ""}
          </Text>
          <Text style={{ margin: 20 }}>
            Last Name: {userProfile ? userProfile.lname : ""}
          </Text>

          <Text style={{ margin: 20 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Button
            title={"Sign Out"}
            onPress={() => [
              AsyncStorage.removeItem("jwt"),
              logoutUser(context.dispatch),
            ]}
          />
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
});

export default UserProfile;

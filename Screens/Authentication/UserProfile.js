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
import Toast from "react-native-toast-message";

import Input from "../../Shared/Form/Input";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
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
      <View
        style={{
          marginTop: 70,
          width: "30%",
          height: 40,
          alignItems: "center",
          alignSelf: "flex-end",
        }}
      >
        <Button
          title={"Sign Out"}
          onPress={() => [
            AsyncStorage.removeItem("jwt"),
            logoutUser(context.dispatch),
          ]}
        />
      </View>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <View style={{ width: "70%", alignItems: "flex-start" }}>
          <Text style={{ margin: 20 }}>
            First Name: {userProfile ? userProfile.fname : ""}
          </Text>
          <Text style={{ margin: 20 }}>
            Last Name: {userProfile ? userProfile.lname : ""}
          </Text>
          <Text style={{ margin: 20 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ marginTop: 20, marginLeft: 20 }}>
            Update Password:
          </Text>
          <View style={{ width: "100%" }}>
            <Input
              placeholder={"New password"}
              name={"password1"}
              id={"password1"}
              value={password1}
              secureTextEntry={true}
              onChangeText={(text) => setPassword1(text)}
            />
            <Input
              placeholder={"Confirm password"}
              name={"password2"}
              id={"password2"}
              value={password2}
              secureTextEntry={true}
              onChangeText={(text) => setPassword2(text)}
            />
          </View>
        </View>
        <View style={{ margin: 20 }}>
          <Button
            title={"Update Password"}
            onPress={() => {
              if (
                password1 != "" &&
                password1.length >= 8 &&
                password1 === password2
              ) {
                [AsyncStorage.removeItem("jwt"), logoutUser(context.dispatch)];
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: "Password changed",
                });
              } else {
                Toast.show({
                  topOffset: 60,
                  type: "error",
                  text1: "Invalid password",
                  text2:
                    "Please make sure your passwords match \nand has more than 8 characters",
                });
              }
            }}
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

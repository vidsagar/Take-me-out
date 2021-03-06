import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Error from "../../Shared/Form/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import { StyleSheet } from "react-native";

import axios from "axios";
import baseURL from "../../assets/common/baseURL";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (
      ValidateEmail(email) ||
      fname === "" ||
      lname === "" ||
      password === ""
    ) {
      setError("Please fill in the form correctly");
    }

    function ValidateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }
      return false;
    }

    let user = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    };

    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        var errorString = JSON.stringify(error);
        var errorObj = JSON.parse(errorString);
        if (errorObj.status == 409) {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Account already exists. Please login",
            text2: "Not you? Sign up with a different email",
          });
        } else {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        }
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={"First name"}
          name={"fname"}
          id={"fname"}
          onChangeText={(text) => setFName(text)}
        />
        <Input
          placeholder={"Last name"}
          name={"lname"}
          id={"lname"}
          onChangeText={(text) => setLName(text)}
        />
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          <Text>{error ? error : null}</Text>
        </View>
        <View>
          <Button title={"Register"} onPress={() => register()} />
        </View>
        <View style={{ height: 25 }} />
        <View>
          <Button
            title={"Back to Login"}
            on
            onPress={() => props.navigation.navigate("Login")}
          />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});

export default Register;

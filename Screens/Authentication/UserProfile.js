import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseURL from "../../assets/common/baseURL";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("Login");
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(`${baseURL}users/${context.stateUser.sub}`, {
            header: { Authorization: `Bearer ${res}` },
          })
          .then((user) => setUserProfile(user.data));
      })
      .catch((error) => console.log(error));

    return () => {
      setUserProfile();
    };
  }, [context.stateUser.isAuthenticated]);
  return (
    <Container style={styles.container}>
      <ScrollView style={styles.subcontainer}>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.fname + " " + userProfile.lname : ""}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button
            title={"Sign Out"}
            onPress={() => {
              AsyncStorage.removeItem("jwt"), logoutUser(context.dispatch);
            }}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
  },
});

export default UserProfile;

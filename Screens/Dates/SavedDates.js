import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseURL";
import AuthGlobal from "../../Context/store/AuthGlobal";
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";

import { connect } from "react-redux";

import DateList from "./DateList";

const DateContainer = () => {
  const [dates, setDate] = useState([]);
  const context = useContext(AuthGlobal);

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .post(
            `${baseURL}date/getdate`,
            { user: context.stateUser.user.userId },
            {
              headers: {
                Authorization: `Bearer ${res}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            setDate(response.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log("Please make sure you're logged in."));
    return () => {
      setDate([]);
    };
  }, []);

  console.log(dates);
  return (
    <View style={Styles.container}>
      <FlatList
        data={dates}
        //renderItem={({item})=><Text>{item.name}</Text>}
        renderItem={({ item }) => <DateList key={item._id} item={item} />}
        keyExtractor={(item) => item.name}
        contentContainerStyle={Styles.subContainer}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  subContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
});

export default DateContainer;

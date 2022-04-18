import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseURL";
import AuthGlobal from "../../Context/store/AuthGlobal";
import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import DateList from "./DateList";

const SavedDates = () => {
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
            console.log(response);
            setDate(response.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log("Please make sure you're logged in."));
    return () => {
      setDate([]);
    };
  }, []);
  var filteredDates = dates.filter(function (el) {
    return el != null;
  });
  if (filteredDates.length > 0) {
    return (
      <View style={Styles.container}>
        <FlatList
          data={filteredDates}
          //renderItem={({item})=><Text>{item.name}</Text>}
          renderItem={({ item }) => <DateList key={item._id} item={item} />}
          keyExtractor={(item) => item.name}
          contentContainerStyle={Styles.subContainer}
        />
      </View>
    );
  } else {
    return (
      <View style={Styles.container}>
        <Text style={Styles.title}>No Saved Dates.</Text>
        <Text style={{ textAlign: "center" }}>
          Saved dates will appear here.
        </Text>
      </View>
    );
  }
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
  title: {
    fontWeight: "bold",
    fontSize: 48,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default SavedDates;

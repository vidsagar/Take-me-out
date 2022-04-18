import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import Toast from "react-native-toast-message";
import MapView, { Marker } from "react-native-maps";
import AuthGlobal from "../../Context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseURL";
import { useNavigation } from "@react-navigation/native";

const data = require("../../assets/data/dates.json");

var { width, height } = Dimensions.get("window");

const SavedDateCard = (props) => {
  const navigation = useNavigation();
  const data = props.route.params.paramKey;
  const count = 0;
  const deleteDate = (dateId) => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        let dateObject = { dateid: dateId };
        axios
          .post(`${baseURL}date/delete`, dateObject, {
            headers: {
              Authorization: `Bearer ${res}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.status == 200) {
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Date deleted",
              });
              navigation.navigate("SavedDates");
            }
          });
      })
      .catch((error) => console.log(error));
  };
  if (data.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Results</Text>
      </View>
    );
  } else if (data.length > 0) {
    if (data[count].hasOwnProperty("photoRef")) {
      if (data[count].indoorOutdoor) {
        photoURI = data[count].photoRef;
      } else {
        photoURI =
          "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
          data[count].photoRef +
          "&key=" +
          "AIzaSyCCnKs_LHH60gSSMq841dgMbpwqe5KDP-o";
      }
    } else {
      photoURI = "";
    }
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Results</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Date</Text>
      <View style={styles.dateView}>
        <MapView
          initialRegion={{
            latitude: data[count].location.lat,
            longitude: data[count].location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: data[count].location.lat,
              longitude: data[count].location.lng,
            }}
            title={data[count].name}
          ></Marker>
        </MapView>
      </View>
      <View
        style={{
          backgroundColor: "#472f54",
          width: width / 1.1,
          height: height / 5,
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text style={styles.dateDetailText}>
          {data[count].name}
          {"\n"}
          At {data[count].vicinity}
          {data[count].rating ? "\nRating: " + data[count].rating : ""}
        </Text>
      </View>
      <View style={{ marginTop: 20 }}></View>
      <View>
        <Button
          title="Delete Date"
          onPress={() => deleteDate(data[count].id)}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  dateDetailText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    lineHeight: 30,
  },
  adImage: {
    height: height / 8,
    width: width,
    position: "absolute",
  },
  dateImage: {
    resizeMode: "contain",
    height: 40,
    position: "absolute",
    justifyContent: "flex-start",
  },
  dateView: {
    width: "80%",
    height: height / 2.5,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    backgroundColor: "transparent",
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "75%",
    resizeMode: "contain",
  },
  card: {
    marginBottom: 10,
    height: height / 5,
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: "bold",
    fontSize: 48,
    textAlign: "center",
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default SavedDateCard;

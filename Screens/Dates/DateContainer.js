import React from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native-web";
import DateList from "./DateList";

const data = require("../../assets/data/dates.json");
const count = 1;

var { width, height } = Dimensions.get("window");

const DateContainer = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.adView}>
        <Image
          style={styles.adImage}
          source={{
            uri: "https://www.uttyler.edu/_resources/atlas/home/20210616-stronger-together.jpg",
          }}
        />
      </View>
      <Text style={styles.title}>The Date</Text>
      <View style={styles.dateView}>
        <Image
          style={styles.dateImage}
          source={{
            uri: data[count].image,
          }}
          resizeMode="contain"
          resizeMethod="resize"
        />
      </View>
      <View
        style={{
          backgroundColor: "#472f54",
          width: width / 1.1,
          height: height / 5,
          justifyContent: "center",
        }}
      >
        <Text style={styles.dateDetailText}>
          Meet at {data[count].name} at {data[count].time}
          {"\n"}
          Location: {data[count].state}, {data[count].zip}
          {"\n"}
          {data[count].date}
          {"\n"}
          Budget: ${data[count].budget}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  dateDetailText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  adImage: {
    height: height / 8,
    width: width,
    position: "absolute",
  },
  dateImage: {
    resizeMode: "contain",
    height: height / 2.2,
    width: width,
    position: "absolute",
    justifyContent: "flex-start",
  },
  dateView: {
    width: width,
    height: height / 2.2,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 20,
  },
  adView: {
    width: width,
    height: 50,
    overflow: "hidden",
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
  },
});

export default DateContainer;

import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Button,
} from "react-native";

var { width, height } = Dimensions.get("window");

const DateCard = (props) => {
  const { name, photoRef } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: photoRef
            ? photoRef
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box",
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name
          ? name.length > 35
            ? name.substring(0, 35) + "..."
            : name
          : "no name"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 1.5,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
    backgroundColor: "#d9f1ff",
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
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
  },
});

export default DateCard;

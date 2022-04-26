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
import MapView, { Callout, Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseURL";
import AuthGlobal from "../../Context/store/AuthGlobal";

var { width, height } = Dimensions.get("window");

const DateContainer = (props) => {
  const [disable, setDisable] = React.useState(false);
  const data = props.route.params.paramKey;
  const [count, setCount] = React.useState(
    Math.floor(Math.random() * data.length)
  );
  if (data.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Results</Text>
      </View>
    );
  } else if (data.length > 0) {
    console.log(data[count]);
    if (data[count].hasOwnProperty("photoRef")) {
      if (
        data[count].photoRef.length > 5 &&
        data[count].photoRef.substr(0, 4) === "http"
      ) {
        photoURI = data[count].photoRef;
        console.log(photoURI);
      } else if (
        data[count].photoRef.length > 5 &&
        data[count].photoRef.substr(0, 4) != "http"
      ) {
        photoURI =
          "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
          data[count].photoRef +
          "&key=AIzaSyCCnKs_LHH60gSSMq841dgMbpwqe5KDP-o";
      } else {
        photoURI = "";
      }
    } else {
      photoURI = "";
    }
    const context = useContext(AuthGlobal);
    const saveThisDate = () => {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          let dateObject = {
            dateItem: {
              name: data[count].name,
              photoRef: photoURI,
              latitude: data[count].location.lat,
              longitude: data[count].location.lng,
              vicinity: data[count].vicinity,
            },
            user: context.stateUser.user.userId,
          };
          axios
            .post(`${baseURL}date`, dateObject, {
              headers: {
                Authorization: `Bearer ${res}`,
              },
            })
            .then((response) => {
              setDisable(true);
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Date saved successfully",
                text2: "You can view your saved dates in the saved dates tab",
              });
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    };
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
            >
              <Image
                style={{ width: 100, height: 100 }}
                source={
                  photoURI ? (
                    {
                      uri: photoURI,
                    }
                  ) : (
                    <Text>{data[count].name}</Text>
                  )
                }
                resizeMode="contain"
              />
            </Marker>
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
            disabled={disable}
            title="Save Date"
            onPress={() => {
              saveThisDate();
            }}
          ></Button>
        </View>
      </View>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDate: (date) => dispatch(actions.saveDate({ date })),
  };
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

export default DateContainer;

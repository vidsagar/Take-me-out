import * as React from "react";
import { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import MapView, { Marker } from "react-native-maps";
import RadioGroup from "react-native-radio-buttons-group";
import * as Location from "expo-location";
import { StyleSheet, Dimensions } from "react-native";

import axios from "axios";
import baseURL from "../../assets/common/baseURL";

import AuthGlobal from "../../Context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";
var { width, height } = Dimensions.get("window");
const radioButtonsData = [
  {
    id: "1", // acts as primary key, should be unique and non-empty string
    label: "Indoor",
    value: "indoor",
  },
  {
    id: "2",
    label: "Outdoor",
    value: "outdoor",
  },
];

const Search = (props) => {
  const [date, setDate] = useState("");
  const [indoorOutdoor, setIndoorOutdoor] = useState(radioButtonsData);
  const [keyword, setKeyword] = useState("");
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const context = useContext(AuthGlobal);

  function onPressRadioButton(radioButtonsArray) {
    setIndoorOutdoor(radioButtonsArray);
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          "Permission to access location was denied.\nRestart app and allow location access."
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  let text = "Locating ... ";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Using current location";
  }

  const search = () => {
    if (date === "" || location == "" || errorMsg) {
      setError("Please fill in the form");
      setTimeout(() => setError(null), 3000);
    } else {
      let searchForm = {
        date: date,
        indoorOutdoor: indoorOutdoor[0].selected, //indoorOutdoor to setting
        keyword: keyword.toLowerCase(),
        longitude: longitude,
        latitude: latitude,
      };

      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login");
      }

      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .post(`${baseURL}search`, searchForm, {
              headers: {
                Authorization: `Bearer ${res}`,
              },
            })
            .then((response) => {
              props.navigation.navigate("Results", {
                paramKey: response.data,
              });
            });
        })
        .catch((error) => setErrorMsg(error));
    }
  };

  return (
    <FormContainer title="What's The Catch?">
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={{ width: "80%", alignContent: "flex-start" }}>
          <Text>Keyword:</Text>
        </View>
        <Input
          placeholder={"Example: park"}
          name={"keyword"}
          id={"keyword"}
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
        <View style={{ width: "80%", alignContent: "flex-start" }}>
          <Text>Date:</Text>
        </View>

        <Input
          placeholder={"YYYY-MM-DD"}
          name={"date"}
          id={"date"}
          value={date}
          onChangeText={(text) => setDate(text)}
        />
        <View
          style={{ width: "80%", alignContent: "flex-start", marginBottom: 10 }}
        >
          <Text>Pick a location:</Text>
        </View>
        <View style={styles.MapView}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 32.3513,
              longitude: -95.3011,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: 32.3513, longitude: -95.3011 }}
              title="Test Title"
              draggable={true}
              onDragEnd={(e) => {
                setLatitude(e.nativeEvent.coordinate.latitude);
                setLongitude(e.nativeEvent.coordinate.longitude);
              }}
            ></Marker>
          </MapView>
        </View>
        <View>
          <Text style={{ textAlign: "center", margin: 10 }}>
            Indoor or Outdoor?
          </Text>
          <RadioGroup
            layout="row"
            radioButtons={indoorOutdoor}
            onPress={onPressRadioButton}
          />
        </View>
        <Text style={{ color: "red", margin: 10 }}>{error ? error : null}</Text>
        <Button title="Search" onPress={() => search()} />
        <Text style={{ marginTop: 35, width: "80%", textAlign: "center" }}>
          {text}
        </Text>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  MapView: {
    width: "80%",
    height: 200,
    borderRadius: 10,
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: 200,
  },
});

export default Search;

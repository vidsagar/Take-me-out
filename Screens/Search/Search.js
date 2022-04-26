import * as React from "react";
import { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import MapView, { Marker } from "react-native-maps";
import RadioGroup from "react-native-radio-buttons-group";
import * as Location from "expo-location";
import { StyleSheet, Dimensions } from "react-native";
import DatePicker from "react-native-datepicker";

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
  const [date, setDate] = useState("4-4-2022");
  const [dateServer, setDateServer] = useState("2022-04-20");
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
    if (keyword === "" || date === "" || location == "") {
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
          <Text style={{ fontWeight: "bold" }}>Keyword:</Text>
        </View>
        <Input
          placeholder={"Example: park"}
          name={"keyword"}
          id={"keyword"}
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
        <View
          style={{ width: "80%", alignContent: "flex-start", marginTop: 20 }}
        >
          <Text style={{ fontWeight: "bold" }}>Date:</Text>
        </View>
        <DatePicker
          style={styles.datePickerStyle}
          date={date}
          mode="date"
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate="01-01-2022"
          maxDate="01-01-2023"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              right: -5,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              borderColor: "gray",
              alignItems: "flex-start",
              borderWidth: 0,
              borderBottomWidth: 1,
            },
            placeholderText: {
              fontSize: 17,
              color: "gray",
            },
            dateText: {
              fontSize: 17,
            },
          }}
          onDateChange={(date) => {
            let dateArray = date.split("/");

            setDate(date);
            setDateServer(
              dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0]
            );
          }}
        />

        {/* <Input
          placeholder={"YYYY-MM-DD"}
          name={"date"}
          id={"date"}
          value={date}
          onChangeText={(text) => setDate(text)}
        /> */}
        <View
          style={{ width: "80%", alignContent: "flex-start", marginBottom: 10 }}
        >
          <Text style={{ fontWeight: "bold", marginTop: 20 }}>Location:</Text>
        </View>
        <View style={styles.MapView}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 32.3513,
              longitude: -95.3011,
              latitudeDelta: 1.2,
              longitudeDelta: 1.2,
            }}
          >
            <Marker
              coordinate={{ latitude: 32.3513, longitude: -95.3011 }}
              title="Drag Pin to select Location"
              draggable={true}
              onDragEnd={(e) => {
                setLatitude(e.nativeEvent.coordinate.latitude);
                setLongitude(e.nativeEvent.coordinate.longitude);
              }}
            ></Marker>
          </MapView>
        </View>
        <View
          style={{ width: "80%", alignContent: "flex-start", marginBottom: 10 }}
        >
          <Text style={{ color: "#888888" }}>
            Hold and drag the pin to choose a different location.
          </Text>
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
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  MapView: {
    width: "80%",
    height: height / 3,
    borderRadius: 10,
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: height / 3,
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A8E9CA",
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  datePickerStyle: {
    width: "80%",
    backgroundColor: "#ddf3ff",
    marginBottom: 10,
    paddingLeft: 16,
  },
  text: {
    textAlign: "left",
    width: 230,
    fontSize: 16,
    color: "#000",
  },
});

export default Search;

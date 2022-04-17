import * as React from "react";
import { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import DateContainer from "../Dates/DateContainer";

import RadioGroup from "react-native-radio-buttons-group";
import * as Location from "expo-location";

import axios from "axios";
import baseURL from "../../assets/common/baseURL";

import AuthGlobal from "../../Context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        setErrorMsg("Permission to access location was denied");
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

export default Search;

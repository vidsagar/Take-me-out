import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";

import RadioGroup from "react-native-radio-buttons-group";

import axios from "axios";
import baseURL from "../../assets/common/baseURL";

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
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");
  const [indoorOutdoor, setIndoorOutdoor] = useState(radioButtonsData);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  function onPressRadioButton(radioButtonsArray) {
    setIndoorOutdoor(radioButtonsArray);
    //console.log(radioButtonsArray[0].selected);
  }

  const search = () => {
    if (state === "" || zip === "" || date === "" || budget === "") {
      setError("One or more form fields is empty");
      setTimeout(() => setError(null), 3000);
    }

    let searchForm = {
      state: state,
      zip: zip,
      date: date,
      budget: budget,
      indoorOutdoor: indoorOutdoor[0].selected,
      keyword: keyword.toLowerCase(),
    };
    console.log(searchForm);
  };
  return (
    <FormContainer title="What's The Catch?">
      <View style={{ width: "100%", alignItems: "center" }}>
        <Input
          placeholder={"Keyword"}
          name={"keyword"}
          id={"keyword"}
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
        <Input
          placeholder={"State"}
          name={"state"}
          id={"state"}
          value={state}
          onChangeText={(text) => setState(text)}
        />
        <Input
          placeholder={"Zip"}
          name={"zip"}
          id={"zip"}
          value={zip}
          onChangeText={(text) => setZip(text)}
        />
        <Input
          placeholder={"Date"}
          name={"date"}
          id={"date"}
          value={date}
          onChangeText={(text) => setDate(text)}
        />
        <Input
          placeholder={"Budget"}
          name={"budget"}
          id={"budget"}
          value={budget}
          onChangeText={(text) => setBudget(text)}
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
      </View>
    </FormContainer>
  );
};

export default Search;

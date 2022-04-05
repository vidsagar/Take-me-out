import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";

import axios from "axios";
import baseURL from "../../assets/common/baseURL";

const Search = (props) => {
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const search = () => {
    if (state === "" || zip === "" || date === "" || budget === "") {
      setError("One or more form fields is empty");
    }

    let searchForm = {
      state: state,
      zip: zip,
      date: date,
      budget: budget,
    };
  };
  return (
    <FormContainer title="What's The Catch?">
      <View style={{ width: "80%", alignItems: "center" }}>
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
        <Button
          title="Search"
          onPress={() => props.navigation.navigate("Results")}
        />
      </View>
    </FormContainer>
  );
};

export default Search;

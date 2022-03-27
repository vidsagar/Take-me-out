import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";

const Search = (props) => {
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");
  return (
    <FormContainer title="What's The Catch?">
      <View style={{ width: "80%", alignItems: "center" }}>
        <Input
          placeholder={"State"}
          name={"state"}
          id={"state"}
          value={state}
        />
        <Input placeholder={"Zip"} name={"zip"} id={"zip"} value={zip} />
        <Input placeholder={"Date"} name={"date"} id={"date"} value={date} />
        <Input
          placeholder={"Budget"}
          name={"budget"}
          id={"budget"}
          value={budget}
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

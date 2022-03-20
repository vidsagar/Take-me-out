import React from "react";
import { View, Text, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";

const Search = (props) => {
  return (
    <FormContainer>
      <View>
          <Text>What's The Catch?</Text>
        <Button
        title = "Search"
        onPress={() => props.navigation.navigate("Results")}
        />
      </View>
    </FormContainer>
  );
};

export default Search;

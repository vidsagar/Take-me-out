import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  DatePickerIOS,
} from "react-native";

import DateList from "./DateList";

const data = require("../../assets/data/dates.json");

const DateContainer = () => {
  const [dates, setDate] = useState([]);

  useEffect(() => {
    setDate(data);
    return () => {
      setDate([]);
    };
  }, []);

  return (
    <View style={Styles.container}>
      <FlatList
        data={dates}
        //renderItem={({item})=><Text>{item.name}</Text>}
        renderItem={({ item }) => <DateList key={item.id} item={item} />}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default DateContainer;

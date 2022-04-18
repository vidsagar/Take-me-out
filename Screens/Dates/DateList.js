import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DateCard from "./DateCard";

var { width } = Dimensions.get("window");

const DateList = (props) => {
  const { item } = props;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ width: width }}
      onPress={() => {
        item.count = 0;
        item.location = {
          lat: parseFloat(item.latitude),
          lng: parseFloat(item.longitude),
        };
        navigation.navigate("SavedDateCard", {
          paramKey: [item],
        });
      }}
    >
      <View
        style={{
          width: width,
          alignItems: "center",
        }}
      >
        <DateCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default DateList;

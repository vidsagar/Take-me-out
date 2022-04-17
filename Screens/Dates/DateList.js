import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";

import DateCard from "./DateCard";

var { width } = Dimensions.get("window");

const DateList = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity style={{ width: width }}>
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

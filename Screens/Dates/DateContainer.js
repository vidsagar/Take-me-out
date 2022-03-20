import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native'

import DateList from './DateList';

const data = require('../../assets/data/dates.json');
var {width, height} = Dimensions.get("window");

const DateContainer = () => {

    const [dates, setDate]  = useState([]);

    useEffect(() => {
        setDate(data);
        return() =>{
            setDate([])
        }
    },[])

    return (
        <View style={styles.container}>
      <Image
      style={styles.image}
      resizeMode="contain"
      source={{uri: image? image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box'}}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 35 ? name.substring(0,35)+'...' : name}
      </Text>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      width:width/1.5,
      borderRadius: 10,
      marginTop: 25,
      alignItems: "center",
      backgroundColor: "white"
    },
    image: {
      backgroundColor: "transparent",
      position: "absolute",
      flex: 1,
      width: '100%',
      height: '75%',
      resizeMode: 'contain',
    },
    card: {
      marginBottom: 10,
      height: height/5,
      backgroundColor: "transparent"
    },
    title: {
      fontWeight: "bold",
      fontSize: 14,
      textAlign: "center",
      marginBottom:15
    }
  });
  

export default DateContainer;
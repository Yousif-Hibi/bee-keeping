import React, { useState } from 'react';
// import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { ImageBackground } from 'react-native';
import { StatusBar } from 'react-native';


export default function CheckerInfoScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../../assets/beesbackground.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, checker!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Colony Search")}
        >
          <Text style={styles.buttonText}>Coliny Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Check Messages")}
        >
          <Text style={styles.buttonText}>Check Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Add Participent")}
        >
          <Text style={styles.buttonText}>Add Participent</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

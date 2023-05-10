// import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'react-native';



export default function Finance() {
  return (
    <ImageBackground
      source={require('../../../assets/beesbackground.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>finance</Text>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

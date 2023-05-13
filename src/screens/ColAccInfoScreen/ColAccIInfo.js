import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet,ImageBackground } from "react-native";
import styles from "./styles";
import { StatusBar } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default function NumberChanger() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <ImageBackground
    source={require("../../../assets/beesbackground.jpg")}
    style={styles.background}
  >
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="home"
          size={30}
          onPress={() => navigation.navigate("AdminInfo")}
          style={styles.homeIcon}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>Choose how many colonies</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <Text style={styles.count}>{count}</Text>
      <TouchableOpacity style={styles.button} onPress={handleDecrement}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
  );
}
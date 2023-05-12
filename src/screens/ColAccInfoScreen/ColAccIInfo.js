import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "./styles";
import { StatusBar } from 'react-native';
export default function NumberChanger() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <Text style={styles.count}>{count}</Text>
      <TouchableOpacity style={styles.button} onPress={handleDecrement}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
}
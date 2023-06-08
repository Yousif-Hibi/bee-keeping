import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { ImageBackground } from "react-native";
import { StatusBar } from "react-native";
import styles from "./styles";

export default function AdminInfoScreen({ navigation }) {
  const [lightsAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    const intervalId = setInterval(() => {
      Animated.timing(lightsAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(lightsAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const animatedStyles = {
    opacity: lightsAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.6],
    }),
  };

  return (
    <ImageBackground
      source={require("../../../assets/beesbackground.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Admin!</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={[styles.square, animatedStyles]}
            onPress={() => navigation.navigate("ColonySearchScreen")}
          >
            <Text style={styles.buttonText}>Colony Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.square, animatedStyles]}
            onPress={() => navigation.navigate("CheckMessagesScreen")}
          >
            <Text style={styles.buttonText}>Check Messages</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={[styles.square, animatedStyles]}
            onPress={() => navigation.navigate("AddParticipantScreen")}
          >
            <Text style={styles.buttonText}>Add Participant</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.square, animatedStyles]}
            onPress={() => navigation.navigate("StatisticsScreen")}
          >
            <Text style={styles.buttonText}>Statistics</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

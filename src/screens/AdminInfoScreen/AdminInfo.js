import React, { useState } from "react";
// import React, { useLayoutEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import { ImageBackground } from "react-native";
import { StatusBar } from "react-native";

export default function AdminInfoScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../../../assets/beesbackground.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Admin!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ColonySearchScreen")}
        >
          <Text style={styles.buttonText}>Colony Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CheckMessagesScreen")}
        >
          <Text style={styles.buttonText}>Check Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddParticipantScreen")}
        >
          <Text style={styles.buttonText}>Add Participant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("StatisticsScreen")}
        >
          <Text style={styles.buttonText}>Statistics</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

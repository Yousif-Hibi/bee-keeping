// import React, { useLayoutEffect } from "react";
// import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from "./styles";
import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'react-native';


export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Authenticate the user with custom username and password
    if (username === "admin" && password === "admin") {
      // Navigate to another screen on successful authentication
      navigation.navigate("AdminInfoScreen");
    } else if (username === "checker" && password === "checker") {
      // Navigate to another screen on successful authentication
      navigation.navigate("CheckerInfoScreen");
    }
    else if (username === "user" && password === "user") {
      // Navigate to another screen on successful authentication
      navigation.navigate("UserInfoScreen");
    }
    else {
      alert("Invalid username or password");
    }
  };
  return (
    <ImageBackground
      source={require('../../../assets/beesbackground.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Bees App!</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

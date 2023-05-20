// import React, { useLayoutEffect } from "react";
// import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import React, { useState } from "react";
import { ImageBackground } from "react-native";
import { StatusBar } from "react-native";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../../config/firebase";
import { Alert } from "react-native";
export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        `${username}@example.com`,
        password
      );

      if (user) {
        const uid = user.uid;
        Alert.alert("Success", "User logged in successfully!");
        console.log(uid);

        if (uid === "vSASeJ65mCgLlwCOGSRDnt6Mpuv1") {
          navigation.navigate("AdminInfoScreen");
        } else {
          navigation.navigate("UserInfoScreen", { uid });
        }
      } else {
        Alert.alert("Error", "User not found or login failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <ImageBackground
      source={require("../../../assets/beesbackground.jpg")}
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

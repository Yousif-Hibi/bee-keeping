import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const { user } = await signInWithEmailAndPassword(
        auth,
        `${username}@example.com`,
        password
      );

      setIsLoading(false);

      if (user) {
        const uid = user.uid;
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
      setIsLoading(false);
      Alert.alert("Error", "User not found or login failed!");
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

        {isLoading ? (
          <ActivityIndicator size="large" color="#000000" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        )}
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

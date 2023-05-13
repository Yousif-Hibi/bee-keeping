import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
//import ColAccinfo from "../ColonyAccountInfo/ColAccinfo";

export default function AddParticipant({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [city, setCity] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else if (password === confirmPassword) {
      // setErrorMessage("Passwords match");
      navigation.navigate("ColAccInfoScreen");
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/beesbackground.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Add Participant</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="ID Number"
          value={idNumber}
          onChangeText={setIdNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={city}
          onChangeText={setCity}
        />
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
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

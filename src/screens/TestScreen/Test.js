import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import { StatusBar } from "react-native";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { database } from "../../../config/firebase";

export default function TestScreen({ navigation }) {
  const [newNumber, setNewNumber] = useState("");
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(database, "keepers");

  useEffect(() => {
    const getUser = async () => {
      const querySnapshot = await getDocs(userCollectionRef);
      const fetchedUsers = querySnapshot.docs.map((doc) => doc.data());
      setUsers(fetchedUsers);
      console.log(fetchedUsers);
    };

    getUser();
  }, []);

  const addData = async () => {
    await addDoc(userCollectionRef, { Number: newNumber });
    setNewNumber(""); // Clear the input after adding data
  };

  return (
    <ImageBackground
      source={require("../../../assets/beesbackground.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Your UI components and logic */}
        {users.map((user, index) => (
          <Text key={index}>
            Name: {user.name}
            location:
            {user.location}
          </Text>
        ))}
      </View>
      <TextInput
        placeholder="Number..."
        value={newNumber}
        onChangeText={(text) => setNewNumber(text)}
      />
      <TouchableOpacity onPress={addData}>
        <Text>addData</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

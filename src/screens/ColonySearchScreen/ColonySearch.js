import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./styles";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../config/firebase";

export default function ColonySearch({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name"); // default search type is name
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const usersCollectionRef = collection(database, "keepers");

      try {
        const usersQuerySnapshot = await getDocs(usersCollectionRef);

        const usersData = usersQuerySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            uid: doc.id, // Include the user's uid from Firebase document
            name: data.name,
            idNumber: data.idNumber,
            location: data.location,
          };
        });
        setUserData(usersData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsersData();
  }, []);
  const handleUserPress = (uid) => {
    navigation.navigate("UserInfoScreen", { uid }); // Navigate to UserInfoScreen with the uid as a parameter
    console.log("Navigating to UserInfoScreen with uid:", uid);
  };
  return (
    <ImageBackground
      source={require("../../../assets/beesbackground.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Colony Search</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Name</Text>
            <Text style={styles.columnHeader}>ID</Text>
            <Text style={styles.columnHeader}>Location</Text>
          </View>
          {userData.map((user, index) => (
            <TouchableOpacity
              style={styles.tableRow}
              key={index}
              onPress={() => handleUserPress(user.uid)}
            >
              <Text style={styles.column}>{user.name}</Text>
              <Text style={styles.column}>{user.idNumber}</Text>
              <Text style={styles.column}>{user.location}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

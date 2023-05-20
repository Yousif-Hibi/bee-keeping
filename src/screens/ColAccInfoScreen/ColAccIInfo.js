import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "react-native";
import styles from "./styles";
import { auth } from "../../../config/firebase";
import { database } from "../../../config/firebase";
import {
  getFirestore,
  collection,
  setDoc,
  getDocs,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import AdminInfoScreen from "../AdminInfoScreen/AdminInfo";

export default function ColAccInfo({ navigation, route }) {
  const [Halfframe, setHalfframe] = useState([]);
  const [Fullframe, setFullframe] = useState([]);
  const colnum = 5;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = auth.currentUser.uid; // Get the UID of the current user
      const userDocRef = doc(database, "keepers", uid);

      try {
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUser(userData);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, []);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  const handleSubmit = async () => {
    if (!user) {
      console.log("User not found");
      return;
    }

    const currentUser = auth.currentUser;

    const docRef = doc(database, "keepers", currentUser.uid);

    try {
      await updateDoc(docRef, {
        hiveIDs: arrayUnion(...tableData.map((rowData) => rowData.hiveID)),
        Halfframe: Halfframe,
        Fullframe: Fullframe,
      });
      console.log("Bee hive IDs, Halfframe, and Fullframe added to Firestore");
      navigation.navigate(AdminInfoScreen);
    } catch (error) {
      console.error(
        "Error adding bee hive IDs, Halfframe, and Fullframe:",
        error
      );
    }
  };

  const handleCreate = () => {
    console.log("Submit button pressed");
    console.log("Count:", count);
    // Additional logic or navigation can be performed here
    // Build the table based on the count
    const data = [];
    const halfFrameArr = Array(count).fill("");
    const fullFrameArr = Array(count).fill("");
    for (let i = 0; i < count; i++) {
      data.push({
        hiveNum: i,
        hiveID: ""
      });
    }
    setTableData(data);
    setHalfframe(halfFrameArr);
    setFullframe(fullFrameArr);
  };

  const handleRowInputChange = (index, fieldName, value) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[index][fieldName] = value;
      return newData;
    });
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
            onPress={() => navigation.navigate("AdminInfoScreen")}
            style={styles.homeIcon}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.title}>Choose how many Bee hives!</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDecrement}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.count}>{count}</Text>
          <TouchableOpacity style={styles.button} onPress={handleIncrement}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.table}>
          {count > 0 && (
            <>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.columnText}>Bee hive num</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.columnText}>Bee hive ID</Text>
                </View>
              </View>
              {tableData.map((rowData, index) => (
                <View style={styles.row} key={index}>
                  <View style={styles.column}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter hive num"
                      value={rowData.hiveNum}
                      onChangeText={(value) =>
                        handleRowInputChange(index, "hiveNum", value)
                      }
                    />
                  </View>
                  <View style={styles.column}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter hive ID"
                      value={rowData.hiveID}
                      onChangeText={(value) =>
                        handleRowInputChange(index, "hiveID", value)
                      }
                    />
                  </View>
                </View>
              ))}
            </>
          )}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleCreate}>
          <Text style={styles.submitButtonText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

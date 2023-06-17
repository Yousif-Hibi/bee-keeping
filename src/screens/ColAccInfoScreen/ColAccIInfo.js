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
  const [Firstcollect, setFirstcollect] = useState([]);
  const [Secondcollect, setSecondcollect] = useState([]);
  const colnum = 5;
  const [user, setUser] = useState(null);
  const [submitVisible, setSubmitVisible] = useState(false);
  const [createPressed, setCreatePressed] = useState(false);
  const [years, setYears] = useState([]);
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
      const firestore = getFirestore();
      const docRef = doc(firestore, "keepers", currentUser.uid);

      const FirstcollectArr = Array(count).fill("0");
      const SecondcollectArr = Array(count).fill("0");

      await updateDoc(docRef, {
        hiveIDs: arrayUnion(...tableData.map((rowData) => rowData.hiveID)),
        year: {
          2022: {
            Firstcollect: [...FirstcollectArr],
            Secondcollect: [...SecondcollectArr],
          },
          2023: {
            Firstcollect: [...FirstcollectArr],
            Secondcollect: [...SecondcollectArr],
          },
          2024: {
            Firstcollect: [...FirstcollectArr],
            Secondcollect: [...SecondcollectArr],
          },
          2025: {
            Firstcollect: [...FirstcollectArr],
            Secondcollect: [...SecondcollectArr],
          },
          2026: {
            Firstcollect: [...FirstcollectArr],
            Secondcollect: [...SecondcollectArr],
          },
          2027: {
            Firstcollect: [...FirstcollectArr],
            Secondcollect: [...SecondcollectArr],
          },
          2028: {
            Firstcollect: [...FirstcollectArr],
            Secondcollect: [...SecondcollectArr],
          },
          2029: {
            Firstcollect: [...FirstcollectArr],
            Secondcollect: [...SecondcollectArr],
          },
          2030: {
            Firstcollect: [...FirstcollectArr],
            Secondcollect: [...SecondcollectArr],
          },
        },
      });

      console.log(
        "Bee hive IDs, Firstcollect, and Secondcollect added to Firestore"
      );
      navigation.navigate(AdminInfoScreen);
    } catch (error) {
      console.error(
        "Error adding bee hive IDs, Firstcollect, and Secondcollect:",
        error
      );
    }
  };

  const handleCreate = () => {
    console.log("Submit button pressed");
    console.log("Count:", count);

    const data = [];
    const yearsArray = Array.from({ length: 9 }, (_, index) => 2022 + index);
    const yearData = {};

    const FirstcollectArr = Array(count)
      .fill("")
      .map((_, index) => `0${index}`);
    const SecondcollectArr = Array(count)
      .fill("")
      .map((_, index) => `0${index}`);
    for (let i = 0; i < 5; i++) {
      FirstcollectArr.push("0");
      SecondcollectArr.push("0");
    }
    for (const year of yearsArray) {
      yearData[year] = {
        Firstcollect: [...FirstcollectArr], // Initialize with strings containing '0' followed by the index
        Secondcollect: [...SecondcollectArr], // Initialize with strings containing '0' followed by the index
      };
    }

    for (let i = 0; i < count; i++) {
      data.push({
        hiveNum: i,
        hiveID: "",
        year: { ...yearData },
      });
    }

    setTableData((prevData) => [...prevData, ...data]);
    setYears(yearsArray);
    setSubmitVisible(true);
    setCreatePressed(true);
  };

  const handleRowInputChange = (index, fieldName, value) => {
    if (fieldName === "hiveNum" && tableData[index]["hiveNum"] !== "") {
      return; // Hive number already assigned, prevent changes
    }
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
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.title}>Choose how many Bee hives!</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {createPressed ? null : (
            <>
              <TouchableOpacity style={styles.button} onPress={handleDecrement}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.count}>{count}</Text>
              <TouchableOpacity style={styles.button} onPress={handleIncrement}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </>
          )}
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
                      placeholder={index.toString()}
                      value={rowData.hiveNum}
                      onChangeText={(value) =>
                        handleRowInputChange(index, index.toString(), value)
                      }
                      editable={rowData.hiveNum === ""}
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
        {!createPressed && (
          <TouchableOpacity style={styles.submitButton} onPress={handleCreate}>
            <Text style={styles.submitButtonText}>Create</Text>
          </TouchableOpacity>
        )}
        {submitVisible && (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

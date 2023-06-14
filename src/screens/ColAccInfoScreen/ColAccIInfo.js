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

      await updateDoc(docRef, {
        hiveIDs: arrayUnion(...tableData.map((rowData) => rowData.hiveID)),
        year: {
         
          2022: {
            Firstcollect: Firstcollect.map((arr) => arrayUnion(...arr)),
            Secondcollect: Secondcollect.map((arr) => arrayUnion(...arr)),
          } ,
          2023: {
            Firstcollect: Firstcollect.map((arr) => arrayUnion(...arr)),
            Secondcollect: Secondcollect.map((arr) => arrayUnion(...arr)),
          } ,
           2024: {
            Firstcollect: Firstcollect.map((arr) => arrayUnion(...arr)),
            Secondcollect: Secondcollect.map((arr) => arrayUnion(...arr)),
          } ,
          2025: {
            Firstcollect: Firstcollect.map((arr) => arrayUnion(...arr)),
            Secondcollect: Secondcollect.map((arr) => arrayUnion(...arr)),
          },
          2026: {
            Firstcollect: Firstcollect.map((arr) => arrayUnion(...arr)),
            Secondcollect: Secondcollect.map((arr) => arrayUnion(...arr)),
          },
          2027: {
            Firstcollect: Firstcollect.map((arr) => arrayUnion(...arr)),
            Secondcollect: Secondcollect.map((arr) => arrayUnion(...arr)),
          },
          2028: {
            Firstcollect: Firstcollect.map((arr) => arrayUnion(...arr)),
            Secondcollect: Secondcollect.map((arr) => arrayUnion(...arr)),
          },
          2029: {
            Firstcollect: Firstcollect.map((arr) => arrayUnion(...arr)),
            Secondcollect: Secondcollect.map((arr) => arrayUnion(...arr)),
          },
          2030: {
            Firstcollect: Firstcollect.map((arr) => arrayUnion(...arr)),
            Secondcollect: Secondcollect.map((arr) => arrayUnion(...arr)),
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
  const addNumbersToYear2022 = (tableData) => {
    const updatedTableData = [...tableData];

    for (let i = 0; i < updatedTableData.length; i++) {
      const yearData2022 = updatedTableData[i].year[2022];
      yearData2022.Firstcollect.push(1, 2);
      yearData2022.Secondcollect.push(3, 4);
    }

    return updatedTableData;
  };


  const handleCreate = () => {
    console.log("Submit button pressed");
    console.log("Count:", count);

    const data = [];
    const yearsArray = Array.from({ length: 9 }, (_, index) => 2022 + index);
    const yearData = {};

    for (const year of yearsArray) {
      yearData[year] = {
        Firstcollect: [1, 2, 3, 4, 5],
        Secondcollect: [6, 7, 8, 9, 10],
      };
    }

    for (let i = 0; i < count; i++) {
    
      data.push({
        hiveNum: i,
        hiveID: "",
        year: yearData,
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
                      placeholder="Enter hive num"
                      value={rowData.hiveNum}
                      onChangeText={(value) =>
                        handleRowInputChange(index, "hiveNum", value)
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

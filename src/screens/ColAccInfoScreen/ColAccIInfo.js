import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import styles from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "react-native";

export default function ColAccInfo({ navigation }) {
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

  const handleSubmit = () => {
    console.log("Submit button pressed");
    console.log("Count:", count);
    // Additional logic or navigation can be performed here
    // Build the table based on the count
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(
        <View style={styles.row} key={i}>
          <View style={styles.column}>
            <Text style={styles.columnText}>Column 1</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>Column 2</Text>
          </View>
        </View>
      );
    }
    setTableData(data);
  };

  return (
    <ImageBackground source={require("../../../assets/beesbackground.jpg")} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="home"
            size={30}
            onPress={() => navigation.navigate("AdminInfoScreen")}
            style={styles.homeIcon}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.title}>Choose how many colonies</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.count}>{count}</Text>
        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Table */}
        <View style={styles.table}>
          {count > 0 && (
            <>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.columnText}>Column 1</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.columnText}>Column 2</Text>
                </View>
              </View>
              {tableData}
            </>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

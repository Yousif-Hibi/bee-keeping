import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";
import { ImageBackground } from "react-native";
import { StatusBar } from "react-native";
import { database } from "../../../config/firebase";
import { auth } from "../../../config/firebase";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditUserScreen({ navigation, route }) {
  const [keeperData, setKeeperData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);
  const cities = [
    "Old City / البلدة القديمة",
    "ras al amood / رأس العامود",
    "Beit Hanina / بيت حنينا",
    "Shuafat / شعفاط",
    "Silwan / سلوان",
    "Issawiya / العيسوية",
    "Jabal Mukaber / جبل المكبر",
    "Beit Safafa / بيت صفافا",
    "Abu Tor / ثوري",
    "Al Toor / الطور",
    "Em toba / ام طوبة",
    "Wadi el joz / وادي الجوز",
    "Abu des / أبو ديس",
    "Al Eizareya / العيزرية",
    "Anata / مخيم أناتا",
    "Zeayem / زعيم",
    "Kofor Akab / كفر عقب",
  ];

  useEffect(() => {
    const fetchKeeperData = async () => {
      const uid = route.params.uid;
      if (!uid) {
        console.log("Invalid uid");
        return;
      }

      const keeperDocRef = doc(database, "keepers", uid);

      try {
        const keeperDocSnapshot = await getDoc(keeperDocRef);

        if (keeperDocSnapshot.exists()) {
          const keeper = keeperDocSnapshot.data();
          setKeeperData(keeper);
          setEditedData(keeper);

          const newTableData = keeper.hiveIDs.map((hiveID, index) => ({
            hiveID,
            Secondcollect: keeper.Secondcollect[index],
            Firstcollect: keeper.Firstcollect[index],
          }));
          setTableData(newTableData);
        } else {
          console.log("Keeper not found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchKeeperData();
  }, [route?.params?.uid]);

  const handleInputChange = (key, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const uid = route.params.uid;
    if (!uid) {
      console.log("Invalid uid");
      return;
    }

    const keeperDocRef = doc(database, "keepers", uid);

    try {
      await updateDoc(keeperDocRef, editedData);
      console.log("Keeper data updated successfully!");
      navigation.navigate("AdminInfoScreen");
    } catch (error) {
      console.error("Error updating keeper data:", error);
    }
  };

  if (!keeperData) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  const handleTableInputChange = (index, key, value) => {
    const updatedTableData = tableData.map((rowData, rowIndex) => {
      if (rowIndex === index) {
        return {
          ...rowData,
          [key]: value,
        };
      }
      return rowData;
    });

    setTableData(updatedTableData);

    // Update editedData with the changes
    const updatedEditedData = { ...editedData };
    updatedEditedData.hiveIDs[index] = updatedTableData[index].hiveID;
    updatedEditedData.Secondcollect[index] =
      updatedTableData[index].Secondcollect;
    updatedEditedData.Firstcollect[index] =
      updatedTableData[index].Firstcollect;
    setEditedData(updatedEditedData);
  };

  return (
    <ImageBackground
      source={require("../../../assets/beesbackground.jpg")}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Name:</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={editedData.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
          <View style={styles.line} />
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Phone Number:</Text>
        </View>
        <TextInput
          style={styles.input}
          value={editedData.phoneNumber}
          onChangeText={(value) => handleInputChange("phoneNumber", value)}
        />

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Location:</Text>
        </View>
        <Picker
          selectedValue={editedData.location}
          style={[styles.selectInput, cityError && styles.errorInput]}
          onValueChange={(selectedValue) =>
            handleInputChange("location", selectedValue)
          }
        >
          <Picker.Item label="Select City" value="" />
          {cities.map((city) => (
            <Picker.Item key={city} label={city} value={city} />
          ))}
        </Picker>

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>ID:</Text>
        </View>
        <TextInput
          style={styles.input}
          value={editedData.idNumber}
          onChangeText={(value) => handleInputChange("idNumber", value)}
        />

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Hive Location:</Text>
        </View>
        <TextInput
          style={styles.input}
          value={editedData.hiveLocation}
          onChangeText={(value) => handleInputChange("hiveLocation", value)}
        />

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Payment:</Text>
        </View>
        <TextInput
          style={styles.input}
          value={editedData.payment}
          onChangeText={(value) => handleInputChange("payment", value)}
        />

        <View style={styles.toggleContainer}>
          <Text style={styles.labelText}>Signature:</Text>
          <Switch
            style={styles.switch}
            value={editedData.signature}
            onValueChange={(value) => handleInputChange("signature", value)}
          />
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.labelText}>Obtain:</Text>
          <Switch
            style={styles.switch}
            value={editedData.obtain}
            onValueChange={(value) => handleInputChange("obtain", value)}
          />
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Hive ID</Text>
            <Text style={styles.tableHeaderText}>FirstCollect</Text>
            <Text style={styles.tableHeaderText}>SecondCollect</Text>
          </View>

          {tableData.map((rowData, index) => (
            <View style={styles.tableRow} key={index}>
              <TextInput
                style={styles.tableCell}
                value={rowData.hiveID}
                onChangeText={(value) =>
                  handleTableInputChange(index, "hiveID", value)
                }
              />
              <TextInput
                style={styles.tableCell}
                value={rowData.Secondcollect}
                onChangeText={(value) =>
                  handleTableInputChange(index, "Secondcollect", value)
                }
              />
              <TextInput
                style={styles.tableCell}
                value={rowData.Firstcollect}
                onChangeText={(value) =>
                  handleTableInputChange(index, "Firstcollect", value)
                }
              />
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { StatusBar } from "expo-status-bar";
import styles from "./styles";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../config/firebase";

export default function ColonySearch({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name"); // default search type is name
  const [userData, setUserData] = useState([]);
  const [filterType, setFilterType] = useState("name"); // default filter type is name
  const [originalData, setOriginalData] = useState([]); // Store the original data
  const [nameSortOrder, setNameSortOrder] = useState(""); // Sort order for name column
  const [locationSortOrder, setLocationSortOrder] = useState(""); // Sort order for location column

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
        setOriginalData(usersData);
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

  const handleNameColumnPress = () => {
    if (nameSortOrder === "asc") {
      const sortedData = [...userData].sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      setUserData(sortedData);
      setNameSortOrder("desc");
    } else {
      const sortedData = [...userData].sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setUserData(sortedData);
      setNameSortOrder("asc");
    }
  };

  const handleLocationColumnPress = () => {
    if (locationSortOrder === "asc") {
      const sortedData = [...userData].sort((a, b) => {
        return b.location.localeCompare(a.location);
      });
      setUserData(sortedData);
      setLocationSortOrder("desc");
    } else {
      const sortedData = [...userData].sort((a, b) => {
        return a.location.localeCompare(b.location);
      });
      setUserData(sortedData);
      setLocationSortOrder("asc");
    }
  };
  const handleFooterButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };
  const handleSearch = () => {
    if (filterType === "all") {
      // Show the entire list
      setUserData(originalData);
    } else {
      // Filter the data based on the selected filter type and search term
      const filteredData = originalData.filter((user) => {
        if (filterType === "name") {
          return user.name.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (filterType === "id") {
          return user.idNumber.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (filterType === "location") {
          return user.location.toLowerCase().includes(searchTerm.toLowerCase());
        }
      });
      setUserData(filteredData);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/beesbackground.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Colony Search</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          <Picker
            selectedValue={filterType}
            style={styles.filterPicker}
            onValueChange={(itemValue) => setFilterType(itemValue)}
          >
            <Picker.Item label="Show All" value="all" />
            <Picker.Item label="Name" value="name" />
            <Picker.Item label="ID" value="id" />
            <Picker.Item label="Location" value="location" />
          </Picker>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <TouchableOpacity
              onPress={handleNameColumnPress}
              style={styles.columnHeaderContainer}
            >
              <Text style={styles.columnHeader}>Name</Text>
              {nameSortOrder === "asc" && (
                <Text style={styles.sortArrow}>▲</Text>
              )}
              {nameSortOrder === "desc" && (
                <Text style={styles.sortArrow}>▼</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.columnHeader}>ID</Text>
            <TouchableOpacity
              onPress={handleLocationColumnPress}
              style={styles.columnHeaderContainer}
            >
              <Text style={styles.columnHeader}>Location</Text>
              {locationSortOrder === "asc" && (
                <Text style={styles.sortArrow}>▲</Text>
              )}
              {locationSortOrder === "desc" && (
                <Text style={styles.sortArrow}>▼</Text>
              )}
            </TouchableOpacity>
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
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => handleFooterButtonPress("CheckMessagesScreen")}
        >
          <Image
            source={require("../../../assets/sendMassege.png")}
            style={styles.footerIcon}
          />
          <Text style={styles.footerButtonText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => handleFooterButtonPress("AddParticipantScreen")}
        >
          <Image
            source={require("../../../assets/addicon.png")}
            style={styles.footerIcon}
          />
          <Text style={styles.footerButtonText}>AddUser</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => handleFooterButtonPress("StatisticsScreen")}
        >
          <Image
            source={require("../../../assets/stat.png")}
            style={styles.footerIcon}
          />
          <Text style={styles.footerButtonText}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => handleFooterButtonPress("AdminInfoScreen")}
        >
          <Image
            source={require("../../../assets/home.png")}
            style={styles.footerIcon}
          />
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

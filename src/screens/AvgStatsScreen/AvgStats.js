import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../config/firebase";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";

export default function Statistics({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [averageFirstCollect, setAverageFirstCollect] = useState(0);
  const [averageSecondCollect, setAverageSecondCollect] = useState(0);
  const [averageCollect, setAverageCollect] = useState(0);
  const [highestAverageFirstCollect, setHighestAverageFirstCollect] =
    useState(0);
  const [lowestAverageFirstCollect, setLowestAverageFirstCollect] = useState(0);
  const [cityWithHighestFirstAvg, setCityWithHighestFirstAvg] = useState("");
  const [cityWithLowestFirstAvg, setCityWithLowestFirstAvg] = useState("");
  const [highestAverageSecondCollect, setHighestAverageSecondCollect] =
    useState(0);
  const [lowestAverageSecondCollect, setLowestAverageSecondCollect] =
    useState(0);
  const [cityWithHighestSecondAvg, setCityWithHighestSecondAvg] = useState("");
  const [cityWithLowestSecondAvg, setCityWithLowestSecondAvg] = useState("");

  const [selectedYear, setSelectedYear] = useState("2023");

  useEffect(() => {
    const fetchUsersData = async () => {
      const usersCollectionRef = collection(database, "keepers");

      try {
        const usersQuerySnapshot = await getDocs(usersCollectionRef);

        const usersData = usersQuerySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            uid: doc.id,
            name: data.name,
            idNumber: data.idNumber,
            location: data.location,
            hiveid: data.hiveid,
            Firstcollect: data.year[selectedYear]?.Firstcollect,
            SecondCollect: data.year[selectedYear]?.Secondcollect,
          };
        });

        const filteredData = selectedLocation
          ? usersData.filter((user) => user.location === selectedLocation)
          : usersData;

        const allFirstCollectData = filteredData.flatMap(
          (user) => user.Firstcollect
        );

        const allSecondCollectData = filteredData.flatMap(
          (user) => user.SecondCollect
        );

        const averageFirstCollect = calculateAverage(allFirstCollectData);
        const averageSecondCollect = calculateAverage(allSecondCollectData);
        const averageCollect = (averageFirstCollect + averageSecondCollect) / 2;

        setAverageFirstCollect(averageFirstCollect);
        setAverageSecondCollect(averageSecondCollect);
        setAverageCollect(averageCollect);

        // Calculate highest and lowest averageFirstCollect***************************************************************************************
        const averageFirstCollectsByCity = {};

        usersData.forEach((user) => {
          const city = user.location;
          if (!averageFirstCollectsByCity[city]) {
            averageFirstCollectsByCity[city] = [];
          }
          averageFirstCollectsByCity[city].push(...user.Firstcollect);
        });

        const averageFirstCollects = Object.values(
          averageFirstCollectsByCity
        ).map((data) => calculateAverage(data));

        const highestAverageFirstCollect = Math.max(...averageFirstCollects);
        const lowestAverageFirstCollect = Math.min(...averageFirstCollects);

        setHighestAverageFirstCollect(highestAverageFirstCollect);
        setLowestAverageFirstCollect(lowestAverageFirstCollect);

        // Find the city with the highest and lowest average first collect
        const cityWithHighestFirstAvg = Object.keys(
          averageFirstCollectsByCity
        ).filter(
          (city) =>
            calculateAverage(averageFirstCollectsByCity[city]) ===
            highestAverageFirstCollect
        );
        const cityWithLowestFirstAvg = Object.keys(
          averageFirstCollectsByCity
        ).filter(
          (city) =>
            calculateAverage(averageFirstCollectsByCity[city]) ===
            lowestAverageFirstCollect
        );

        setCityWithHighestFirstAvg(cityWithHighestFirstAvg);
        setCityWithLowestFirstAvg(cityWithLowestFirstAvg);
        //***************************************************************** */
        const averageSecondCollectsByCity = {};

        usersData.forEach((user) => {
          const city = user.location;
          if (!averageSecondCollectsByCity[city]) {
            averageSecondCollectsByCity[city] = [];
          }
          averageSecondCollectsByCity[city].push(...user.SecondCollect);
        });

        const averageSecondCollects = Object.values(
          averageSecondCollectsByCity
        ).map((data) => calculateAverage(data));

        const highestAverageSecondCollect = Math.max(...averageSecondCollects);
        const lowestAverageSecondCollect = Math.min(...averageSecondCollects);

        setHighestAverageSecondCollect(highestAverageSecondCollect);
        setLowestAverageSecondCollect(lowestAverageSecondCollect);

        // Find the city with the highest and lowest average first collect********************************************************************

        const cityWithHighestSecondAvg = Object.keys(
          averageSecondCollectsByCity
        ).filter(
          (city) =>
            calculateAverage(averageSecondCollectsByCity[city]) ===
            highestAverageSecondCollect
        );
        const cityWithLowestSecondAvg = Object.keys(
          averageSecondCollectsByCity
        ).filter(
          (city) =>
            calculateAverage(averageSecondCollectsByCity[city]) ===
            lowestAverageSecondCollect
        );

        setCityWithHighestSecondAvg(cityWithHighestSecondAvg);
        setCityWithLowestSecondAvg(cityWithLowestSecondAvg);
        //**************************************************************************************************** */
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsersData();
  }, [selectedLocation, selectedYear]);

  const calculateAverage = (data) => {
    if (data.length === 0) {
      return 0; // Handle empty array case
    }

    const sum = data.reduce((acc, num) => {
      const parsedNum = parseFloat(num);
      return isNaN(parsedNum) ? acc : acc + parsedNum;
    }, 0);

    return sum / data.length;
  };
  const renderRow = (label, value) => {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  };

  const handleFooterButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };
  return (
    <ImageBackground
      source={require("../../../assets/stats.jpg")}
      style={[styles.background, { opacity: 0.9 }]}
    >
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedYear}
            onValueChange={handleYearChange}
            style={styles.picker}
          >
            <Picker.Item label="2022" value="2022" />
            <Picker.Item label="2023" value="2023" />
            <Picker.Item label="2024" value="2024" />
            <Picker.Item label="2025" value="2025" />
            <Picker.Item label="2026" value="2026" />
            <Picker.Item label="2027" value="2027" />
            <Picker.Item label="2028" value="2028" />
            <Picker.Item label="2029" value="2029" />
            <Picker.Item label="2030" value="2030" />
          </Picker>
        </View>

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Statistics</Text>

          <FlatList
            data={[
              {
                label: "Highest Average FirstCollect:",
                value: highestAverageFirstCollect.toFixed(2) + "%",
              },
              {
                label: "Cities Highest AVC:",
                value: cityWithHighestFirstAvg,
              },
              {
                label: "Lowest Average Firstcollect:",
                value: lowestAverageFirstCollect.toFixed(2) + "%",
              },
              {
                label: "City with Lowest Average Firstcollect:",
                value: cityWithLowestFirstAvg,
              },
              {
                label: "Highest Average Secondcollect:",
                value: highestAverageSecondCollect.toFixed(2) + "%",
              },
              {
                label: "City with Highest Average Secondcollect:",
                value: cityWithHighestSecondAvg,
              },
              {
                label: "Lowest Average Secondcollect:",
                value: lowestAverageSecondCollect.toFixed(2) + "%",
              },
              {
                label: "City with Lowest Average Secondcollect:",
                value: cityWithLowestSecondAvg,
              },
            ]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => renderRow(item.label, item.value)}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => handleFooterButtonPress("ColonySearchScreen")}
        >
          <Image
            source={require("../../../assets/search-icon.png")}
            style={styles.footerIcon}
          />
          <Text style={styles.footerButtonText}>ColonySearcn</Text>
        </TouchableOpacity>
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

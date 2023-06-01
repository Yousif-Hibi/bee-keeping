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

export default function Finance({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name"); // default search type is name
  const [userData, setUserData] = useState([]);
  const [filterType, setFilterType] = useState("name"); // default filter type is name
  const [originalData, setOriginalData] = useState([]); // Store the original data
  const [nameSortOrder, setNameSortOrder] = useState(""); // Sort order for name column
  const [locationSortOrder, setLocationSortOrder] = useState(""); // Sort order for location column
  const [selectedLocation, setSelectedLocation] = useState("");
  const [firstCollectData, setFirstCollectData] = useState([]);
  const [totalFirstCollect, setTotalFirstCollect] = useState(0);
  const [averageFirstCollect, setAverageFirstCollect] = useState(0);
  const [secondCollectData, setSecondCollectData] = useState([]);
  const [totalSecondCollect, setTotalSecondCollect] = useState(0);
  const [averageSecondCollect, setAverageSecondCollect] = useState(0);
  const [averageCollect, setAverageCollect] = useState(0);

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
            Firstcollect: data.Firstcollect,
            SecondCollect: data.Secondcollect,
          };
        });

        const filteredData = usersData.filter(
          (user) => user.location === "Beit Hanina / بيت حنينا"
        );

        const allFirstCollectData = filteredData.flatMap(
          (user) => user.Firstcollect
        );

        const allSecondCollectData = filteredData.flatMap(
          (user) => user.SecondCollect
        );

        const sumFirstCollect = allFirstCollectData.reduce(
          (accumulator, current) => accumulator + current,
          0
        );

        const sumSecondCollect = allSecondCollectData.reduce(
          (accumulator, current) => accumulator + current,
          0
        );

        const averageFirstCollect = calculateAverage(allFirstCollectData);
        const averageSecondCollect = calculateAverage(allSecondCollectData);
        const averageCollect = (averageFirstCollect + averageSecondCollect) / 2;

        setFirstCollectData(allFirstCollectData);
        setTotalFirstCollect(sumFirstCollect);
        setSecondCollectData(allSecondCollectData);
        setTotalSecondCollect(sumSecondCollect);
        setAverageFirstCollect(averageFirstCollect);
        setAverageSecondCollect(averageSecondCollect);
        setAverageCollect(averageCollect);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsersData();
  }, []);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>finance</Text>
      <Text>Average Firstcollect: {averageFirstCollect}</Text>
      <Text>Average SecondCollect: {averageSecondCollect}</Text>
      <Text>Average Collect: {averageCollect}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

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
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../config/firebase";
import styles from "./style";
import { Picker } from "@react-native-picker/picker";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";

export default function Statistics({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [averageFirstCollect, setAverageFirstCollect] = useState(0);
  const [averageSecondCollect, setAverageSecondCollect] = useState(0);
  const [averageCollect, setAverageCollect] = useState(0);
  const [selectedYear, setSelectedYear] = useState("");
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
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };
  const handleFooterButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };
  return (
    <ImageBackground
      source={require("../../../assets/stats.jpg")}
      style={[styles.background, { opacity: 0.9 }]}
    >
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLocation}
            style={styles.picker}
            onValueChange={(value) => setSelectedLocation(value)}
          >
            <Picker.Item label="All Cities" value="" />
            {cities.map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>
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
          {renderRow(
            "Average First Collect:",
            averageFirstCollect.toFixed(2) + "%"
          )}
          {renderRow(
            "Average Second Collect:",
            averageSecondCollect.toFixed(2) + "%"
          )}
          {renderRow("Average Collect:", averageCollect.toFixed(2) + "%")}
        </View>
        <View style={styles.chartContainer}>
          <VictoryChart domainPadding={30}>
            <VictoryAxis
              dependentAxis
              tickFormat={(tick) => `${tick}%`}
              style={{
                tickLabels: { fontSize: 10, padding: 5 },
              }}
              domain={[0, 100]}
            />
            <VictoryBar
              data={[
                {
                  label: "Average First Collect",
                  value: averageFirstCollect,
                },
                {
                  label: "Average Second Collect",
                  value: averageSecondCollect,
                },
                {
                  label: "Average Collect",
                  value: averageCollect,
                },
              ]}
              x="label"
              y="value"
              style={{
                data: {
                  fill: ({ datum }) => {
                    if (datum.label === "Average First Collect")
                      return "#FF5733";
                    if (datum.label === "Average Second Collect")
                      return "#33FF55";
                    if (datum.label === "Average Collect") return "#3366FF";
                    return "gray";
                  },
                },
                labels: {
                  fontSize: 12,
                  padding: 5,
                  angle: 45,
                  verticalAnchor: "start",
                  textAnchor: "start",
                },
              }}
              labelComponent={<VictoryLabel dy={8} />} // Adjust the dy value to control the label position
            />
          </VictoryChart>
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

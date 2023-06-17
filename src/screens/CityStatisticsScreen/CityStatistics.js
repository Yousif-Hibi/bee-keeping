import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../config/firebase";
import { VictoryPie } from "victory-native";

const colors = [
  "#FF3E3E",
  "#FF9F1C",
  "#FFCD3C",
  "#8BE84B",
  "#27AE60",
  "#23C3C3",
  "#2979FF",
  "#8B5BE8",
  "#D663FF",
  "#FF3E96",
];

export default function CityStatistics({ navigation }) {
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const usersCollectionRef = collection(database, "keepers");
        const usersQuerySnapshot = await getDocs(usersCollectionRef);

        const cityCounts = {};

        usersQuerySnapshot.forEach((doc) => {
          const city = doc.data().location;
          if (cityCounts[city]) {
            cityCounts[city] += 1;
          } else {
            cityCounts[city] = 1;
          }
        });

        const cityData = Object.entries(cityCounts).map(
          ([city, count], index) => ({
            city,
            count,
            color: colors[index % colors.length],
          })
        );

        setCityData(cityData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCityData();
  }, []);
  const handleFooterButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };
  return (
    <ImageBackground style={[styles.background, { opacity: 1 }]}>
      <View style={styles.container}>
        <View style={styles.halfCircle}>
          <Text style={styles.title}>Keepers Population</Text>
        </View>
        <View style={styles.chartContainer}>
          <VictoryPie
            data={cityData}
            x="city"
            y="count"
            colorScale={colors}
            labels={({ datum }) => datum.count.toString()} // Display count as labels
          />
        </View>
        <View style={styles.legendContainer}>
          {cityData.map(({ city, count, color }) => (
            <View key={city} style={styles.legendItem}>
              <View style={[styles.colorSquare, { backgroundColor: color }]} />
              <Text style={styles.legendText}>{city}</Text>
              <Text style={styles.countText}>{count}</Text>
            </View>
          ))}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fefcf1",
  },
  chartContainer: {
    marginBottom: 20,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    height: 60,
  },
  footerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  footerButtonText: {
    fontSize: 12,
  },
  background: {
    flex: 1,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 5,
  },
  colorSquare: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    marginRight: 5,
  },
  countText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  halfCircle: {
    opacity: 0.8,
    marginLeft: 30,
    width: "100%",
    aspectRatio: 3, // Adjust the aspect ratio to change the curvature of the half circle
    borderTopLeftRadius: 200,
    borderBottomLeftRadius: 200,
    backgroundColor: "#f9e6b9", // Adjust the background color as desired
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});

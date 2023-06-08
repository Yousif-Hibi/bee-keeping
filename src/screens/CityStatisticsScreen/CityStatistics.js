import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../config/firebase";
import { VictoryPie } from "victory";

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

export default function CityStatistics() {
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

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { StatusBar } from "react-native";
import styles from "./styles";

export default function AdminInfoScreen({ navigation }) {
  const handleFooterButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };
  return (
    <ImageBackground
      source={require("../../../assets/beesbackground.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Statistics</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => navigation.navigate("CityStatsScreen")}
          >
            <Text style={styles.buttonText}>CityCollects Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => navigation.navigate("AvgStatsScreen")}
          >
            <Text style={styles.buttonText}>Average Stats</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.circle}
            onPress={() => navigation.navigate("CityStatisticsScreen")}
          >
            <Text style={styles.buttonText}>Keepers Stats</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
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

import React, { useState } from "react";
// import { StatusBar } from "expo-status-bar";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "@react-native-firebase/app";
import Home from "./src/screens/HomeScreen/Home";
import AdminInfo from "./src/screens/AdminInfoScreen/AdminInfo";
import AddParticipant from "./src/screens/AddParticipantScreen/AddParticipant";
import CheckMessages from "./src/screens/CheckMessagesScreen/CheckMessages";
import CheckerInfo from "./src/screens/CheckerInfoScreen/CheckerInfo";
import ColonySearch from "./src/screens/ColonySearchScreen/ColonySearch";
import Statistics from "./src/screens/StatisticsScreen/Statistics";
import ColAccIInfo from "./src/screens/ColAccInfoScreen/ColAccIInfo";
import Chat from "./src/screens/ChatScreen/Chat";
import UserInfo from "./src/screens/UserInfoScreen/UserInfo";
import EditUser from "./src/screens/EditUserScreen/EditUser";
import UserCheckMessages from "./src/screens/UserCheckMassagesScreen/UserCheckMassages";
import CityStatistics from "./src/screens/CityStatisticsScreen/CityStatistics";
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="AdminInfoScreen" component={AdminInfo} />
        <Stack.Screen name="CheckerInfoScreen" component={CheckerInfo} />
        <Stack.Screen name="ColonySearchScreen" component={ColonySearch} />
        <Stack.Screen name="CheckMessagesScreen" component={CheckMessages} />
        <Stack.Screen name="AddParticipantScreen" component={AddParticipant} />
        <Stack.Screen name="StatisticsScreen" component={Statistics} />
        <Stack.Screen name="ColAccInfoScreen" component={ColAccIInfo} />
        <Stack.Screen name="ChatScreen" component={Chat} />
        <Stack.Screen name="UserInfoScreen" component={UserInfo} />
        <Stack.Screen name="EditUserScreen" component={EditUser} />
        <Stack.Screen
          name="UserCheckMessagesScreen"
          component={UserCheckMessages}
        />
        <Stack.Screen name="CityStatisticsScreen" component={CityStatistics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

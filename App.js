import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home/HomeScreen";
import AdminInfoScreen from "./src/screens/AdminInfo/AdminInfoScreen";
import AddParticipant from "./src/screens/Add Participant/AddParticipant";
import CheckMessages from "./src/screens/Check Messages/CheckMessages";
import CheckerInfoScreen from "./src/screens/CheckerInfo/CheckerInfoScreen";
import ColonySearch from "./src/screens/Colony Search/ColonySearch";
import Finance from "./src/screens/Finance/Finance";
import ColAccinfo from "./src/screens/ColonyAccountInfo/ColAccinfo";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AdminInfo" component={AdminInfoScreen} />
        <Stack.Screen name="CheckerInfo" component={CheckerInfoScreen} />
        <Stack.Screen name="Colony Search" component={ColonySearch} />
        <Stack.Screen name="Check Messages" component={CheckMessages} />
        <Stack.Screen name="Add Participant" component={AddParticipant} />
        <Stack.Screen name="Finance" component={Finance} />
        <Stack.Screen name="ColonyAccountInfo" component={ColAccinfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

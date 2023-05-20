
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, CheckBox, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { ImageBackground } from "react-native";
import { StatusBar } from "react-native";
import { database } from "../../../config/firebase";
import { auth } from "../../../config/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function UserInfoScreen({ navigation, route }) {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const colnum = 5;
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = auth.currentUser.uid; // Get the UID of the current user
      const userDocRef = doc(database, "keepers", uid);

      try {
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUser(userData);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, []);

  const renderTableRows = () => {
    const rows = [];
    for (let i = 1; i <= colnum; i++) {
      rows.push(
        <View style={styles.tableRow} key={i}>
          <Text style={styles.tableCell}>{i}</Text>
          <Text style={styles.tableCell}>{colnum}</Text>
          <Text style={styles.tableCell}>Half Frame</Text>
          <Text style={styles.tableCell}>Full Frame</Text>
        </View>
      );
    }
    return rows;
  };
  return (
    <ImageBackground
      source={require("../../../assets/beesbackground.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={styles.square}>
            <Image
              source={require("../../../assets/user.png")}
              style={styles.image}
            />
            {user && <Text style={styles.title}>{user.name}</Text>}
          </View>

          <View style={styles.text}>
            {user && <Text style={styles.texts}>{user.location}</Text>}
            {user && <Text style={styles.texts}>{user.phoneNumber}</Text>}
            {user && <Text style={styles.texts}>{user.idNumber}</Text>}
          </View>
        </View>
        {/*
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ChatScreen")}
        >
          <View style={styles.row}>
            <Text style={styles.titleSend}>Send a message</Text>

          </View>
        </TouchableOpacity>

        <View style={styles.row}>
          {user && <Text style={styles.texts}>{user.payment}</Text>}
          <Text style={styles.label}>الرسوم:</Text>
        </View>

        <View style={styles.row}>
          {user && <Text style={styles.texts}>{user.placeOfHive}</Text>}
          <Text style={styles.label}>مكان تربية النحل:</Text>
        </View>

        <View style={styles.row}>
          {user && <Text style={styles.texts}>{user.NumberOfHives.length}</Text>}
          <Text style={styles.label}>عدد المناحل:</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>توقيع الوثيقة</Text>
          <CheckBox value={isChecked1} onValueChange={setIsChecked1} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>وصل استلام</Text>
          <CheckBox value={isChecked2} onValueChange={setIsChecked2} />
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Number</Text>
          <Text style={styles.tableHeaderText}>Colnumber</Text>
          <Text style={styles.tableHeaderText}>Half Frame</Text>
          <Text style={styles.tableHeaderText}>Full Frame</Text>
        </View>

        {user &&
          user.NumberOfHives.map((_, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.tableCell}>{i + 1}</Text>
              <Text style={styles.tableCell}>{user.NumberOfHives[i]}</Text>
              <Text style={styles.tableCell}>{user.halfFrame[i]}</Text>
              <Text style={styles.tableCell}>{user.fullFrame[i]}</Text>
</View>
          ))} */}
        
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}


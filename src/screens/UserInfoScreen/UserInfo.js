import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  CheckBox,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./styles";
import { ImageBackground } from "react-native";
import { StatusBar } from "react-native";
import { database } from "../../../config/firebase";
import { auth } from "../../../config/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function UserInfoScreen({ navigation, route }) {
  const [user, setUser] = useState(null);
  const [isSignatureChecked, setIsSignatureChecked] = useState(false);
  const [isObtainChecked, setIsObtainChecked] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = route.params.uid; // Get the uid from the route parameters
      const userDocRef = doc(database, "keepers", uid);

      try {
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUser(userData);

          setIsSignatureChecked(userData && userData.signature);
          setIsObtainChecked(userData && userData.obtain);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, [route.params.uid]); // Add route.pa

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
          {user && <Text style={styles.texts}>{user.hiveIDs.length}</Text>}
          <Text style={styles.label}>عدد المناحل:</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>توقيع الوثيقة</Text>
          <CheckBox
            value={isSignatureChecked}
            disabled={!user || !user.signature}
            onValueChange={null}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>وصل استلام</Text>
          <CheckBox
            value={isObtainChecked}
            disabled={!user || !user.obtain}
            onValueChange={null}
          />
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Number</Text>
          <Text style={styles.tableHeaderText}>Colnumber</Text>
          <Text style={styles.tableHeaderText}>Half Frame</Text>
          <Text style={styles.tableHeaderText}>Full Frame</Text>
        </View>

        {user &&
          user.hiveIDs.map((_, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.tableCell}>{i + 1}</Text>
              <Text style={styles.tableCell}>{user.hiveIDs[i]}</Text>
              <Text style={styles.tableCell}>{user.Halfframe[i]}</Text>
              <Text style={styles.tableCell}>{user.Fullframe[i]}</Text>
            </View>
          ))}

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

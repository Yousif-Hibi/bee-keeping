import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import styles from "./styles";
import { ImageBackground } from "react-native";
import { StatusBar } from "react-native";
import { database } from "../../../config/firebase";
import { auth } from "../../../config/firebase";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { CheckBox } from "react-native-elements";

export default function UserInfoScreen({ navigation, route }) {
  const [isSignatureChecked, setIsSignatureChecked] = useState(false);
  const [isObtainChecked, setIsObtainChecked] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = route.params.uid;
      const admin = auth.currentUser.uid;

      const userDocRef = doc(database, "keepers", uid);

      try {
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUser(userData);
          setIsSignatureChecked(userData?.signature || false);
          setIsObtainChecked(userData?.obtain || false);

          const currentUser = auth.currentUser;
          if (
            currentUser &&
            Array.isArray(userData.admins) &&
            userData.admins.includes(currentUser.uid)
          ) {
            setIsUserAdmin(true);
          }
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
    checkIfUserIsAdmin();
  }, [route.params.uid]);

  const checkIfUserIsAdmin = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const adminRef = doc(database, "admins", currentUser.uid);
      try {
        const adminDocSnapshot = await getDoc(adminRef);
        setShowEditButton(adminDocSnapshot.exists());
      } catch (error) {
        console.error("Error checking admin:", error);
      }
    }
  };

  const handleEditProfile = () => {
    const uid = route.params.uid;
    navigation.navigate("EditUserScreen", { uid });
  };

  const handleDeleteUser = async () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: confirmDeleteUser, style: "destructive" },
      ],
      { cancelable: false }
    );
  };

  const confirmDeleteUser = async () => {
    const uid = route.params.uid;
    const userDocRef = doc(database, "keepers", uid);

    try {
      await deleteDoc(userDocRef);
      console.log("User deleted successfully");
      // Show a success message or navigate to another screen if needed
    } catch (error) {
      console.error("Error deleting user:", error);
      // Show an error message or handle the error appropriately
    }
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
          {user && <Text style={styles.texts}>{user.hiveLocation}</Text>}
          <Text style={styles.label}>مكان تربية النحل:</Text>
        </View>

        <View style={styles.row}>
          {user && <Text style={styles.texts}>{user.hiveIDs.length}</Text>}
          <Text style={styles.label}>عدد المناحل:</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>توقيع الوثيقة</Text>
          <CheckBox
            checked={isSignatureChecked}
            disabled={!user || !user.signature}
            onPress={() => setIsSignatureChecked(!isSignatureChecked)}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>وصل استلام</Text>
          <CheckBox
            checked={isObtainChecked}
            disabled={!user || !user.obtain}
            onPress={() => setIsObtainChecked(!isObtainChecked)}
          />
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>رقم</Text>
          <Text style={styles.tableHeaderText}>رقم المنحلة</Text>
          <Text style={styles.tableHeaderText}>نصف اطار</Text>
          <Text style={styles.tableHeaderText}>اطار كامل</Text>
        </View>

        {user?.hiveIDs.map((_, i) => (
          <View style={styles.tableRow} key={i}>
            <Text style={styles.tableCell}>{i + 1}</Text>
            <Text style={styles.tableCell}>{user.hiveIDs[i]}</Text>
            <Text style={styles.tableCell}>{user.Halfframe[i]}</Text>
            <Text style={styles.tableCell}>{user.Fullframe[i]}</Text>
          </View>
        ))}

        {showEditButton && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.Deletebutton}
              onPress={handleEditProfile}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Deletebutton}
              onPress={handleDeleteUser}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

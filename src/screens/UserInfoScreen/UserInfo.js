import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ImageBackground } from "react-native";
import { StatusBar } from "react-native";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { CheckBox } from "react-native-elements";
import { database, auth } from "../../../config/firebase";
import styles from "./styles";

export default function UserInfoScreen({ navigation, route }) {
  const [isSignatureChecked, setIsSignatureChecked] = useState(false);
  const [isObtainChecked, setIsObtainChecked] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2023");

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

  const handleFooterButtonPress = (screenName) => {
    navigation.navigate(screenName);
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

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <ImageBackground style={styles.background}>
      <ScrollView style={styles.container}>
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

        <View style={styles.row}>
          {user && <Text style={styles.texts}>{user.payment}</Text>}
          <Text style={styles.label}>الرسوم:</Text>
        </View>

        <View style={styles.row}>
          {user && <Text style={styles.texts}>{user.hiveLocation}</Text>}
          <Text style={styles.label}>مكان تربية النحل:</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>توقيع الوثيقة</Text>
          <CheckBox
            checked={isSignatureChecked}
            disabled={!user || !user.signature}
            onPress={() => setIsSignatureChecked(!isSignatureChecked)}
            checkedColor="black"
            uncheckedColor="black"
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>وصل استلام</Text>
          <CheckBox
            checked={isObtainChecked}
            disabled={!user || !user.obtain}
            onPress={() => setIsObtainChecked(!isObtainChecked)}
            checkedColor="black"
            uncheckedColor="black"
          />
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

        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>رقم</Text>
          <Text style={styles.tableHeaderText}>رقم المنحلة</Text>
          <Text style={styles.tableHeaderText}>قطف اول</Text>
          <Text style={styles.tableHeaderText}> قطف ثاني</Text>
        </View>

        {user?.hiveIDs?.length > 0 ? (
          user.hiveIDs.map((hiveID, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.tableCell}>{i + 1}</Text>
              <Text style={styles.tableCell}>{hiveID}</Text>
              <Text style={styles.tableCell}>
                {user.year[selectedYear]?.Firstcollect?.[i] || 0}
              </Text>
              <Text style={styles.tableCell}>
                {user.year[selectedYear]?.Secondcollect?.[i] || 0}
              </Text>
            </View>
          ))
        ) : (
          <Text>No hive IDs available.</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("UserCheckMessagesScreen", { userId: user })
          }
        >
          <Text style={styles.buttonText}>الرسائل</Text>
        </TouchableOpacity>

        {showEditButton && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.editbutton}
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
      </ScrollView>
      {showEditButton && (
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
      )}
    </ImageBackground>
  );
}
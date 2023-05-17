import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { database } from "../../../config/firebase";
//import ColAccinfo from "../ColonyAccountInfo/ColAccinfo";

export default function AddParticipant({ navigation }) {
  const userCollectionRef = collection(database, "keepers");
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullNameError, setFullNameError] = useState(false);
  const [fullNameErrorMessage, setFullNameErrorMessage] = useState("");
  const [idNumberError, setIdNumberError] = useState(false);
  const [idNumberErrorMessage, setIdNumberErrorMessage] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [cityError, setCityError] = useState(false);
  const [cityErrorMessage, setCityErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");

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

  const handleCreateAccount = () => {
    if (fullName === "") {
      setFullNameError(true);
      setFullNameErrorMessage("*Full name is required");
    } else {
      if (/\d/.test(fullName)) {
        setFullNameError(true);
        setFullNameErrorMessage("*Full name cannot contain numbers");
      } else {
        setFullNameError(false);
        setFullNameErrorMessage("");
      }
    }

    if (idNumber === "") {
      setIdNumberError(true);
      setIdNumberErrorMessage("*ID number is required");
    } else {
      if (!/^\d{9}$/.test(idNumber)) {
        setIdNumberError(true);
        setIdNumberErrorMessage(
          "*ID number must be 9 digits and cannot contain letters"
        );
      } else {
        setIdNumberError(false);
        setIdNumberErrorMessage("");
      }
    }

    if (PhoneNumber === "") {
      setPhoneNumberError(true);
      setPhoneNumberErrorMessage("*Phone number is required");
    } else if (!/^\d+$/.test(PhoneNumber)) {
      setPhoneNumberError(true);
      setPhoneNumberErrorMessage("*Phone number should contain only numbers");
    } else {
      setPhoneNumberError(false);
      setPhoneNumberErrorMessage("");
    }

    if (city === "") {
      setCityError(true);
      setCityErrorMessage("*Location is required");
    } else {
      setCityError(false);
      setCityErrorMessage("");
    }

    if (username === "") {
      setUsernameError(true);
      setUsernameErrorMessage("*Username is required");
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (password === "") {
      setPasswordError(true);
      setPasswordErrorMessage("*Password is required");
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (confirmPassword === "") {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("*Confirm Password is required");
    } else {
      if (confirmPassword !== password ) {
        setConfirmPasswordError(true);
        setConfirmPasswordErrorMessage("*Passwords not matched");
      }
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }

    if (
      fullName !== "" &&
      idNumber !== "" &&
      PhoneNumber !== "" &&
      city !== "" &&
      username !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      addData();
      navigation.navigate("ColAccInfoScreen");
    }
  };

  // const addData = async () => {
  //   // Step 1: Add a new document to the collection
  //   const newDocRef = await db.collection('keepers').add({ IDNumber: idNumber });
  
  //   // Step 2: Update the added document with additional data
  //   await newDocRef.update({ FullName: fullName });
  
  //   // Clear the input after adding data
  //   setIdNumber("");
  //   setFullName("");
  // };
  const addData = async () => {
    await addDoc(userCollectionRef, { name: fullName,idNumber: idNumber,phoneNumber: PhoneNumber,location: city,UserName: username,Password: password });
    
    setFullName("");
    setIdNumber("");
    setPhoneNumber("");
    setCity("");
    setUsername("");
    setPassword("");
  };

  
  

  return (
    <ImageBackground
      source={require("../../../assets/beesbackground.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Add Participant</Text>
        <TextInput
          style={[styles.input, fullNameError && styles.errorInput]}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        {fullNameError && (
          <Text style={styles.errorText}>{fullNameErrorMessage}</Text>
        )}
        <TextInput
          style={[styles.input, idNumberError && styles.errorInput]}
          placeholder="ID Number"
          value={idNumber}
          onChangeText={setIdNumber}
        />
        {idNumberError && (
          <Text style={styles.errorText}>{idNumberErrorMessage}</Text>
        )}
        <TextInput
          style={[styles.input, phoneNumberError && styles.errorInput]}
          placeholder="Phone Number"
          value={PhoneNumber}
          onChangeText={setPhoneNumber}
        />
        {phoneNumberError && (
          <Text style={styles.errorText}>{phoneNumberErrorMessage}</Text>
        )}
        <Picker
          selectedValue={city}
          style={[styles.input, cityError && styles.errorInput]}
          onValueChange={(itemValue) => setCity(itemValue)}
        >
          <Picker.Item label="Select City" value="" />
          {cities.map((city) => (
            <Picker.Item key={city} label={city} value={city} />
          ))}
        </Picker>
        {cityError && <Text style={styles.errorText}>{cityErrorMessage}</Text>}

        <TextInput
          style={[styles.input, usernameError && styles.errorInput]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        {usernameError && (
          <Text style={styles.errorText}>{usernameErrorMessage}</Text>
        )}
        <TextInput
          style={[styles.input, passwordError && styles.errorInput]}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {passwordError && (
          <Text style={styles.errorText}>{passwordErrorMessage}</Text>
        )}
        <TextInput
          style={[styles.input, confirmPasswordError && styles.errorInput]}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        {confirmPasswordError && (
          <Text style={styles.errorText}>{confirmPasswordErrorMessage}</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

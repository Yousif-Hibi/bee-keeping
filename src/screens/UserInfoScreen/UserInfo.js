import React, { useState } from "react";
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

export default function UserInfoScreen({ navigation }) {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const colnum = 5; // Change the value of colnum as needed

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
            <Text style={styles.title}>عزيزة بدران</Text>
          </View>

          <View style={styles.text}>
            <Text style={styles.texts}>البلد القديمة</Text>
            <Text style={styles.texts}> 907597330</Text>
            <Text style={styles.texts}> 0543547505</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ChatScreen")}
        >
          <View style={styles.row}>
            <Text style={styles.titleSend}>send a massege </Text>
            <Image
              source={require("../../../assets/sendMassege.png")}
              style={styles.sendimage}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.txt}>500</Text>
          <Text style={styles.label}> الرسوم :</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.txt}>سطح</Text>
          <Text style={styles.label}>مكان تربية النحل:</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.txt}>5</Text>
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
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>1</Text>
          <Text style={styles.tableCell}>206</Text>
          <Text style={styles.tableCell}>1.75</Text>
          <Text style={styles.tableCell}>0.5</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>2</Text>
          <Text style={styles.tableCell}>207</Text>
          <Text style={styles.tableCell}>1.75</Text>
          <Text style={styles.tableCell}>0</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>3</Text>
          <Text style={styles.tableCell}>506</Text>
          <Text style={styles.tableCell}>0.75</Text>
          <Text style={styles.tableCell}>0.1</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>4</Text>
          <Text style={styles.tableCell}>6</Text>
          <Text style={styles.tableCell}>0.75</Text>
          <Text style={styles.tableCell}>1.5</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>5</Text>
          <Text style={styles.tableCell}>46</Text>
          <Text style={styles.tableCell}>1.25</Text>
          <Text style={styles.tableCell}>0.75</Text>
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

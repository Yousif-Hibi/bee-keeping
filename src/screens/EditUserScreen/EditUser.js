import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    CheckBox,
    TouchableOpacity,
    Image,
    Switch,
} from "react-native";
import styles from "./styles";
import { ImageBackground } from "react-native";
import { StatusBar } from "react-native";
import { database } from "../../../config/firebase";
import { auth } from "../../../config/firebase";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditUserScreen({ navigation, route }) {
    const [keeperData, setKeeperData] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchKeeperData = async () => {
            const uid = route.params.uid;
            if (!uid) {
                console.log("Invalid uid");
                return;
            }

            const keeperDocRef = doc(database, "keepers", uid);

            try {
                const keeperDocSnapshot = await getDoc(keeperDocRef);

                if (keeperDocSnapshot.exists()) {
                    const keeper = keeperDocSnapshot.data();
                    setKeeperData(keeper);
                    setEditedData(keeper);

                    const newTableData = keeper.hiveIDs.map((hiveID, index) => ({
                        hiveID,
                        Fullframe: keeper.Fullframe[index],
                        Halfframe: keeper.Halfframe[index],
                    }));
                    setTableData(newTableData);
                } else {
                    console.log("Keeper not found");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchKeeperData();
    }, [route?.params?.uid]);

    const handleInputChange = (key, value) => {
        setEditedData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleSaveChanges = async () => {
        const uid = auth.currentUser.uid;
        if (!uid) {
            console.log("Invalid uid");
            return;
        }

        const keeperDocRef = doc(database, "keepers", uid);

        try {
            await updateDoc(keeperDocRef, editedData);
            console.log("Keeper data updated successfully!");
            navigation.navigate("UserInfoScreen");
        } catch (error) {
            console.error("Error updating keeper data:", error);
        }
    };

    if (!keeperData) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    const handleTableInputChange = (index, key, value) => {
        const updatedTableData = tableData.map((rowData, rowIndex) => {
            if (rowIndex === index) {
                return {
                    ...rowData,
                    [key]: value,
                };
            }
            return rowData;
        });

        setTableData(updatedTableData);

        // Update editedData with the changes
        const updatedEditedData = { ...editedData };
        updatedEditedData.hiveIDs[index] = updatedTableData[index].hiveID;
        updatedEditedData.Fullframe[index] = updatedTableData[index].Fullframe;
        updatedEditedData.Halfframe[index] = updatedTableData[index].Halfframe;
        setEditedData(updatedEditedData);
    };

    return (
        <ImageBackground
            source={require("../../../assets/beesbackground.jpg")}
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>Name:</Text>
                </View>
                <TextInput
                    style={styles.input}
                    value={editedData.name}
                    onChangeText={(value) => handleInputChange("name", value)}
                />

                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>Phone Number:</Text>
                </View>
                <TextInput
                    style={styles.input}
                    value={editedData.phoneNumber}
                    onChangeText={(value) => handleInputChange("phoneNumber", value)}
                />

                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>Location:</Text>
                </View>
                <TextInput
                    style={styles.input}
                    value={editedData.location}
                    onChangeText={(value) => handleInputChange("location", value)}
                />

                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>ID:</Text>
                </View>
                <TextInput
                    style={styles.input}
                    value={editedData.idNumber}
                    onChangeText={(value) => handleInputChange("idNumber", value)}
                />

                <View style={styles.toggleContainer}>
                    <Text style={styles.labelText}>Signature:</Text>
                    <Switch
                        style={styles.switch}
                        value={editedData.signature}
                        onValueChange={(value) => handleInputChange("signature", value)}
                    />
                </View>

                <View style={styles.toggleContainer}>
                    <Text style={styles.labelText}>Obtain:</Text>
                    <Switch
                        style={styles.switch}
                        value={editedData.obtain}
                        onValueChange={(value) => handleInputChange("obtain", value)}
                    />
                </View>

                <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Hive ID</Text>
                        <Text style={styles.tableHeaderText}>Full Frame</Text>
                        <Text style={styles.tableHeaderText}>Half Frame</Text>
                    </View>

                    {tableData.map((rowData, index) => (
                        <View style={styles.tableRow} key={index}>
                            <TextInput
                                style={styles.tableCell}
                                value={rowData.hiveID}
                                onChangeText={(value) =>
                                    handleTableInputChange(index, "hiveID", value)
                                }
                            />
                            <TextInput
                                style={styles.tableCell}
                                value={rowData.Fullframe}
                                onChangeText={(value) =>
                                    handleTableInputChange(index, "Fullframe", value)
                                }
                            />
                            <TextInput
                                style={styles.tableCell}
                                value={rowData.Halfframe}
                                onChangeText={(value) =>
                                    handleTableInputChange(index, "Halfframe", value)
                                }
                            />
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

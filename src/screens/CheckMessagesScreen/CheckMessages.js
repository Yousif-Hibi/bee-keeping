import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  orderBy,
  query,
  collectionGroup,
  where,
  limit,
} from "firebase/firestore";
import { database } from "../../../config/firebase";
import { useNavigation } from "@react-navigation/native";

export default function CheckMessages() {
  const [chatIDs, setChatIDs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchChatIDs = async () => {
      try {
        const chatsRef = collection(database, "chats");
        const querySnapshot = await getDocs(query(chatsRef));
        const chatIDsData = [];
        const chatNames = new Set();

        for (const docSnapshot of querySnapshot.docs) {
          const data = docSnapshot.data();
          const name = data.name ?? "Unknown";

          const uid1 = data.id1;
          const uid2 = data.id2;
          let time = data.createdAt;

          let uid = null;
          if (uid1 === "vSASeJ65mCgLlwCOGSRDnt6Mpuv1") {
            uid = uid2;
          } else if (uid2 === "vSASeJ65mCgLlwCOGSRDnt6Mpuv1") {
            uid = uid1;
          }

          if (uid) {
            const keeperRef = doc(database, "keepers", uid);
            const keeperDoc = await getDoc(keeperRef);

            if (keeperDoc.exists()) {
              const keeperData = keeperDoc.data();
              const chatRef = collection(
                database,
                "chats",
                docSnapshot.id,
                "messages"
              );
              const querySnapshot = await getDocs(
                query(chatRef, orderBy("createdAt", "desc"), limit(1))
              );
              let lastMessage = null;

              const existingChat = chatIDsData.find((chat) => chat.uid === uid);

              if (existingChat) {
                // Update the existing chat's last message

                if (existingChat.lastMessage.createdAt < time) {
                  existingChat.lastMessage.createdAt = time;
                }
              } else {
                // Add a new chat
                chatIDsData.push({
                  id: docSnapshot.id,
                  name: name,
                  uid: uid,
                  keeperData: keeperData,
                  lastMessage: lastMessage || { createdAt: time },
                });
                chatNames.add(name);
              }
            } else {
              console.log(
                `No matching keeper document found for uid '${uid}'.`
              );
            }
          }
        }

        const filteredChatIDsData = chatIDsData.filter((chat) => {
          // Add your name filter condition here
          return chatNames.has(chat.name);
        });

        filteredChatIDsData.sort((a, b) => {
          const timeA = a.lastMessage.createdAt;
          const timeB = b.lastMessage.createdAt;
          console.log(timeA);
          console.log(timeB);
          // First, sort by lastMessage.createdAt in descending order
          const sortByTime = timeB - timeA;

          // If the values are equal, perform secondary sorting based on another property
          if (sortByTime === 0) {
            // Add your secondary sorting condition here
            // For example, sorting alphabetically based on chat name
            return a.name.localeCompare(b.name);
          }

          return sortByTime;
        });

        console.log(filteredChatIDsData);
        setChatIDs(filteredChatIDsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChatIDs();
  }, []);

  const handleChatPress = (item) => {
    const uid = item.uid;
    console.log("Chat1:", uid);
    setSelectedUser(uid);
    navigation.navigate("ChatScreen", { uid });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  const handleFooterButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={chatIDs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.itemContainer, index !== 0 && styles.itemSeparator]}
            onPress={() => handleChatPress(item)}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            {item.lastMessage && (
              <Text style={styles.itemLastMessage}>
                Last Message: {item.lastMessage.createdAt.toDate().toString()}
              </Text>
            )}
          </TouchableOpacity>
        )}
        reverse={true} // Display the latest messages first
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  itemSeparator: {
    marginTop: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemLastMessage: {
    fontSize: 12,
    color: "#888888",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    height: 60,
  },
  footerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  footerButtonText: {
    fontSize: 12,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { collection, getDocs, doc, getDoc, orderBy, query, collectionGroup, where, limit } from 'firebase/firestore';
import { database } from '../../../config/firebase';
import { useNavigation } from '@react-navigation/native';

export default function CheckMessages() {
  const [chatIDs, setChatIDs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchChatIDs = async () => {
    setLoading(true);
    try {
      const chatsRef = collection(database, 'chats');
      const querySnapshot = await getDocs(query(chatsRef));
      const chatIDsData = [];
      const chatNames = new Set();

      for (const docSnapshot of querySnapshot.docs) {
        const data = docSnapshot.data();
        const name = data.name ?? 'Unknown';

        const uid1 = data.id1;
        const uid2 = data.id2;
        let time = data.createdAt;

        let uid = null;
        if (uid1 === 'vSASeJ65mCgLlwCOGSRDnt6Mpuv1') {
          uid = uid2;
        } else if (uid2 === 'vSASeJ65mCgLlwCOGSRDnt6Mpuv1') {
          uid = uid1;
        }

        if (uid) {
          const keeperRef = doc(database, 'keepers', uid);
          const keeperDoc = await getDoc(keeperRef);

          if (keeperDoc.exists()) {
            const keeperData = keeperDoc.data();
            const chatRef = collection(database, 'chats', docSnapshot.id, 'messages');
            const querySnapshot = await getDocs(query(chatRef, orderBy('createdAt', 'desc'), limit(1)));
            let lastMessage = null;

            const existingChat = chatIDsData.find(chat => chat.uid === uid);

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
                lastMessage: lastMessage || { createdAt: time }
              });
              chatNames.add(name);
            }
          } else {
            console.log(`No matching keeper document found for uid '${uid}'.`);
          }
        }
      }

      const filteredChatIDsData = chatIDsData.filter(chat => {
        // Add your name filter condition here
        return chatNames.has(chat.name);
      });

      filteredChatIDsData.sort((a, b) => {
        const timeA = a.lastMessage.createdAt;
        const timeB = b.lastMessage.createdAt;

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

      setChatIDs(filteredChatIDsData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatIDs();
  }, []);

  const handleChatPress = (item) => {
    const uid = item.uid;
    console.log('Chat1:', uid);
    setSelectedUser(uid);
    navigation.navigate('ChatScreen', { uid });
  };

  const handleRefresh = () => {
    fetchChatIDs();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
    
      <FlatList
        data={chatIDs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.itemContainer,
              index !== 0 && styles.itemSeparator
            ]}
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
    </View>
  );
}

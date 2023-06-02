import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { auth, database } from '../../../config/firebase';
import { useNavigation } from '@react-navigation/native';

export default function CheckMessages() {
  const [keepers, setKeepers] = useState([]);
  const userUID = auth.currentUser?.uid;
  const navigation = useNavigation();
  const [selectedUser, setSelectedUser] = useState(null); // Newly added state variable

  useEffect(() => {
    const fetchKeepers = async () => {
      const keepersRef = collection(database, 'keepers');
      const q = query(
        keepersRef,
        orderBy('name')
      );

      const querySnapshot = await getDocs(q);
      const keepersData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
      setKeepers(keepersData);
    };

    if (userUID) {
      fetchKeepers();
    }
  }, [userUID]);

  const handleChatPress = (userId) => { // Updated function to receive the user ID
    setSelectedUser(userId); // Store the selected user ID
    
    navigation.navigate('ChatScreen', { userId }); // Pass the user ID to ChatScreen
  };

  return (
    <View>
      <Text>All Keepers</Text>
      <FlatList
        data={keepers}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChatPress(item.id)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

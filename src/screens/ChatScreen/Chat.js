import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  getDoc,
  orderBy,
  query,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { auth, database } from '../../../config/firebase';

export default function ChatScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const adminId = auth.currentUser?.uid; // Admin's ID
  const userId = route.params.uid; // User's ID received from the route

  useEffect(() => {

    if (adminId && userId) {
      const chatRef = collection(database, 'chats');
      const q = query(
        chatRef,
        where('id1', 'in', [adminId, userId]),
        where('id2', 'in', [adminId, userId]),
        orderBy('createdAt', 'desc'),
        orderBy('__name__', 'desc')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updatedMessages = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const message = {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: {
              _id: data.id2,
            },
          };
          return message;
        });
        setMessages(updatedMessages);
      });

      return unsubscribe;
    }
  }, [adminId, userId]);

  useEffect(() => {
    // Load previous messages when the component mounts
    loadPreviousMessages();
  }, []);

  const loadPreviousMessages = async () => {
    try {
      const chatRef = collection(database, 'chats');
      const q = query(
        chatRef,
        where('id1', 'in', [adminId, userId]),
        where('id2', 'in', [adminId, userId]),
        orderBy('createdAt', 'desc'),
        orderBy('__name__', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const updatedMessages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const message = {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.id2,
          },
        };
        return message;
      });
      setMessages(updatedMessages);
    } catch (error) {
      console.log('Error loading previous messages:', error);
    }
  };

  const onSend = useCallback(async (messages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    try {
      const adminRef = doc(database, 'keepers', route.params.uid);
      const docSnapshot = await getDoc(adminRef);
      if (docSnapshot.exists()) {
        const adminData = docSnapshot.data();
        const adminName = adminData.name;

        messages.forEach((message) => {
          addDoc(collection(database, 'chats'), {
            text: message.text,
            createdAt: new Date(),
            id1: adminId === auth.currentUser?.uid ? userId : adminId,
            id2: adminId === auth.currentUser?.uid ? adminId : userId,
            name: adminName, // Add the admin's name to the message data
          })
            .then(() => {
              console.log('Message saved successfully');
            })
            .catch((error) => {
              console.log('Error saving message:', error);
            });
        });

        console.log('Admin Name:', adminName);
      }
    } catch (error) {
      console.log('Error fetching admin name:', error);
    }
  }, [adminId, userId]);


  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#FFD700",
          },
          left: {
            backgroundColor: 'gray',
          },
        }}
        textStyle={{
          right: {
            color: 'black',
          },
          left: {
            color: 'black',
          },
        }}
        timeTextStyle={{
          right: {
            color: 'black',
          },
          left: {
            color: 'black',
          },
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: adminId,
        }}
        renderBubble={renderBubble}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

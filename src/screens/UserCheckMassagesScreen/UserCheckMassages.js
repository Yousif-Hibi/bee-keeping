import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {
    collection,
    doc,
    getDocs,
    addDoc,
    orderBy,
    query,
    onSnapshot,
    where,
} from 'firebase/firestore';
import { auth, database } from '../../../config/firebase';

export default function ChatScreen({ route }) {
    const [messages, setMessages] = useState([]);
    const adminId = 'vSASeJ65mCgLlwCOGSRDnt6Mpuv1' ; // Admin's ID
    const userId = auth.currentUser?.uid; // User's ID received from the route

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

    const onSend = useCallback((messages) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );

        messages.forEach((message) => {
            addDoc(collection(database, 'chats'), {
                text: message.text,
                createdAt: new Date(),
                id1: adminId === auth.currentUser?.uid ? adminId : userId,
                id2: adminId === auth.currentUser?.uid ? userId : adminId,
            })
                .then(() => {
                    console.log('Message saved successfully');
                })
                .catch((error) => {
                    console.log('Error saving message:', error);
                });
        });
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

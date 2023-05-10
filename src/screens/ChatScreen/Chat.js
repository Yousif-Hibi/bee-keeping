import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        const newMessage = [
          {
            _id: Math.random().toString(),
            createdAt: new Date(),
            image: response.uri,
            user: {
              _id: 1,
              name: 'Me',
            },
          },
        ];
        onSend(newMessage);
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 2,
        }}
      />
      <TouchableOpacity onPress={handleChoosePhoto}>
        <Text>Send photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './styles';

const ChatPage = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Handle sending the message
    console.log('Sending message:', message);
    setMessage('');
  };

  const handleImageUpload = () => {
    // Handle image upload
    console.log('Upload photo');
  };

  return (
    <ImageBackground source={require('../../../assets/beesbackground.jpg')} style={{ flex: 1 }}>
      {/* Chat messages */}
      <View style={{ flex: 1 }}>
        {/* Render chat messages here */}
      </View>

      {/* Message input */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, padding: 10 }}
          placeholder="Type a message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleImageUpload}>
          <Text style={styles.buttonText}>Upload photo</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ChatPage;

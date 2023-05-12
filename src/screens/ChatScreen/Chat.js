import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const ChatPage = () => {
  const [image, setImage] = useState(null);

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.uri) {
        setImage(response);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.messages}>
        <Text style={styles.message}>Hello!</Text>
        <Text style={styles.message}>How are you?</Text>
        {image && (
          <Image source={{ uri: image.uri }} style={styles.image} />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.photoButton} onPress={handleChoosePhoto}>
          <Text style={styles.buttonText}>Upload Photo</Text>
        </TouchableOpacity>
        <Button title="Send" onPress={() => console.log('Message sent!')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messages: {
    flex: 1,
    padding: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  photoButton: {
    marginRight: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatPage;

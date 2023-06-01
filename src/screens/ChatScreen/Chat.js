import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { auth, database } from "../../../config/firebase";

const ChatPage = () => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    // Get the current user's UID from Firebase
    const currentUserUID = auth.currentUser.uid;
    console.log(currentUserUID);

    try {
      // Get a reference to the messages node in the Realtime Database
      const messagesRef = database.ref("messages");

      // Create a new message entry
      const newMessageRef = messagesRef.push();

      // Build the message object
      const newMessage = {
        id: newMessageRef.key,
        senderUID: currentUserUID,
        recipientUID: "vSASeJ65mCgLlwCOGSRDnt6Mpuv1", // Replace 'SPECIFIC_USER_UID' with the UID of the specific user you want to send the message to
        content: message,
        timestamp: new Date().toISOString(),
      };

      // Save the message in the Realtime Database
      await newMessageRef.set(newMessage);

      console.log("Message sent:", newMessage);

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleImageUpload = () => {
    // Handle image upload
    console.log("Upload photo");
  };

  return (
    <ImageBackground
      source={require("../../../assets/beesbackground.jpg")}
      style={{ flex: 1 }}
    >
      {/* Chat messages */}
      <View style={{ flex: 1 }}>{/* Render chat messages here */}</View>

      {/* Message input */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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

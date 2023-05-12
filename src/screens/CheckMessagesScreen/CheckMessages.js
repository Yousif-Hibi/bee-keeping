import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Modal, ImageBackground ,TextInput } from "react-native";
import styles from "./styles";
import { StatusBar } from 'react-native';

export default function CheckMessages() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  function handleSend() {
    // Send the message to the backend server or API
    // Then add the message to the list of messages
    setMessages([...messages, message]);
    setMessage('');
  }
  function textPress() {
    setIsModal2Visible(true);


  }
  function imgPress() {
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
    setIsModal2Visible(false);
  }

  return (
    <ImageBackground
      source={require('../../../assets/beesbackground.jpg')}
      style={styles.background}
    >
      <TouchableOpacity style={styles.square}>
        <TouchableOpacity onPress={imgPress}>
          <Image source={require('../../../assets/image.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={textPress}>
<<<<<<< HEAD:src/screens/Check Messages/CheckMessages.js
          <Text style={styles.text}>عزيزة بدران</Text>
=======
          <Text style={styles.text}>New msg here</Text>
>>>>>>> 3a4b91f0d91ba7019844c370b49a329826f5d920:src/screens/CheckMessagesScreen/CheckMessages.js
        </TouchableOpacity>
        <Modal animationType='fade' transparent={true} visible={isModalVisible}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <View style={styles.modalContent}>
              <Image source={require('../../../assets/beeColony.jpg')} style={styles.imagePop} />
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal animationType='fade' transparent={true} visible={isModal2Visible}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>الاسم :- عزيزة بدران</Text>
              <Text style={styles.modalText}>خلبة 2 وضع ممتاز يجب اضافة طبقة</Text>



              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Type your message here"
                  value={message}
                  onChangeText={setMessage}
                />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                      <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
              



              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
      


      {/* /////////////////////////////////////////////////////// */}
      {/* doublacations  */}
      <TouchableOpacity style={styles.square}>
        <TouchableOpacity onPress={imgPress}>
          <Image source={require('../../../assets/image.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={textPress}>
          <Text style={styles.text}>سهير ابو رميلة
</Text>
        </TouchableOpacity>
        <Modal animationType='fade' transparent={true} visible={isModalVisible}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <View style={styles.modalContent}>
              <Image source={require('../../../assets/beeColony.jpg')} style={styles.imagePop} />
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal animationType='fade' transparent={true} visible={isModal2Visible}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>الاسم :- عزيزة بدران</Text>
              <Text style={styles.modalText}>خلبة 2 وضع ممتاز يجب اضافة طبقة</Text>



              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Type your message here"
                  value={message}
                  onChangeText={setMessage}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>




              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>




      <TouchableOpacity style={styles.square}>
        <TouchableOpacity onPress={imgPress}>
          <Image source={require('../../../assets/image.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={textPress}>
          <Text style={styles.text}>صابرين قاسم</Text>
        </TouchableOpacity>
        <Modal animationType='fade' transparent={true} visible={isModalVisible}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <View style={styles.modalContent}>
              <Image source={require('../../../assets/beeColony.jpg')} style={styles.imagePop} />
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal animationType='fade' transparent={true} visible={isModal2Visible}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>الاسم :- عزيزة بدران</Text>
              <Text style={styles.modalText}>خلبة 2 وضع ممتاز يجب اضافة طبقة</Text>



              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Type your message here"
                  value={message}
                  onChangeText={setMessage}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>




              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>




      <TouchableOpacity style={styles.square}>
        <TouchableOpacity onPress={imgPress}>
          <Image source={require('../../../assets/image.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={textPress}>
          <Text style={styles.text}> ديما حمدان
</Text>
        </TouchableOpacity>
        <Modal animationType='fade' transparent={true} visible={isModalVisible}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <View style={styles.modalContent}>
              <Image source={require('../../../assets/beeColony.jpg')} style={styles.imagePop} />
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal animationType='fade' transparent={true} visible={isModal2Visible}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>الاسم :- عزيزة بدران</Text>
              <Text style={styles.modalText}>خلبة 2 وضع ممتاز يجب اضافة طبقة</Text>



              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Type your message here"
                  value={message}
                  onChangeText={setMessage}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>




              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>


















    </ImageBackground>
  );
}

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity ,Image} from 'react-native';
import styles from "./style";
import { ImageBackground } from 'react-native';
import { StatusBar } from 'react-native';


export default function UserInfoScreen({ navigation }) {
    return (
        <ImageBackground source={require('../../../assets/beesbackground.jpg')} style={styles.background}>
            <View style={styles.containesr}>
    
                <View style={styles.head}>
                    <View style={styles.square}>
                            <Image source={require('../../../assets/user.png')} style={styles.image} />
                        <Text style={styles.title}>عزيزة بدران</Text>
                        </View>

                        
                    <View style={styles.text}>
                    <Text style={styles.texts} >البلد القديمة</Text>
                        <Text style={styles.texts} > 907597330</Text>
                        <Text style={styles.texts} > 0543547505</Text>
                        </View>
                    </View>
                         
                <TouchableOpacity style={styles.button}>
                    <View style={styles.row}>
                    <Text style={styles.titleSend}>send a massege </Text>
                        <Image source={require('../../../assets/sendMassege.png')} style={styles.sendimage} /></View>
                </TouchableOpacity>









                <View style={styles.row}>
                    <Text style={styles.txt}>500</Text>
                    <Text style={styles.label} > الرسوم  :</Text>
                    
                </View>

                <View style={styles.row}>
                    <Text style={styles.txt}>سطح</Text>
                    <Text style={styles.label}>مكان تربية النحل:</Text>
                    
                </View>

                <View style={styles.row}>
                    <Text style={styles.txt}>5</Text>
                    <Text style={styles.label}>عدد المناحل:</Text>
                   
                </View>

                <View style={styles.row}>
                    <Text style={styles.txt}>5</Text>
                    <Text style={styles.label}>ستلام المناحل -امراة:</Text>
                    
                </View>











                <StatusBar style="auto" />
            </View>
        </ImageBackground>
    );
}
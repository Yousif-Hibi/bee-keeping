import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const logo = require('./assets/logo.jpg');
const Stack = createStackNavigator();
//hg
function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Authenticate the user with custom username and password
    if (username === 'amir' && password === 'amir123') {
      // Navigate to another screen on successful authentication
      navigation.navigate('AdminInfo');
    }
    else if (username === 'checker1' && password === 'checker1123') {
      // Navigate to another screen on successful authentication
      navigation.navigate('CheckerInfo');
    } else {
      alert('Invalid username or password');
    }
  };
  return (
    <ImageBackground source={require('./assets/beesbackground.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Bees App!</Text>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
<TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}




function AdminInfoScreen({ navigation }) {
  return (
    <ImageBackground source={require('./assets/beesbackground.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Admin!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Colony Search')}>
          <Text style={styles.buttonText}>Coliny Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Check Messages')}>
          <Text style={styles.buttonText}>Check Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add Participent')}>
          <Text style={styles.buttonText}>Add Participent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('finance')}>
          <Text style={styles.buttonText}>Finance</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}
function CheckerInfoScreen({ navigation }) {
  return (
    <ImageBackground source={require('./assets/beesbackground.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, checker!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Colony Search')}>
          <Text style={styles.buttonText}>Coliny Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Check Messages')}>
          <Text style={styles.buttonText}>Check Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add Participent')}>
          <Text style={styles.buttonText}>Add Participent</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

function ColonySearch() {
  return (
    <ImageBackground source={require('./assets/beesbackground.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>colonysearch</Text>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

function CheckMessages() {
  return (
    <ImageBackground source={require('./assets/beesbackground.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Messages Page</Text>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

function AddParticipent() {
  return (
    <ImageBackground source={require('./assets/beesbackground.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Participent</Text>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}
function finance() {
  return (
    <ImageBackground source={require('./assets/beesbackground.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>finance</Text>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AdminInfo" component={AdminInfoScreen} />
        <Stack.Screen name="CheckerInfo" component={CheckerInfoScreen} />
        <Stack.Screen name="Colony Search" component={ColonySearch} />
        <Stack.Screen name="Check Messages" component={CheckMessages} />
        <Stack.Screen name="Add Participent" component={AddParticipent} />
        <Stack.Screen name="finance" component={finance} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%'
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

import React, { useState } from 'react';
import {  StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';

export default function ColonySearch() {
  

  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name'); // default search type is name

  const handleSearch = () => {
    // handle search logic here
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/beesbackground.jpg')} style={styles.backgroundImage}>
        <Text style={styles.title}>Colony Search</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
            placeholder="Search by name, ID, or colony number"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      
      
        <View style={styles.table}>
  <View style={styles.tableHeader}>
    <Text style={styles.columnHeader}>Name</Text>
    <Text style={styles.columnHeader}>Phone</Text>
    <Text style={styles.columnHeader}>ID</Text>
    <Text style={styles.columnHeader}>Area</Text>
    <Text style={styles.columnHeader}>Col/num</Text>
    <Text style={styles.columnHeader}>Num/col</Text>
    <Text style={styles.columnHeader}>Msgs</Text>
  </View>
  <View style={styles.tableRow}>
    <Text style={styles.column}>samantha</Text>
    <Text style={styles.column}>0525454174</Text>
    <Text style={styles.column}>315456756</Text>
    <Text style={styles.column}>beitsafafa</Text>
    <Text style={styles.column}>206</Text>
    <Text style={styles.column}>1</Text>
    <Text style={styles.column}>Nomsg</Text>
  </View>
  <View style={styles.tableRow}>
    <Text style={styles.column}>Jane</Text>
    <Text style={styles.column}>0526454867</Text>
    <Text style={styles.column}>3164857566</Text>
    <Text style={styles.column}>oldcity</Text>
    <Text style={styles.column}>745</Text>
    <Text style={styles.column}>1</Text>
    <Text style={styles.column}>Newmsg</Text>
  </View>
  {/* Add more rows here */}
</View>
      
      </ImageBackground>
    </View>
    
  );
}
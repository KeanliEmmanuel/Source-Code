import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const searchResults = [
  { id: '1', name: 'brown Wallet', image: require('../../assets/images/walletImage.png'), location: 'Central Park', date: '2023-06-01' },
  { id: '2', name: 'iPhone 12', image: require('../../assets/images/phoneImage.png'), location: 'Downtown', date: '2023-06-02' },
  // Add more search results as needed
];

const SearchPage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Image source={item.image} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultLocation}>Location: {item.location}</Text>
        <Text style={styles.resultDate}>Date: {item.date}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ItemDetails', { item })}>
        <FontAwesome name="arrow-right" size={24} color="#174EC8" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>Search</Text>
      </View>
      <View style={styles.searchContainer}> 
        <TextInput
          style={styles.searchInput}
          placeholder="Search lost or found items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FontAwesome name="search" size={20} color="#555" style={styles.searchIcon} />
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 30,
    height: 30,
  },
  headerTitle: {
    fontSize: 20,
    color: '#174EC8',
    fontFamily: 'Roboto-Bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: 40,
    fontFamily: 'Roboto-Regular',
  },
  listContent: {
    paddingVertical: 10,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  resultImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Roboto-Bold',
    marginBottom: 5,
  },
  resultLocation: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Roboto-Regular',
    marginBottom: 5,
  },
  resultDate: {
    fontSize: 12,
    color: '#aaa',
    fontFamily: 'Roboto-Regular',
  },
});

export default SearchPage;

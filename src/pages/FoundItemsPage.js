import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { collection, getDocs, doc } from 'firebase/firestore';  // Ensure 'doc' is imported
import { db } from '../firebase/firebaseConfig';
import NoItemsFound from '../components/NoItemsFound';


const FoundItemsPage = ({ navigation }) => {
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'foundItems'));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setFoundItems(items);
      } catch (error) {
        console.error('Error fetching found items:', error);
      }
    };

    fetchFoundItems();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('FoundItemDetail', { item })}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.objectType}</Text>
        <Text style={styles.itemText}>Color: {item.natureColor}</Text>
        <Text style={styles.itemText}>Location Found: {item.locationFound}</Text>
        <Text style={styles.itemText}>Description: {item.description}</Text>
        <Text style={styles.itemText}>Date Posted: {new Date(item.timestamp.seconds * 1000).toLocaleDateString()}</Text>
        <Text style={[styles.itemStatus, { color: item.found ? '#4CAF50' : '#F44336' }]}>
          Status: {item.found ? 'Claimed' : 'Unclaimed'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recently Found Items</Text>
      <FlatList
        data={foundItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#174EC8',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  itemText: {
    fontSize: 14,
    marginBottom: 2,
    color: '#555',
  },
  itemStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default FoundItemsPage;

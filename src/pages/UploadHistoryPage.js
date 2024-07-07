import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';

const UploadHistoryPage = ({ navigation }) => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const user = auth.currentUser;
        const foundItemsSnapshot = await getDocs(collection(db, 'foundItems'));
        const lostItemsSnapshot = await getDocs(collection(db, 'lostItems'));

        const foundItems = foundItemsSnapshot.docs
          .filter(doc => doc.data().userId === user.uid)
          .map(doc => ({ id: doc.id, ...doc.data(), type: 'found' }));

        const lostItems = lostItemsSnapshot.docs
          .filter(doc => doc.data().userId === user.uid)
          .map(doc => ({ id: doc.id, ...doc.data(), type: 'lost' }));

        setUploads([...foundItems, ...lostItems]);
      } catch (error) {
        console.error('Error fetching uploads:', error);
      }
    };

    fetchUploads();
  }, []);

  const handleDelete = async (id, type) => {
    try {
      await deleteDoc(doc(db, `${type}Items`, id));
      setUploads(uploads.filter(upload => upload.id !== id));
      Alert.alert('Success', 'Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('UploadDetails', { item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.objectType}</Text>
        <Text style={styles.itemText}>Status: {item.found ? 'Found' : 'Not Found'}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id, item.type)}>
        <FontAwesome name="trash" size={24} color="#F44336" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Upload History</Text>
      {uploads.length === 0 ? (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No items found</Text>
        </View>
      ) : (
        <FlatList
          data={uploads}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
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
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsText: {
    fontSize: 18,
    color: '#174EC8',
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
    alignItems: 'center',
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
    color: '#555',
  },
});

export default UploadHistoryPage;

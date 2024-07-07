import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const OtherFoundPage = ({ navigation }) => {
  const [others, setOthers] = useState([]);

  useEffect(() => {
    const fetchOthers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'foundItems', 'others', 'items'));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setOthers(items);
      } catch (error) {
        console.error('Error fetching others:', error);
      }
    };

    fetchOthers();
  }, []);

  const renderItems = () => {
    return others.map((item) => (
      <View key={item.id} style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.date}>{new Date(item.timestamp.seconds * 1000).toLocaleDateString()}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.status}>{item.found ? 'Claimed' : 'Unclaimed'}</Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recently Found Other Items</Text>
      </View>
      {others.length === 0 ? (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No items found</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {renderItems()}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#174EC8',
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
  card: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  description: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
});

export default OtherFoundPage;

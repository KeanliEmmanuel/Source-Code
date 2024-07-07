import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const FoundDocumentsPage = ({ navigation }) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'foundItems', 'documents', 'items'));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setDocuments(items);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recently Found Documents</Text>
      </View>
      {documents.length === 0 ? (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No documents found</Text>
        </View>
      ) : (
        <View style={styles.content}>
          {documents.map((document) => (
            <View key={document.id} style={styles.card}>
              <Image source={{ uri: document.imageUrl }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.date}>{new Date(document.timestamp.seconds * 1000).toLocaleDateString()}</Text>
                <Text style={styles.description}>{document.description}</Text>
                <Text style={styles.status}>{document.found ? 'Claimed' : 'Unclaimed'}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  info: {
    padding: 10,
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

export default FoundDocumentsPage;

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UploadDetailsPage = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.objectType}</Text>
      <Text style={styles.text}>Color: {item.natureColor}</Text>
      <Text style={styles.text}>Location: {item.locationFound || item.locationLost}</Text>
      <Text style={styles.text}>Description: {item.description}</Text>
      <Text style={styles.text}>Date Posted: {new Date(item.timestamp.seconds * 1000).toLocaleDateString()}</Text>
      <Text style={styles.text}>Status: {item.found ? 'Found' : 'Not Found'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#174EC8',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
});

export default UploadDetailsPage;

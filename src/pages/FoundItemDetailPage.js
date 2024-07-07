// FoundItemDetailPage.js
import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const FoundItemDetailPage = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.objectType}</Text>
      <Text style={styles.text}>Color: {item.natureColor}</Text>
      <Text style={styles.text}>Location Found: {item.locationFound}</Text>
      <Text style={styles.text}>Description: {item.description}</Text>
      <Text style={styles.text}>Date Posted: {new Date(item.timestamp.seconds * 1000).toLocaleDateString()}</Text>
      <Text style={[styles.status, { color: item.found ? '#4CAF50' : '#F44336' }]}>
        Status: {item.found ? 'Claimed' : 'Unclaimed'}
      </Text>
      <Button
        title="Claim"
        onPress={() => navigation.navigate('ClaimItem', { itemId: item.id })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default FoundItemDetailPage;
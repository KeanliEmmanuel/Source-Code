// src/components/NoItemsFound.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoItemsFound = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  message: {
    fontSize: 18,
    color: '#888',
  },
});

export default NoItemsFound;

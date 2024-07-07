// ClaimItemPage.js
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
const ClaimItemPage = ({ navigation, route }) => {
  const [imageUri, setImageUri] = useState(null);
  const [objectType, setObjectType] = useState('');
  const [natureColor, setNatureColor] = useState('');
  const [locationFound, setLocationFound] = useState('');
  const [description, setDescription] = useState('');

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        console.log('Selected image URI:', uri);
        setImageUri(uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleProceedToClaim = () => {
    // Handle claim logic here
    // For now, just show an alert
    Alert.alert('Great!!', 'You will receive a notification in your inbox about your claimed item.');
    navigation.navigate('FoundItems');
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!imageUri || !objectType || !natureColor || !locationFound || !description) {
      Alert.alert('Error', 'Please fill out all fields and select an image.');
      return;
    }

    let imageUrl = '';

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `claimItems/${user.uid}/${new Date().toISOString()}`);
      await uploadBytes(storageRef, blob);
      imageUrl = await getDownloadURL(storageRef);
      // Handle claim logic here
      // For now, just show an alert
      Alert.alert('Great!!', 'You will receive a notification in your inbox about your claimed item.');
      navigation.navigate('FoundItemsPage');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
      return;
    }

    try {
      await addDoc(collection(db, 'claimItems'), {
        userId: user.uid,
        objectType,
        natureColor,
        locationFound,
        description,
        imageUrl,
        timestamp: new Date(),
      });
      Alert.alert('Success', 'Found item registered successfully');
      setImageUri(null);
      setObjectType('');
      setNatureColor('');
      setLocationFound('');
      setDescription('');
      navigation.navigate('FoundItems');
    } catch (error) {
      console.error('Error adding document:', error);
      Alert.alert('Error', 'Failed to register found item');
    }
  };


  
  const deleteItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'foundItems', itemId));
      console.log('Document deleted with ID: ', itemId);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };
  
  
  const updateItem = async (itemId, updatedData) => {
    try {
      const itemRef = doc(db, 'foundItems', itemId);
      await updateDoc(itemRef, updatedData);
      console.log('Document updated with ID: ', itemId);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <FontAwesome name="camera" size={32} color="#174EC8" />
        )}
        <Text style={styles.imagePickerText}>Upload found item image</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Object Type"
        value={objectType}
        onChangeText={setObjectType}
      />
      <TextInput
        style={styles.input}
        placeholder="Nature/Color"
        value={natureColor}
        onChangeText={setNatureColor}
      />
      <TextInput
        style={styles.input}
        placeholder="Location Found"
        value={locationFound}
        onChangeText={setLocationFound}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleProceedToClaim}>
        <Text style={styles.submitButtonText}>Proceed to Claim</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  imagePicker: {
    height: 200,
    width: '100%',
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imagePickerText: {
    marginTop: 10,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    backgroundColor: '#174EC8',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
  },
});


export default ClaimItemPage;

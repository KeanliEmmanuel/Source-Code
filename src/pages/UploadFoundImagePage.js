import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc, doc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const UploadFoundImagePage = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [objectType, setObjectType] = useState('');
  const [natureColor, setNatureColor] = useState('');
  const [locationFound, setLocationFound] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!imageUri || !objectType || !natureColor || !locationFound || !description) {
      Alert.alert('Error', 'Please fill out all fields and select an image.');
      return;
    }

    setLoading(true);

    let imageUrl = '';

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `FoundImages/${objectType}/${user.uid}_${new Date().toISOString()}`);
      await uploadBytes(storageRef, blob);
      imageUrl = await getDownloadURL(storageRef);
      console.log('Image uploaded successfully:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, `foundItems/${objectType}/items`), {
        userId: user.uid,
        objectType,
        natureColor,
        locationFound,
        description,
        imageUrl,
        found: false,
        timestamp: new Date(),
      });
      Alert.alert('Success', 'Found item registered successfully');
      setImageUri(null);
      setObjectType('');
      setNatureColor('');
      setLocationFound('');
      setDescription('');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding document:', error);
      Alert.alert('Error', 'Failed to register found item');
    } finally {
      setLoading(false);
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
      <Picker
        selectedValue={objectType}
        onValueChange={(itemValue) => setObjectType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Object Type" value="" />
        <Picker.Item label="Documents" value="documents" />
        <Picker.Item label="Phones" value="phones" />
        <Picker.Item label="Wallets" value="wallets" />
        <Picker.Item label="Others" value="others" />
      </Picker>
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
      {loading ? (
        <ActivityIndicator size="large" color="#174EC8" />
      ) : (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Register Found Object</Text>
        </TouchableOpacity>
      )}
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
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
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

export default UploadFoundImagePage;
import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import * as Sharing from 'expo-sharing';

const UploadLostImagePage = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [objectType, setObjectType] = useState('');
  const [natureColor, setNatureColor] = useState('');
  const [locationLost, setLocationLost] = useState('');
  const [description, setDescription] = useState('');
  const [share, setShare] = useState(false);

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
    if (!imageUri || !objectType || !natureColor || !locationLost || !description) {
      Alert.alert('Error', 'Please fill out all fields and select an image.');
      return;
    }

    let imageUrl = '';

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `lostItems/${user.uid}/${new Date().toISOString()}`);
      await uploadBytes(storageRef, blob);
      imageUrl = await getDownloadURL(storageRef);
      console.log('Image uploaded successfully:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
      return;
    }

    try {
      await addDoc(collection(db, 'lostItems'), {
        userId: user.uid,
        objectType,
        natureColor,
        locationLost,
        description,
        imageUrl,
        timestamp: new Date(),
      });
      Alert.alert('Success', 'Lost item registered successfully');
      setImageUri(null);
      setObjectType('');
      setNatureColor('');
      setLocationLost('');
      setDescription('');
      if (share) {
        handleShare(imageUrl);
      }
      navigation.navigate('LostItems');
    } catch (error) {
      console.error('Error adding document:', error);
      Alert.alert('Error', 'Failed to register lost item');
    }
  };

  const handleShare = async (imageUrl) => {
    if (!Sharing.isAvailableAsync()) {
      Alert.alert('Error', 'Sharing is not available on this device');
      return;
    }

    try {
      const message = `Lost Item: ${objectType}\nColor: ${natureColor}\nLocation Lost: ${locationLost}\nDescription: ${description}\nImage: ${imageUrl}`;
      await Sharing.shareAsync(imageUrl, {
        dialogTitle: 'Share Lost Object',
        mimeType: 'image/jpeg',
        UTI: 'image/jpeg',
      });
    } catch (error) {
      Alert.alert('Error', `Failed to share: ${error.message}`);
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
        <Text style={styles.imagePickerText}>Upload Lost Item Image</Text>
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
        placeholder="Location Lost"
        value={locationLost}
        onChangeText={setLocationLost}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.shareContainer}>
        <Text style={styles.shareText}>Share to social media?</Text>
        <Switch
          value={share}
          onValueChange={setShare}
          trackColor={{ false: '#767577', true: '#174EC8' }}
          thumbColor={share ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Register Lost Object</Text>
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
    fontSize: 16,
    color: '#4B79A1',
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
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  shareText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
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

export default UploadLostImagePage;

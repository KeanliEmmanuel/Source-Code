import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !subject || !message) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    // Handle form submission logic here
    Alert.alert('Success', 'Your message has been sent!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
        <Image source={require('../../assets/images/contactUsImage.png')} style={styles.heroImage} />
      <View style={styles.formSection}>
        <Text style={styles.title}>Get in Touch</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Subject"
          value={subject}
          onChangeText={setSubject}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contactDetails}>
        <Text style={styles.title}>Contact Information</Text>
        <View style={styles.contactRow}>
          <FontAwesome name="envelope" size={24} color="#174EC8" />
          <Text style={styles.contactText}>support@reunite.com</Text>
        </View>
        <View style={styles.contactRow}>
          <FontAwesome name="phone" size={24} color="#174EC8" />
          <Text style={styles.contactText}>+123 456 7890</Text>
        </View>
        <View style={styles.contactRow}>
          <FontAwesome name="map-marker" size={24} color="#174EC8" />
          <Text style={styles.contactText}>1234 Elm Street, City, Country</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Reunite. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    color: '#174EC8',
    fontFamily: 'Roboto-Bold',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  formSection: {
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: '#174EC8',
    fontFamily: 'Roboto-Bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    width: '100%',
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 15,
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
  contactDetails: {
    width: '100%',
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Roboto-Regular',
    marginLeft: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
    fontFamily: 'Roboto-Regular',
  },
});

export default ContactUsPage;

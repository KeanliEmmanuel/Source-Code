import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AboutPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Image source={require('../../assets/images/heroImage.png')} style={styles.heroImage} />
      <View style={styles.contentSection}>
        <Text style={styles.title}>Our Mission</Text>
        <Text style={styles.text}>
          "Lost2Found" is dedicated to helping people find their lost items and reunite them with their rightful owners. Our mission is to provide a reliable and efficient platform for reporting and finding lost and found items.
        </Text>
      </View>
      <View style={styles.contentSection}>
        <Text style={styles.title}>Our Vision</Text>
        <Text style={styles.text}>
          We envision a world where lost items are quickly found and returned, reducing the stress and inconvenience associated with losing personal belongings. Our goal is to become the go-to platform for lost and found services.
        </Text>
      </View>
      <View style={styles.contentSection}>
        <Text style={styles.title}>Contact Us</Text>
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
    height: 300,
    resizeMode: 'contain',
  },
  contentSection: {
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: '#174EC8',
    fontFamily: 'Roboto-Bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Roboto-Regular',
    lineHeight: 24,
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


export default AboutPage;

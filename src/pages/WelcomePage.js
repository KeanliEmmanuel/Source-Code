import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#174EC8', '#87B5EF']} style={styles.gradient}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/logo2.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>LOST2FOUND</Text>
        </View>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Welcome to Lost2Found</Text>
          <Text style={styles.heroSubtitle}>"You Lossam, We findam!"</Text>
        </View>
        <Image source={require('../../assets/images/welcome_image.png')} style={styles.heroImage} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('SignInSignUp')}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  heroTitle: {
    fontSize: 25,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  heroImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: 20,
  },
  getStartedButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  getStartedText: {
    color: '#174EC8',
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
  },
});

export default WelcomePage;

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SignInPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sign In</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="Username or Email" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.submitButtonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignInSignUp')}>
            <Text style={styles.switchButton}>Register</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.socialContainer}>
          <Text style={styles.orText}>or</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={25} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="apple" size={25} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#174EC8',
    fontFamily: 'Roboto-Bold',
    marginLeft: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    paddingTop: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
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
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  switchText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Roboto-Regular',
  },
  switchButton: {
    fontSize: 16,
    color: '#174EC8',
    fontFamily: 'Roboto-Bold',
    marginLeft: 5,
  },
  socialContainer: {
    alignItems: 'center',
  },
  orText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Roboto-Regular',
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  socialButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default SignInPage;

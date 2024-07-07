import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInSignUpPage from '../pages/SignInSignUpPage';
import SignInPage from '../pages/SignInPage';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignInSignUp">
      <Stack.Screen name="SignInSignUp" component={SignInSignUpPage} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignInPage} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';
import SignInSignUpPage from '../pages/SignInSignUpPage';
import ProfilePage from '../pages/ProfilePage';
import UploadFoundImagePage from '../pages/UploadFoundImagePage';
import UploadLostImagePage from '../pages/UploadLostImagePage';
import NotificationPage from '../pages/NotificationPage';
import SearchPage from '../pages/SearchPage';
import SignInPage from '../pages/SignInPage';
import AboutPage from '../pages/AboutPage';
import HelpPage from '../pages/HelpPage';
import ContactUsPage from '../pages/ContactUsPage';
import FoundDocumentsPage from '../pages/FoundDocumentsPage';
import FoundPhonesPage from '../pages/FoundPhonesPage';
import FoundWalletsPage from '../pages/FoundWalletsPage';
import otherFoundPage from '../pages/otherFoundPage';
import EditProfilePage from '../pages/EditProfilePage';
import UploadHistoryPage from '../pages/UploadHistoryPage';
import UploadDetailsPage from '../pages/UploadDetailsPage';
import LostItemsPage from '../pages/LostItemsPage';
import FoundItemsPage from '../pages/FoundItemsPage';
import FoundItemDetailPage from '../pages/FoundItemDetailPage';
import ClaimItemPage from '../pages/ClaimItemPage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomePage} options={{ headerShown: false }} />
      <Stack.Screen name="SignInSignUp" component={SignInSignUpPage} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignInPage} options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen name="UploadFoundImage" component={UploadFoundImagePage} />
      <Stack.Screen name="UploadLostImage" component={UploadLostImagePage} />
      <Stack.Screen name="Notification" component={NotificationPage} />
      <Stack.Screen name="Search" component={SearchPage} />
      <Stack.Screen name="About" component={AboutPage} />
      <Stack.Screen name="Help" component={HelpPage} />
      <Stack.Screen name="Contact" component={ContactUsPage} />
      <Stack.Screen name="FoundDocuments" component={FoundDocumentsPage} options={{ headerShown: false }}/>
      <Stack.Screen name="FoundPhones" component={FoundPhonesPage} options={{ headerShown: false }}/>
      <Stack.Screen name="FoundWallets" component={FoundWalletsPage} options={{ headerShown: false }}/>
      <Stack.Screen name="OtherFound" component={otherFoundPage} options={{ headerShown: false }}/>
      <Stack.Screen name="EditProfile" component={EditProfilePage} />
      <Stack.Screen name="UploadHistory" component={UploadHistoryPage} />
      <Stack.Screen name="UploadDetails" component={UploadDetailsPage} />
      <Stack.Screen name="LostItems" component={LostItemsPage} />
      <Stack.Screen name="FoundItems" component={FoundItemsPage} options={{ headerShown: false }}/>
      <Stack.Screen name="FoundItemDetail" component={FoundItemDetailPage} />
      <Stack.Screen name="ClaimItem" component={ClaimItemPage} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

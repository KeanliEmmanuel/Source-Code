import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Animated, BackHandler, Alert } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const HomePage = ({ navigation }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(6); // Initialize with the count of your initial notifications

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const updateNotificationCount = (count) => {
    setNotificationCount(count);
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        Alert.alert("Hold on!", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo2.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>Lost2Found</Text>
        <TouchableOpacity onPress={toggleSidebar}>
          <FontAwesome name="bars" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.sidebar, isSidebarVisible ? styles.sidebarVisible : styles.sidebarHidden]}>
        <TouchableOpacity style={styles.closeButton} onPress={toggleSidebar}>
          <FontAwesome name="close" size={24} color="#174EC8" />
        </TouchableOpacity>
        <Text style={styles.sidebarItem} onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="home" size={20} color="#174EC8" /> Home
        </Text>
        <Text style={styles.sidebarItem} onPress={() => navigation.navigate('Profile')}>
          <FontAwesome name="user" size={20} color="#174EC8" /> Profile
        </Text>
        <Text style={styles.sidebarItem} onPress={() => navigation.navigate('Notification', { updateNotificationCount })}>
          <MaterialIcons name="notifications" size={20} color="#174EC8" /> Notifications
        </Text>
        <Text style={styles.sidebarItem} onPress={() => navigation.navigate('Search')}>
          <FontAwesome name="search" size={20} color="#174EC8" /> Search
        </Text>
        <Text style={styles.sidebarItem} onPress={() => navigation.navigate('help')}>
          <FontAwesome name="question-circle" size={20} color="#174EC8" /> Help
        </Text>
        <Text style={styles.sidebarItem} onPress={() => navigation.navigate('About')}>
          <FontAwesome name="info-circle" size={20} color="#174EC8" /> About us
        </Text>
        <Text style={styles.sidebarItem} onPress={() => navigation.navigate('UploadHistory')}>
          <FontAwesome name="history" size={20} color="#174EC8" /> Your uploads
        </Text>
        <Text style={styles.sidebarItem} onPress={() => navigation.navigate('Contact')}>
          <FontAwesome name="envelope" size={20} color="#174EC8" /> Contact us
        </Text>
        <Text style={styles.sidebarItem} onPress={() => { alert('you successfully logout!!'); navigation.navigate('SignInSignUp') }}>
          <FontAwesome name="sign-out" size={20} color="#174EC8" /> Logout
        </Text>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Find What Matters</Text>
          <Text style={styles.heroSubtitle}>Your trusted partner in reuniting lost treasures</Text>
          <Image source={require('../../assets/images/heroImage.png')} style={styles.heroImage} />
        </View>

        <Text style={styles.sectionTitle}>Recently found items</Text>
        <Text style={styles.SubsectionTitle}>Check here</Text>
        <View style={styles.categoryGrid}>
          <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('FoundDocuments')}>
            <FontAwesome name="file-text-o" size={28} color="#fff" />
            <Text style={styles.categoryText}>Documents</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('FoundPhones')}>
            <FontAwesome name="mobile" size={40} color="#fff" />
            <Text style={styles.categoryText}>Phones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('FoundWallets')}>
            <FontAwesome name="file-text-o" size={28} color="#fff" />
            <Text style={styles.categoryText}>Wallets</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('OtherFound')}>
            <FontAwesome name="ellipsis-h" size={28} color="#fff" />
            <Text style={styles.categoryText}>Others</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity style={[styles.actionButton, styles.lostButton]} onPress={() => navigation.navigate('UploadLostImage')}>
            <Text style={styles.actionButtonText}>Report Lost Item</Text>
            <FontAwesome name="arrow-right" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.foundButton]} onPress={() => navigation.navigate('UploadFoundImage')}>
            <Text style={styles.actionButtonText}>Report Found Item</Text>
            <FontAwesome name="arrow-right" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="home" size={25} color="#174EC8" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Search')}>
          <FontAwesome name="search" size={25} color="#174EC8" />
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
        <View style={styles.notificationIconContainer}>
          <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Notification', { updateNotificationCount })}>
            <MaterialIcons name="notifications" size={25} color="#174EC8" />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>{notificationCount}</Text>
              </View>
            )}
            <Text style={styles.footerText}>Notifications</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Profile')}>
          <FontAwesome name="user" size={25} color="#174EC8" />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#174EC8',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 20, 
    color: '#fff',
    fontFamily: 'Roboto-Bold',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '70%',
    backgroundColor: '#fff',
    zIndex: 1000,
    paddingTop: 60,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sidebarHidden: {
    transform: [{ translateX: -500 }],
  },
  sidebarVisible: {
    transform: [{ translateX: 0 }],
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  sidebarItem: {
    fontSize: 18,
    color: '#174EC8',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  heroTitle: {
    fontSize: 24,
    color: '#333',
    fontFamily: 'Roboto-Bold',
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Roboto-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  heroImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 22,
    color: '#174EC8',
    fontFamily: 'Roboto-Bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  SubsectionTitle: {
    textAlign: 'center',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  category: {
    backgroundColor: '#174EC8',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
    width: '40%',
  },
  categoryText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  actionSection: {
    marginVertical: 20,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 15,
  },
  lostButton: {
    backgroundColor: '#87B5EF',
  },
  foundButton: {
    backgroundColor: '#87B5EF',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerIcon: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#174EC8',
    fontFamily: 'Roboto-Regular',
    marginTop: 5,
  },
  notificationIconContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    right: 10,
    top: -10,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomePage;

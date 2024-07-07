import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const initialNotifications = [
  { id: '1', title: 'New found item matched!', description: 'A found wallet matches your lost item report.', time: '2 hrs ago' },
  { id: '2', title: 'Lost item update', description: 'Your lost phone report has been updated.', time: '5 hrs ago' },
  { id: '3', title: 'New found item added!', description: 'A found phone matches your lost item report.', time: '3 hrs ago' },
  { id: '4', title: 'Lost item reminder', description: 'Don’t forget to update your lost item details.', time: '6 hrs ago' },
  { id: '5', title: 'Claimed item', description: 'Your found wallet has been claimed.', time: '1 day ago' },
  { id: '6', title: 'Verification update', description: 'Your lost item verification is complete.', time: '1 day ago' },
];

const NotificationPage = ({ route }) => {
  const { updateNotificationCount } = route.params;
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDeleteNotification = (id) => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedNotifications = notifications.filter(notification => notification.id !== id);
            setNotifications(updatedNotifications);
            updateNotificationCount(updatedNotifications.length);
          },
          style: "destructive",
        },
      ]
    );
  };



  const renderItem = ({ item }) => (
    <LinearGradient colors={['#F0F4FF', '#D9E4FF']} style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="notifications" size={24} color="#174EC8" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDeleteNotification(item.id)}>
        <FontAwesome name="trash" size={24} color="#FF6B6B" />
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.notificationList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image source={require('../../assets/images/notificationEmpty.png')} style={styles.emptyImage} />
          <Text style={styles.emptyText}>No notifications yet!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#174EC8',
    textAlign: 'center',
    marginVertical: 16,
  },
  notificationList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#174EC8',
  },
  notificationDescription: {
    fontSize: 14,
    marginBottom: 4,
    color: '#666',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  deleteIcon: {
    marginLeft: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
});

export default NotificationPage;
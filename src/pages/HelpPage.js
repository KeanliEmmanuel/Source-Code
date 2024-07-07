import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const faqs = [
  {
    question: 'How do I report a lost item?',
    answer: 'To report a lost item, go to the Home page and click on "Report Lost Item". Fill in the necessary details and submit the form.'
  },
  {
    question: 'How do I report a found item?',
    answer: 'To report a found item, go to the Home page and click on "Report Found Item". Fill in the necessary details and submit the form.'
  },
  {
    question: 'How can I update my profile?',
    answer: 'To update your profile, go to the Profile page and click on the edit icon. Make the necessary changes and save them.'
  },
  // Add more FAQs as needed
];

const HelpPage = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Image source={require('../../assets/images/supportImage.png')} style={styles.heroImage} />

      <View style={styles.contentSection}>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity onPress={() => toggleFAQ(index)} style={styles.faqQuestionContainer}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <FontAwesome name={expandedFAQ === index ? 'chevron-up' : 'chevron-down'} size={20} color="#174EC8" />
            </TouchableOpacity>
            {expandedFAQ === index && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
          </View>
        ))}
      </View>
      <View style={styles.contentSection}>
        <Text style={styles.title}>Contact Us</Text>
        <View style={styles.contactRow}>
          <FontAwesome name="envelope" size={24} color="#174EC8" />
          <Text style={styles.contactText} onPress={() => Linking.openURL('mailto:support@reunite.com')}>support@Lost2Found.com</Text>
        </View>
        <View style={styles.contactRow}>
          <FontAwesome name="phone" size={24} color="#174EC8" />
          <Text style={styles.contactText} onPress={() => Linking.openURL('tel:+1234567890')}>+123 456 7890</Text>
        </View>
        <View style={styles.contactRow}>
          <FontAwesome name="map-marker" size={24} color="#174EC8" />
          <Text style={styles.contactText}>1234 Elm Street, City, Country</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Lost2Found. All rights reserved.</Text>
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
  faqItem: {
    marginBottom: 10,
  },
  faqQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  faqQuestion: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Roboto-Bold',
  },
  faqAnswer: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
    fontFamily: 'Roboto-Regular',
    padding: 15,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
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

export default HelpPage;

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, ScrollView } from '../components/Themed';

export default function DietScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>Diet for Malaria Patients</Text> */}

      <View style={styles.infoContainer}>
        <Text style={styles.heading}>1. Stay Hydrated</Text>
        <Text style={styles.description}>
          It's essential to stay well-hydrated when you have malaria. Drink plenty of clean and safe water
          throughout the day. Oral rehydration solutions can also be beneficial.
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.heading}>2. Easy-to-Digest Foods</Text>
        <Text style={styles.description}>
          Consume foods that are easy to digest, such as rice, bananas, applesauce, and plain toast (the BRAT diet).
          These foods are gentle on the stomach and provide energy.
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.heading}>3. Nutrient-Rich Foods</Text>
        <Text style={styles.description}>
          Include nutrient-rich foods like fresh fruits, vegetables, lean proteins, and whole grains in your diet to
          support your immune system during recovery.
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.heading}>4. Avoid Spicy and Heavy Foods</Text>
        <Text style={styles.description}>
          Steer clear of spicy, greasy, and heavy foods, as they can irritate the stomach and worsen symptoms. Stick
          to bland and simple meals.
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.heading}>5. Vitamin and Mineral Supplements</Text>
        <Text style={styles.description}>
          Your healthcare provider may recommend vitamin and mineral supplements to address any deficiencies.
          Follow their advice closely.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    // backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#777',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});
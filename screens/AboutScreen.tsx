import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, Text, ScrollView } from '../components/Themed';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/images/malaria_image.jpg')}
        style={styles.image}
        resizeMode="cover"
      />

      {/* <Text style={styles.title}>Malaria Information</Text> */}

      <View style={styles.infoContainer}>
        <Text style={styles.heading}>What is Malaria?</Text>
        <Text style={styles.description}>
          Malaria is a mosquito-borne infectious disease that affects humans and other animals. It is caused by
          parasitic protozoans (a type of microorganism) belonging to the Plasmodium group.
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.heading}>Symptoms</Text>
        <Text style={styles.description}>
          Common symptoms of malaria include fever, chills, sweats, headache, muscle pain, nausea, and fatigue. If
          left untreated, it can lead to severe complications and even death.
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.heading}>Prevention</Text>
        <Text style={styles.description}>
          Malaria can be prevented by taking antimalarial medications, using mosquito nets, wearing protective
          clothing, and using mosquito repellent.
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.heading}>Treatment</Text>
        <Text style={styles.description}>
          Malaria is treatable with medications prescribed by a healthcare professional. Early diagnosis and
          treatment are essential for a successful recovery.
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
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
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
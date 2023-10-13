import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from '../components/Themed';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
type State = { counter: number };
export default function HistoryScreen() {
  const [patientRecords, setPatientRecords] = useState([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Load patient records from AsyncStorage when the component mounts

    AsyncStorage.getItem('patientRecords')
      .then((records) => {
        if (records) {
          setPatientRecords(JSON.parse(records));
        }
      })
      .catch((error) => console.error('Error loading patient records: ', error));
  }, [key]);

  return (
    < ScrollView style={styles.container} >
      {/* <Text style={styles.header}>Patient Records</Text> */}
      <TouchableOpacity style={styles.learnMoreButton}
        onPress={() => setKey(currentKey => currentKey + 1)}>
        <Text style={styles.learnMoreButtonText}>Refresh List</Text>
      </TouchableOpacity>
      {
        patientRecords.map((record, index) => (
          <View key={index} style={styles.recordContainer}>
            <Image source={{ uri: record.image != null ? record.image.uri : '' }} style={[styles.recordImage]} />
            <View>
              <View style={styles.recordInfo}>
                <Text style={styles.label}>ID:</Text>
                <Text style={styles.value}>{record.id}</Text>
              </View>
              <View style={styles.recordInfo}>
                <Text style={styles.label}>Prediction:</Text>
                <Text style={styles.value}>{record.prediction}</Text>
              </View>
              <View style={styles.recordInfo}>
                <Text style={styles.label}>Confidence:</Text>
                <Text style={styles.value}>{record.probability}</Text>
              </View>
            </View>
          </View>
        ))
      }
    </ScrollView >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recordContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignContent: "center",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#777',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  recordInfo: {
    // flexDirection: 'column',
    // flex: 1,
    marginBottom: 10,
  },
  recordImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'right', // Add this line to align text to the left
  },
  value: {
    fontSize: 14,
    textAlign: 'right', // Add this line to align text to the left
  },

  learnMoreButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  learnMoreButtonText: {
    color: 'white',
    textAlign: 'center',
  },

});

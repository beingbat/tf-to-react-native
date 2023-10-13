import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, ScrollView } from '../components/Themed';
import drugsData from '../assets/drugs/drugs-info.json'; // Import the JSON data
import { Linking } from 'react-native';

export default function DrugScreen() {
  const openURL = (url) => {
    Linking.openURL(url)
      .then(() => {
        console.log(`Opened URL: ${url}`);
      })
      .catch((error) => {
        console.error(`Error opening URL: ${url}`, error);
      });
  };
  return (
    < ScrollView style={styles.container} >
      {
        drugsData.drugs.map((drug, index) => (
          <View style={styles.itemContainer} key={index}>
            <Text style={styles.name}>{drug.name}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.description}>{drug.description}</Text>
              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => openURL(drug.url)}
              >
                <Text style={styles.learnMoreButtonText}>Learn More</Text>
              </TouchableOpacity>
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
    // backgroundColor: '#fff',
  },
  itemContainer: {
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  description: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
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

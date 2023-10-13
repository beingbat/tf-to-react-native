import * as React from 'react';
import * as Permissions from 'expo-permissions';
import { useNavigation } from '@react-navigation/native';
import * as tf from '@tensorflow/tfjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';

import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { AppConfig } from "../config"

import { Text, View, ActivityIndicator, ScrollView } from '../components/Themed'

import { Icon } from 'react-native-elements';
import Toast from 'react-native-toast-message';

import * as ImagePicker from 'expo-image-picker';
import { ModelService, IModelPredictionResponse, IModelPredictionTiming, ModelPrediction } from '../components/ModelService';

interface PatientRecord {
  id: string;
  prediction: string | number;
  probability: string | number;
}

type State = {
  image: ImageManipulator.ImageResult;
  loading: boolean;
  isTfReady: boolean;
  isModelReady: boolean;
  predictions: ModelPrediction[] | null;
  error: string | null;
  timing: IModelPredictionTiming | null;
  patientID: string;
  predictionStatus: string;
  predictionProbability: string;
  patientRecords: PatientRecord[];
};
export default class HomeScreen extends React.Component<{}, State> {
  static navigationOptions = {
    header: null,
  };

  state: State = {
    image: {
      uri: '',
      width: 0,
      height: 0
    },
    loading: false,
    isTfReady: false,
    isModelReady: false,
    predictions: null,
    error: null,
    timing: null,
    patientID: "",
    predictionStatus: "",
    predictionProbability: '',
    patientRecords: [],
  }

  addPatientRecord = () => {
    if (this.state.patientID && this.state.predictionStatus) {
      const newRecord = {
        id: this.state.patientID,
        prediction: this.state.predictionStatus,
        probability: this.state.predictionProbability,
        image: this.state.image,
      };

      this.setState(
        (prevState) => ({
          patientRecords: [...prevState.patientRecords, newRecord],
          patientID: '',
          predictionStatus: '',
          predictionProbability: '',
        }),
        () => {
          // Save patient records to AsyncStorage
          AsyncStorage.setItem('patientRecords', JSON.stringify(this.state.patientRecords))
            .then(() => console.log('Patient record saved to AsyncStorage'))
            .catch((error) => console.error('Error saving patient record: ', error));
        },
      );

      // Currently not working
      Toast.show({
        type: 'success',
        position: "top",
        text1: 'Patient Record Added',
        visibilityTime: 30000,
      });

      this.setState({
        image: {
          uri: '',
          width: 0,
          height: 0
        },
        predictions: null,
        error: null,
        timing: null,
        patientID: "",
        predictionStatus: "",
        predictionProbability: '',
        // patientRecords: []
      });


    }
  };

  modelService!: ModelService;

  async componentDidMount() {
    this.setState({ loading: true });
    this.modelService = await ModelService.create(AppConfig.imageSize);
    this.setState({ isTfReady: true, isModelReady: true, loading: false });
    this.loadPatientRecords();
  };

  loadPatientRecords = async () => {
    try {
      const records = await AsyncStorage.getItem('patientRecords');
      if (records) {
        this.setState({ patientRecords: JSON.parse(records) });
      }
    } catch (error) {
      console.error('Error loading patient records: ', error);
    }
  };

  render() {

    const modelLoadingStatus = this.state.isModelReady ? "✅" : "❓";
    const image = this.state.image;

    return (
      <ScrollView style={styles.container}>
        {/* <View style={styles.container} > */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{AppConfig.title}</Text>
        </View>


        <View style={styles.titleContainer}>
          <Text style={styles.modelStatus}>Model Status: {modelLoadingStatus}</Text>
        </View>

        <View style={styles.actionsContainer}>
          <View style={styles.callToActionContainer}>
            <Icon name='camera-alt' raised onPress={this._pickImageFromCamera} />
            <Icon name='image' raised onPress={this._pickImageFromLibrary} />
          </View>
        </View>

        <View style={[styles.imageContainer, { paddingBottom: 30 }]}>
          <Text style={styles.heading}>{'Input'}</Text>
          <Image source={image} style={{ height: 200, width: 200 }} />
        </View>

        <View >
          {this.renderPredictions()}
        </View>
        {/* </View> */}
      </ScrollView>
    );
  }

  // refresh = () => {
  //   this.addPatientRecord();
  //   this.forceUpdate(); // Force a re-render
  // };

  renderPredictions() {

    if (this.state.loading) {
      return <ActivityIndicator />
    }
    let predictions = this.state.predictions || [];


    if (predictions.length > 0) {

      return (
        <View >
          <View style={styles.recordContainer}>
            {
              predictions.map((item, index) => (
                <View key={index}>
                  <View style={styles.recordInfo}>
                    <Text style={styles.label}>{'Prediction'}</Text>
                    <Text style={[
                      item.className == 'Uninfected' ? styles.green : styles.red, { fontStyle: "italic" }, styles.value]}>{item.className}</Text>
                  </View>
                  <View style={styles.recordInfo}>
                    <Text style={styles.label}>Confidence:</Text>
                    < Text style={[styles.modelStatus, styles.value]}>{`${item.probability.toFixed(AppConfig.precision)}`}</Text>
                  </View>
                </View>
              ))
            }
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.heading}>Create Record</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Patient ID"
              value={this.state.patientID}
              onChangeText={(text) => (this.setState({ patientID: text }), this.setState({ predictionStatus: predictions[0].className }), this.setState({ predictionProbability: predictions[0].probability.toFixed(AppConfig.precision) }))}
            />
            <TouchableOpacity
              style={styles.learnMoreButton}
              onPress={() => (this.addPatientRecord())}
            >
              <Text style={styles.learnMoreButtonText}>Create</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text>{'\n'}{'\n'}{'\n'}</Text>
          </View>
        </View >

      )
    } else {
      return null
    }
  }


  _verifyPermissions = async () => {
    console.log("Verifying Permissions");
    const { status, expires, permissions } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)

      if (status === 'granted') {
        console.log("Permissions granted");
        return true
      } else {
        alert('Hey! You have not enabled selected permissions');
        return false
      }

    } else {
      return true;
    }
  };

  _pickImageFromLibrary = async () => {
    const status = await this._verifyPermissions();

    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3]
      })

      if (!response.cancelled) {
        //const source = { uri: response.uri }

        //this.setState({ image: source })
        this._classifyImage(response.uri)
      }
    } catch (error) {
      console.log(error)
    }

  };

  _pickImageFromCamera = async () => {
    const status = await this._verifyPermissions();

    try {

      let response = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!response.cancelled) {
        //const source = { uri: response.uri }

        this._classifyImage(response.uri)
      }
    } catch (error) {
      console.log(error)
    }

  };

  _classifyImage = async (imageUri: string) => {
    try {
      const res: ImageManipulator.ImageResult = await ImageManipulator.manipulateAsync(imageUri,
        [{ resize: { width: AppConfig.imageSize, height: AppConfig.imageSize } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );

      this.setState({ image: res })
      console.log('numTensors (before prediction): ' + tf.memory().numTensors);
      this.setState({ predictions: [], error: null, loading: true })

      const predictionResponse = await this.modelService.classifyImage(res);


      if (predictionResponse.error) {
        this.setState({ error: predictionResponse.error, loading: false })
      } else {
        const predictions = predictionResponse.predictions || null;
        this.setState({ predictions: predictions, timing: predictionResponse.timing, loading: false })
      }

      //tf.dispose(predictions);
      console.log('numTensors (after prediction): ' + tf.memory().numTensors);

    } catch (error) {
      console.log('Exception Error: ', error)
    }
  }

}

const styles = StyleSheet.create({
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
    minWidth: "auto",
    maxWidth: "auto"
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
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: '#fff',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modelStatus: {
    fontSize: 16,
  },
  actionsContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 0,
  },
  callToActionContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-around',
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  image: {
    height: 200,
    width: 200,
  },
  learnMoreButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  predictionsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  predictionsContentContainer: {
    alignItems: 'center',
  },
  predictionContainer: {
    marginBottom: 10,
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  predictionText: {
    fontSize: 16,
  },
  green: {
    color: '#00ff00',
    fontWeight: 'bold',
  },
  red: {
    color: '#ff0000',
    fontWeight: 'bold',
  },
  createRecordContainer: {
    marginBottom: 10,
  },
  createRecordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingBottom: 10,
    color: '#777777',
  },
  learnMoreButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  recordsContainer: {
    paddingBottom: 10,
    justifyContent: 'center',
  },
  recordsTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  recordText: {
    fontSize: 16,
  },
  recordContainer: {
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
  recordInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: '#333',
  },
  value: {
    fontSize: 16,
    // color: '#555',
  },
});

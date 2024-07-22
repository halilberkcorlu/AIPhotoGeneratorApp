import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { REPLICATE_API_TOKEN } from '../helpers/Config';


const PhotoUploadScreen = ({ route }) => {
  const navigation = useNavigation();
  const { category } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select an image first');
      return;
    }

    setUploading(true);
    try {
      const response = await axios.post(`https://api.replicate.com/v1/predictions`, {
        version: REPLICATE_MODEL_VERSION,
        input: {
          image: selectedImage,
          category: category
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${}`
        }
      });

      const predictionId = response.data.id;
      let resultUrl = null;

      while (!resultUrl) {
        const resultResponse = await axios.get(`https://api.replicate.com/v1/predictions/${predictionId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${REPLICATE_API_TOKEN}`
          }
        });

        if (resultResponse.data.status === 'succeeded') {
          resultUrl = resultResponse.data.output;
        } else if (resultResponse.data.status === 'failed') {
          throw new Error('Prediction failed');
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      navigation.navigate('OutputScreen', { imageUrl: resultUrl });

    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <>
            <MaterialIcons name="cloud-upload" size={50} color="gray" />
            <Text style={styles.uploadText}>Upload a Photo</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.createButton, !selectedImage && styles.createButtonDisabled]}
        onPress={uploadImage}
        disabled={!selectedImage}
      >
        <Text style={styles.createText}>Create</Text>
      </TouchableOpacity>

      {uploading && <Text style={styles.uploadingText}>Uploading...</Text>}
    </View>
  );
};

export default PhotoUploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  uploadButton: {
    width: 300,
    height: 300,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadText: {
    color: 'gray',
    fontSize: 18,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  createButton: {
    width: 300,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  createText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  uploadingText: {
    marginTop: 20,
    fontSize: 16,
  },
});

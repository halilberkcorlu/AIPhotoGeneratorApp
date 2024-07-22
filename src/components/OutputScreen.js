import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Alert,TouchableOpacity } from 'react-native';
import axios from 'axios';
import AllStyles from '../helpers/AllStyles';
import { REPLICATE_API_TOKEN } from '../helpers/Config';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const OutputScreen = ({ route }) => {
  const { getUrls } = route.params;
  const [loading, setLoading] = useState(false);
  const [outputImageUrl, setOutputImageUrl] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Please wait...');

  useEffect(() => {
    const fetchOutputImage = async () => {
      try {
        const response = await axios.get(getUrls.get, {
          headers: {
            'Authorization': `Token ${REPLICATE_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        console.log("GET Response:", response.data);

        if (response.data.status === "succeeded" && response.data.output && response.data.output.length > 0) {
          const initialUrl = response.data.output[0];
          console.log("Image URL:", initialUrl);
          setOutputImageUrl(initialUrl);
          setLoading(false);
        } else if (response.data.status === "failed" || response.data.status === "cancelled") {
          Alert.alert('API Error', 'API process failed or was cancelled.');
          setLoading(false);
        } else if (response.data.status === "starting" || response.data.status === "processing") {
          setLoading(true);
        } else {
          console.log('Unexpected response from API:', response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching output image:', error);
        Alert.alert('Error', `An error occurred while fetching the output image: ${error.message}`);
        setLoading(false);
      }
    };

    let intervalId;
    if (getUrls && getUrls.get) {
      setLoading(true);
      fetchOutputImage(); // Initial call to start the process
      intervalId = setInterval(fetchOutputImage, 10000); // Check every 10 seconds
    }

    const messageTimeouts = [
      setTimeout(() => setLoadingMessage('Loading...'), 20000),
      setTimeout(() => setLoadingMessage('Almost there...'), 40000),
      setTimeout(() => setLoadingMessage('Still loading, please wait...'), 60000)
    ];

    return () => {
      clearInterval(intervalId);
      messageTimeouts.forEach(clearTimeout);
    };
  }, [getUrls]);

  const savePhotoToGallery = async () => {
    if (!outputImageUrl) {
      Alert.alert('Error', 'No image available to save.');
      return;
    }

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need permission to save photos to your gallery.');
        return;
      }

      // Download the image to a temporary location
      const fileUri = FileSystem.cacheDirectory + 'temp_image.jpg';
      const downloadResumable = FileSystem.createDownloadResumable(
        outputImageUrl,
        fileUri
      );

      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished downloading to ', uri);

      // Save the image to media library
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);

      Alert.alert('Success', 'Photo saved to gallery!');
    } catch (error) {
      console.error('Error saving photo to gallery:', error);
      Alert.alert('Error', `Failed to save photo: ${error.message}`);
    }
  };

  return (
    <View style={AllStyles.outputContainer}>
      <Text style={AllStyles.outputLabel}>Output</Text>
      {loading ? (
        <>
          <ActivityIndicator style={AllStyles.outputImage} size="large" color="#0000ff" />
          <Text>{loadingMessage}</Text>
        </>
      ) : (
        outputImageUrl ? (
          <>
            <Image
              source={{ uri: outputImageUrl }}
              style={AllStyles.outputImage}
              resizeMode="contain"
            />
             <TouchableOpacity style={AllStyles.saveButton} onPress={savePhotoToGallery}>
              <Text style={AllStyles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text>No image to display</Text>
        )
      )}
    </View>
  );
};

export default OutputScreen;

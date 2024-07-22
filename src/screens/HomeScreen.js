import React, { useRef, useState,useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import Carousel, { ParallaxImage } from '../../externalLibraries/react-native-snap-carousel/src/';
import { categories, ENTRIES1 } from "../helpers/Constants";
import AllStyles, { SCREEN_WIDTH } from '../helpers/AllStyles';
import axios from 'axios';
import BodyList from '../helpers/BodyList.json';
import OutputScreen from '../components/OutputScreen';
import { REPLICATE_API_TOKEN } from '../helpers/Config';

const HomeScreen = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [promptValue, setPromptValue] = useState('');
  const [createButtonPressed, setCreateButtonPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getUrls, setGetUrls] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({ item }, parallaxProps) => (
    <View style={AllStyles.item}>
      <ParallaxImage
        source={{ uri: item.illustration }}
        containerStyle={AllStyles.imageContainer}
        style={AllStyles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
      <Text style={AllStyles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={AllStyles.subtitle} numberOfLines={2}>{item.subtitle}</Text>
    </View>
  );

  const renderCategoryItem = ({ item }) => {
    const isSelected = item.id === selectedCategory;
    return (
      <TouchableOpacity
        style={[AllStyles.categoryItem, isSelected && AllStyles.selectedCategoryItem]}
        onPress={() => setSelectedCategory(isSelected ? null : item.id)}
        activeOpacity={1}
      >
        <View>
          <Image source={{ uri: item.image }} style={AllStyles.categoryImage} />
          <Text style={[AllStyles.categoryTitle, isSelected && AllStyles.selectedCategoryTitle]}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleCreatePress = async () => {
    setCreateButtonPressed(true);
    setLoading(true);

    const prompt = promptValue;
    const selectedCategoryTitle = categories.find(cat => cat.id === selectedCategory)?.title;

    if (prompt && selectedCategoryTitle) {
      const fullPrompt = `${prompt}, ${selectedCategoryTitle}`;
      console.log(fullPrompt);

      try {
        const response = await axios.post('https://api.replicate.com/v1/predictions', {
          version: BodyList.text2img.version,
          input: {
            ...BodyList.text2img.input,
            prompt: fullPrompt
          }
        }, {
          headers: {
            'Authorization': `Token ${REPLICATE_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        console.log("API Response:", response.data);

        if (response.data.status === "starting" && !response.data.error) {
          setGetUrls(response.data.urls);
          navigation.navigate('OutputScreen', { getUrls: response.data.urls });
        } else if (response.data.error) {
          Alert.alert('API Error', response.data.error);
        } else {
          Alert.alert('Unexpected Response', `Unexpected response from API: ${JSON.stringify(response.data)}`);
        }
      } catch (error) {
        console.error('Error making API request:', error);
        Alert.alert('Error', `An error occurred while making the API request: ${error.message}`);
      } finally {
        setCreateButtonPressed(false);
        setLoading(false);
      }
    } else {
      Alert.alert('Error', 'Please enter a prompt and select a category');
      setCreateButtonPressed(false);
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={AllStyles.homeContainer} showsVerticalScrollIndicator={false}>
      <Image source={require('../images/logo.png')} style={AllStyles.logo} />
      <Carousel
        ref={carouselRef}
        sliderWidth={SCREEN_WIDTH}
        sliderHeight={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
      <Text style={AllStyles.promptLabel}>Prompt</Text>
      <TextInput
        style={AllStyles.promptInput}
        placeholder="What do you want to see?"
        onChangeText={text => setPromptValue(text)}
        value={promptValue}
      />
      <Text style={AllStyles.header}>Category</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={AllStyles.flatList}
        extraData={selectedCategory}
      />
      <Pressable
        style={[
          AllStyles.createButton,
          createButtonPressed && AllStyles.createButtonPressed,
        ]}
        onPress={handleCreatePress}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={AllStyles.createButtonText}>Create</Text>
        )}
      </Pressable>
    </ScrollView>
  );
};

export default HomeScreen;

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { MODEL_TYPES } from '../helpers/Constants';

const categories = [
  { id: '1', title: 'Image Colorization', image: 'https://i.imgur.com/UYiroysl.jpg', type:MODEL_TYPES.text2img },
  { id: '2', title: 'Remove Background', image: 'https://i.imgur.com/UPrs1EWl.jpg' },
  { id: '3', title: 'Restore Image', image: 'https://i.imgur.com/MABUbpDl.jpg' },
  // Diğer kategoriler
];

const CategoryItem = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.categoryItem}
    onPress={() => navigation.navigate('PhotoUploadScreen', { category: item.title })}
  >
    <Image source={{ uri: item.image }} style={styles.categoryImage} />
    <Text style={styles.categoryTitle}>{item.title}</Text>
  </TouchableOpacity>
);

const ModelScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryItem item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
      />
    </ScrollView>
  );
};

export default ModelScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9FAFC',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20
  },
  flatList: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
    borderWidth: 0.3,
  },
  categoryImage: {
    width: 350,
    height: 200,
    borderRadius: 10,
    marginBottom: 1
  },
  categoryTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

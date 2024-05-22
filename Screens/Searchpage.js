import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Searchpage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Kadın');
  const categories = ['Kadın', 'Erkek', 'Çocuk'];
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const renderCategory = (category) => (
    <TouchableOpacity
      key={category}
      style={[styles.category, selectedCategory === category && styles.selectedCategory]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  const descriptions = [
    ["BAĞCIKLI TULUM", "1.590,00 TL"],
    ["BAĞCIKLI STRAPLEZ TULUM", "2.090,00 TL"],
  ];

  const handleImagePress = () => {
    navigation.navigate('Product');
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.navigation}>
          {categories.map(renderCategory)}
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Ara"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.greetingText, { fontSize: 12, textAlign: 'right', paddingRight: 30  }]}>İLGİNİZİ ÇEKEBİLECEK DİĞER ÜRÜNLER</Text>
        <View style={styles.productContainer}>
          <View style={styles.productRow}>
            <TouchableOpacity onPress={handleImagePress}>
              <Image
                source={{ uri: 'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128' }}
                style={styles.productImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleImagePress}>
              <Image
                source={{ uri: 'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993' }}
                style={styles.productImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.productRow}>
            <View style={styles.productDescription}>
              {descriptions[0].map((desc, index) => (
                <Text key={index} style={styles.descriptionText}>{desc}</Text>
              ))}
            </View>
            <View style={styles.productDescription}>
              {descriptions[1].map((desc, index) => (
                <Text key={index} style={styles.descriptionText}>{desc}</Text>
              ))}
            </View>
          </View>
          
          {/* Replicate the photos and descriptions */}
          <View style={styles.productRow}>
            <TouchableOpacity onPress={handleImagePress}>
              <Image
                source={{ uri: 'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128' }}
                style={styles.productImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleImagePress}>
              <Image
                source={{ uri: 'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993' }}
                style={styles.productImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.productRow}>
            <View style={styles.productDescription}>
              {descriptions[0].map((desc, index) => (
                <Text key={index} style={styles.descriptionText}>{desc}</Text>
              ))}
            </View>
            <View style={styles.productDescription}>
              {descriptions[1].map((desc, index) => (
                <Text key={index} style={styles.descriptionText}>{desc}</Text>
              ))}
            </View>
          </View>
          
          {/* End of replication */}
        </View>
        {/* Diğer içerikler buraya eklenebilir */}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedHeader: {
    backgroundColor: '#fff',
    zIndex: 1,
    elevation: 2, // for Android shadow
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  category: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedCategory: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  categoryText: {
    color: '#000',
    textAlign: 'left',
  },
  selectedCategoryText: {
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: -40,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Add padding for bottom space
  },
  greetingText: {
    fontSize: 12,
    marginVertical: 20,
    marginHorizontal:-20,
    marginTop: 50,
  },
  productContainer: {
    paddingHorizontal: 20,
    marginTop: 0,
  },
  productRow: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft:0,
    marginRight:-50,
  },
  productImage: {
    width: 182,
    height: 300,
    marginRight: 35,
    marginLeft:-15,
    borderWidth: 1,
    borderColor: 'black', // Siyah çerçeve
    marginHorizontal: 10,
    marginTop: -10,
  },
  productDescription: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 0,
    padding: 20,
    marginRight: 35,
    marginLeft:-15,
    marginTop: -10,
    borderColor: 'black',
  },
  descriptionText: {
    textAlign: 'left',
    marginRight: -10 ,
    marginLeft: -10,
    marginBottom: 10,
    marginTop: -10,
    fontSize: 15,
  },
});

export default Searchpage;

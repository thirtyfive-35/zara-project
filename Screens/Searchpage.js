import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Searchpage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Kadın');
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const categories = ['Kadın', 'Erkek', 'Çocuk'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://192.168.1.28:3000/api/products/${selectedCategory}`);
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

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

  const handleImagePress = (urunId) => {
    console.log("Navigating to Product with urunId:", urunId); 
    navigation.navigate('Product', { urunId });
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
          {products.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <TouchableOpacity onPress={() => handleImagePress(product.urunId)}>
                <Image
                  source={{ uri: product.urunUrl }}
                  style={styles.productImage}
                />
              </TouchableOpacity>
              <View style={styles.productDescription}>
                <Text style={styles.descriptionText}>{product.urunAd}</Text>
                <Text style={styles.descriptionText}>{product.urunFiyat}</Text>
              </View>
            </View>
          ))}
        </View>
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
    elevation: 2,
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
    paddingBottom: 20,
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
  productItem: {
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderWidth: 1,
    borderColor: 'black',
  },
  productDescription: {
    padding: 20,
  },
  descriptionText: {
    textAlign: 'left',
    fontSize: 15,
    marginBottom: 10,
  },
});

export default Searchpage;
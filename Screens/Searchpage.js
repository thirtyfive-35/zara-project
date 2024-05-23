import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SearchInput, { createFilter } from 'react-native-search-filter';

const KEYS_TO_FILTERS = ['urunAd'];

const Searchpage = () => {
  const [selectedCinsiyet, setSelectedCinsiyet] = useState('Kadın');
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  const cinsiyetler = ['Kadın', 'Erkek', 'Çocuk'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://192.168.1.28:3000/api/products/${selectedCinsiyet}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, [selectedCinsiyet]);

  const filteredProducts = products.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

  const renderCinsiyet = (cinsiyet) => (
    <TouchableOpacity
      key={cinsiyet}
      style={[styles.cinsiyet, selectedCinsiyet === cinsiyet && styles.selectedCinsiyet]}
      onPress={() => setSelectedCinsiyet(cinsiyet)}
    >
      <Text style={[styles.cinsiyetText, selectedCinsiyet === cinsiyet && styles.selectedCinsiyetText]}>
        {cinsiyet}
      </Text>
    </TouchableOpacity>
  );

  const handleImagePress = (urunId) => {
    navigation.navigate('Product', { urunId });
};

  const handleClearSearch = () => {
    setSearchTerm('');
    console.log("Search term cleared:", searchTerm); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.navigation}>
          {cinsiyetler.map(renderCinsiyet)}
        </View>
        <View style={styles.searchContainer}>
          <SearchInput
            onChangeText={(term) => setSearchTerm(term)}
            style={styles.searchInput}
            placeholder="Ara"
            placeholderTextColor="#000"
            textColor="#000"
          />
          {searchTerm !== '' && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
              <Ionicons name="close-circle" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.greetingText, { fontSize: 12, textAlign: 'right', paddingRight: 30 }]}>İLGİNİZİ ÇEKEBİLECEK DİĞER ÜRÜNLER</Text>
        <View style={styles.productContainer}>
          {filteredProducts.map((product, index) => (
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
  cinsiyet: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedCinsiyet: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  cinsiyetText: {
    color: '#000',
    textAlign: 'left',
  },
  selectedCinsiyetText: {
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: -40,
    width: '100%', 
  },
  searchInput: {
    width: 320,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,

  },
  clearButton: {
    marginLeft: 10,
    marginBottom:-10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  greetingText: {
    fontSize: 12,
    marginVertical: 20,
    marginHorizontal: -20,
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

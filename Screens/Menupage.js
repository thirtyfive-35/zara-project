import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavigationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Kadın');
  const [contentVisible, setContentVisible] = useState(true);
  const [categoryContent, setCategoryContent] = useState([]);
  const navigation = useNavigation();

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    // Kategoriye göre ilgili içeriği gösterme/kapama
    setContentVisible(true);
    // Kategorilere göre içerikleri ayarlama
    if (category === 'Kadın') {
      setCategoryContent([
        'BLAZER',
        'ELBİSE',
        'ETEK',
        'T-SHIRT',
        'JEAN',
        'PANTOLON',
        'AYAKKABI',
        'ÇANTA',
        'TRİKO',
        'YELEK'
      ]);
    } else if (category === 'Erkek') {
      setCategoryContent([
        'KETEN',
        'GÖMLEK',
        'T-SHIRT',
        'PANTOLON',
        'JEAN',
        'SWEATSHIRT',
        'TRİKO',
        'BLAZER',
        'AYAKKABI',
        'AKSESUAR'
      ]);
    } else if (category === 'Çocuk') {
      setCategoryContent([
        'KETEN',
        'T-SHIRT',
        'SWEATSHIRT',
        'GÖMLEK',
        'PANTOLON',
        'TRİKO',
        'EŞOFMAN',
        'BASIC',
        'AYAKKABI',
        'AKSESUAR'
      ]);
    }
  };

  const handleOtherContentPress = (content) => {
    // İlgili içerik tıklandığında Menuback.js sayfasına yönlendirme yap
    navigation.navigate('Menuback');
  };

  // Component yüklendiğinde çalışacak kodlar
  useEffect(() => {
    // İlk olarak sayfa yüklendiğinde "Kadın" kategorisinin içeriğini göster
    handleCategoryPress('Kadın');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.category, selectedCategory === 'Kadın' && styles.selectedCategory]}
          onPress={() => handleCategoryPress('Kadın')}
        >
          <Text style={[styles.categoryText, selectedCategory === 'Kadın' && styles.selectedCategoryText]}>Kadın</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.category, selectedCategory === 'Erkek' && styles.selectedCategory]}
          onPress={() => handleCategoryPress('Erkek')}
        >
          <Text style={[styles.categoryText, selectedCategory === 'Erkek' && styles.selectedCategoryText]}>Erkek</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.category, selectedCategory === 'Çocuk' && styles.selectedCategory]}
          onPress={() => handleCategoryPress('Çocuk')}
        >
          <Text style={[styles.categoryText, selectedCategory === 'Çocuk' && styles.selectedCategoryText]}>Çocuk</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.otherContent}>
        {contentVisible && (
          <>
            {categoryContent.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleOtherContentPress(item)}>
                <Text style={styles.otherContentText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50, // Navigasyon çubuğu için boşluk
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  category: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCategory: {
    fontWeight: 'bold',
  },
  selectedCategoryText: {
    fontWeight: 'bold', // Seçilen kategori rengi
  },
  otherContent: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  otherContentText: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 30,
    marginLeft:20,
    color: '#555',
  },
});

export default NavigationPage;

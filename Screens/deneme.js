import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Menuback = ({ route }) => {
    const { category, content } = route.params;
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const category = 'kadin'; // Manuel olarak kategori değeri atanıyor
        const content = 'ELBİSE'; // Manuel olarak içerik değeri atanıyor

        // category ve content değerlerinin tanımlı olduğunu kontrol et
        if (category && content) {
            // API isteği göndermek için fetch kullanımı
            fetch(`http://192.168.1.28:3000/menu/urunler?cinsiyet=${category.toLowerCase()}&kategori=${content.toUpperCase()}`)
                .then(response => response.json())
                .then(data => {
                    setProducts(data); // API'den gelen verileri state'e kaydet
                    console.log(data); // API'den gelen verileri konsola yazdır
                })
                .catch(error => {
                    console.error('API isteği sırasında hata oluştu:', error);
                });
        }
    }, []); // Boş bağımlılık dizisi, sadece bir kez çalışması için

    const handleClosePress = () => {
        navigation.goBack();
    };

    const handleImagePress = () => {
        navigation.navigate('Product');
    };

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleClosePress}>
                    <Ionicons name="close" size={28} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    {products.map((product, index) => (
                        <TouchableOpacity key={index} onPress={handleImagePress}>
                            <Image
                                source={{ uri: product.urunUrl }}
                                style={styles.image}
                            />
                        </TouchableOpacity>
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
    image: {
        flex: 1,
        aspectRatio: 1,
        margin: 5,
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    }
});

export default Menuback;

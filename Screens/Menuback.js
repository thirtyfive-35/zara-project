import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // geri simgesi için
import { useNavigation } from '@react-navigation/native';  // Navigasyon için

const Menuback = ({ route }) => {
    const { category, content } = route.params;
    const [products, setProducts] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        // category ve content değerlerinin tanımlı olduğunu kontrol et
        if (category && content) {
            // API isteği göndermek için fetch kullanımı
            fetch(`http://192.168.1.16:3000/menu/urunler?cinsiyet=${category.toLowerCase()}&kategori=${content.toUpperCase()}`)
                .then(response => response.json())
                .then(data => {
                    setProducts(data); // API'den gelen verileri state'e kaydet
                    console.log(data); // API'den gelen verileri konsola yazdır
                    console.log(route.params)
                })
                .catch(error => {
                    console.error('API isteği sırasında hata oluştu:', error);
                });
        }
    }, [category, content]); // category ve content bilgileri değiştiğinde yeniden çalışır

    const handleClosePress = () => {
        navigation.goBack();
    };

    const handleImagePress = (urunId) => {
        navigation.navigate('Product', { urunId });
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
                        <TouchableOpacity key={index} onPress={() => handleImagePress(product.urunId)}>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 500,
        height: 600,


    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    }
});

export default Menuback;

import React, { useState, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity, StatusBar, Dimensions, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Çarpı simgesi için
import { useNavigation, useRoute } from '@react-navigation/native'; // Navigasyon ve route için
import { useAuth } from './AuthContext'; 


const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;

const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const Product = () => {
    const [productDetails, setProductDetails] = useState(null);
    const [productImages, setProductImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const route = useRoute();
    const { urunId } = route.params; // Navigasyondan gelen urunId'yi al
    const { token } = useAuth();

    const addToCart = async () => {
        console.log(token);
        try {
            const response = await fetch('http://192.168.1.28:3000/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Token'ı Authorization başlığına ekle
                },
                body: JSON.stringify({ urunId: urunId }) // Ürün ID'sini gönder
            });
            const data = await response.json();
            console.log(data); // API'den dönen yanıtı konsola yazdır
            console.log(urunId)
            alert('Ürün sepete eklendi');
            // Burada isteğin başarılı olduğuna dair bir işlem yapabilirsiniz
        } catch (error) {
            console.error('Error:', error);
            // Hata durumunda kullanıcıya bilgi verebilirsiniz
            alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
    };
    

    useEffect(() => {
        
        // API isteği yaparak ürün detaylarını al
        if (urunId) {
            fetch(`http://192.168.1.28:3000/menu/urun/detay?urunId=${urunId}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0) {
                        setProductDetails({
                            urunAd: data[0].urunAd,
                            urunFiyat: data[0].urunFiyat,
                        });
                        setProductImages(data.map(item => item.urunUrl));
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('API isteği sırasında hata oluştu:', error);
                    setLoading(false);
                });
        }
    }, [urunId]);

    const handleClosePress = () => {
        navigation.goBack();
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!productDetails) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Ürün bulunamadı</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View style={styles.header}>
                <TouchableOpacity onPress={handleClosePress} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Animated.FlatList
                    data={productImages}
                    keyExtractor={(_, index) => index.toString()}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    bounces={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                />
                <View style={styles.pagination}>
                    {productImages.map((_, index) => {
                        return (
                            <View
                                key={index}
                                style={styles.dot}
                            />
                        );
                    })}
                    <Animated.View
                        style={[styles.dotIndicator, {
                            transform: [{
                                translateY: Animated.divide(scrollY, ITEM_HEIGHT).interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, DOT_INDICATOR_SIZE]
                                })
                            }]
                        }]}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>{productDetails.urunAd}</Text>
                <Text style={styles.footerText}>{productDetails.urunFiyat} TL</Text>
                <TouchableOpacity style={styles.button} onPress={addToCart}>
                    <Text style={styles.buttonText}>Ekle</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    closeButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    imageContainer: {
        flex: 1,
        marginBottom: 100,
        marginTop: 50, // Header için alan bırakmak amacıyla eklendi
    },
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        resizeMode: 'cover',
    },
    pagination: {
        position: 'absolute',
        top: ITEM_HEIGHT / 2,
        left: 20,
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE,
        backgroundColor: '#333',
        marginBottom: DOT_SPACING,
    },
    dotIndicator: {
        width: DOT_INDICATOR_SIZE,
        height: DOT_INDICATOR_SIZE,
        borderRadius: DOT_INDICATOR_SIZE,
        borderWidth: 1,
        borderColor: '#333',
        position: 'absolute',
        top: -DOT_SIZE / 2,
        left: -DOT_SIZE / 2,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 150, // Ekranın alt kısmını üçe bölmek için yeterli yükseklik ayarlayın
        justifyContent: 'space-evenly',
        alignItems: 'flex-start', // Yazıları sola dayalı yapmak için
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    footerText: {
        fontSize: 14, // Yazı puntosunu küçültmek için değeri değiştirdik
        color: '#333',
    },
    button: {
        backgroundColor: '#fff', // Butonun arka planını beyaz yapmak için
        paddingVertical: 5,
        paddingHorizontal: 120,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#333',
    },
    buttonText: {
        fontSize: 16,
        color: '#333', // Butonun içindeki yazıyı siyah yapmak için
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});

export default Product;

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from './AuthContext';

const SepetEkrani= ({ route }) => {
    const [sepet, setSepet] = useState([]);
    const { token } = useAuth();
    const [purchased, setPurchased] = useState(false); // satın alma durumu
    const [reload, setReload] = useState(false); // reload state'i ekle

    useEffect(() => {
        if (route.params?.reload) {
            fetchSepet();
        }
    }, [route.params?.reload]);

    useEffect(() => {
        fetchSepet();
    }, [token, purchased, reload]); // reload state'ini useEffect bağımlılıklarına ekle

    const fetchSepet = async () => {
        try {
            const response = await axios.get('http://192.168.1.16:3000/sepet', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Gelen veriyi doğrudan ayarla
            const data = response.data.map(item => {
                console.log('Fetched item:', item); // Gelen veriyi logla
                return {
                    ...item,
                    miktar: item.miktar || 1 // Sunucudan gelen miktar değeri geçerli değilse 1 yap
                };
            });
            setSepet(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRefreshSepet = () => {
        fetchSepet(); // Butona basıldığında sepeti yenile
        setReload(!reload); // reload state'ini tersine çevirerek yenilemeyi tetikle
    };

    const handleUpdateQuantity = async (urunId, newQuantity) => {
        try {
            console.log(`Updating urunId: ${urunId}, newQuantity: ${newQuantity}`); // Güncellenen miktarı logla
            const response = await fetch('http://192.168.1.16:3000/sepet/updateQuantity', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    urunId: urunId,
                    miktar: newQuantity
                })
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
            setSepet(prevSepet => {
                return prevSepet.map(item => {
                    if (item.urunId === urunId) {
                        return { ...item, miktar: newQuantity };
                    }
                    return item;
                });
            });
            console.log(responseData); // Başarılı yanıtı konsola yazdır
            setReload(!reload); // reload state'ini tersine çevirerek yenilemeyi tetikle
            setPurchased(false); // handleUpdateQuantity tamamlandığında satın alındı durumunu false yap
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    const handleIncreaseQuantity = (urunId, miktar) => {
        if (!isNaN(miktar)) { // Miktarın geçerli bir sayı olduğundan emin ol
            const newQuantity = miktar + 1; // Miktarı arttır
            handleUpdateQuantity(urunId, newQuantity);
        } else {
            console.error('Invalid miktar:', miktar); // Geçersiz miktar değerini logla
        }
    };
    
    const handleDecreaseQuantity = (urunId, miktar) => {
        if (!isNaN(miktar)) { // Miktarın geçerli bir sayı olduğundan emin ol
            const newQuantity = miktar > 0 ? miktar - 1 : 0; // Miktarı azalt
            handleUpdateQuantity(urunId, newQuantity);
        } else {
            console.error('Invalid miktar:', miktar); // Geçersiz miktar değerini logla
        }
    };

    const handlePurchase = async () => {
        try {
            const response = await fetch('http://192.168.1.16:3000/sepet/purchase', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
            console.log(responseData); // Log the successful response
            setSepet([]); // Clear the cart
            setPurchased(true); // Update the purchase state
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };
    

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.urunUrl }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title}>{item.urunAd}</Text>
                <Text style={styles.price}>{item.urunFiyat} TL</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => handleDecreaseQuantity(item.urunId, item.miktar)} style={styles.button}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.miktar}</Text>
                    <TouchableOpacity onPress={() => handleIncreaseQuantity(item.urunId, item.miktar)} style={styles.button}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const toplamFiyat = sepet.reduce((acc, item) => acc + (item.urunFiyat * item.miktar), 0);

    return (
        <View style={styles.container}>
            <FlatList
                data={sepet}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity onPress={handleRefreshSepet} style={styles.refreshButton}>
                <Text style={styles.refreshButtonText}>Sepeti Yenile</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={styles.totalPrice}>Toplam: {toplamFiyat} TL</Text>
                <TouchableOpacity onPress={handlePurchase} style={styles.purchaseButton}>
                    <Text style={styles.purchaseButtonText}>Satın Al</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        position:'relative',
    },
    listContainer: {
        padding: 10,
        flexGrow:1,
    },
    item: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 2,
        borderWidth:1,
        borderColor:'#000',
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    details: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    quantity: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    footer: {
        position:'absolute',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:750,
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    purchaseButton: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 6,
        marginLeft:150,

    },
    purchaseButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    purchaseMessage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    purchaseMessageText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default SepetEkrani;

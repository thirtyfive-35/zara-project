import React from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // geri simgesi için
import { useNavigation } from '@react-navigation/native';  // Navigasyon için


const ImageScreen = () => {
    const images = [
        'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128',
        'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993',
        'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015',
        'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369',
        'https://static.zara.net/assets/public/dd96/6158/760141f793cc/d529bc5e9e64/01063406832-p/01063406832-p.jpg?ts=1708510193846&w=503',
    ];

    const navigation = useNavigation();

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

                    <TouchableOpacity onPress={handleImagePress}>
                        <Image
                            source={{ uri: images[0] }}
                            style={styles.image}
                        />
                    </TouchableOpacity>

                    {/* İkinci satır */}
                    <View style={styles.row}>
                        <Image source={{ uri: images[1] }} style={styles.image} /><TouchableOpacity/>
                        <Image source={{ uri: images[2] }} style={styles.image} />
                    </View>

                    {/* Üçüncü satır */}
                    <View style={styles.row}>
                        <Image source={{ uri: images[3] }} style={styles.image} />
                        <Image source={{ uri: images[4] }} style={styles.image} />
                    </View>

                    {/* İlk satır */}
                    <View style={styles.row}>
                        <Image source={{ uri: images[0] }} style={styles.image} />
                    </View>

                    {/* İkinci satır */}
                    <View style={styles.row}>
                        <Image source={{ uri: images[1] }} style={styles.image} />
                        <Image source={{ uri: images[2] }} style={styles.image} />
                    </View>

                    {/* Üçüncü satır */}
                    <View style={styles.row}>
                        <Image source={{ uri: images[3] }} style={styles.image} />
                        <Image source={{ uri: images[4] }} style={styles.image} />
                    </View>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        flex: 1,
        aspectRatio: 1, // Kare olarak görüntüleme
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    }

});

export default ImageScreen;

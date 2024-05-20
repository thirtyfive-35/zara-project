import * as React from 'react';
import { Image, View, Text, TouchableOpacity, StatusBar, Dimensions, StyleSheet, Animated } from 'react-native';

const { width, height } = Dimensions.get('screen');

const images = [
    'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128',
    'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993',
    'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015',
    'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369',
    'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445',
];

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;

const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

export default () => {
    const scrollY = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View style={styles.imageContainer}>
                <Animated.FlatList
                    data={images}
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
                    {images.map((_, index) => {
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
                <Text style={styles.footerText}>VOLANLI FİYONKLU SATEN MİNİ ELBİSE</Text>
                <Text style={styles.footerText}>2.290,0</Text>
                <TouchableOpacity style={styles.button} onPress={() => alert('Button Pressed!')}>
                    <Text style={styles.buttonText}> Ekle </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    imageContainer: {
        flex: 1,
        marginBottom: 100,
    },
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        resizeMode: 'cover',
    },
    pagination: {
        position: 'absolute',
        top: ITEM_HEIGHT / 2,
        left: 20
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE,
        backgroundColor: '#333',
        marginBottom: DOT_SPACING
    },
    dotIndicator: {
        width: DOT_INDICATOR_SIZE,
        height: DOT_INDICATOR_SIZE,
        borderRadius: DOT_INDICATOR_SIZE,
        borderWidth: 1,
        borderColor: '#333',
        position: 'absolute',
        top: -DOT_SIZE / 2,
        left: -DOT_SIZE / 2
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
    }
});

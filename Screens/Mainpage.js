import React from 'react';
import { Image, FlatList, View, StatusBar, Dimensions, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Searchpage from './Searchpage';
import Menupage from './Menupage';
import SepetEkrani from './SepetEkrani';

const { width, height } = Dimensions.get('screen');

const images = [
    'https://static.zara.net/assets/public/dd96/6158/760141f793cc/d529bc5e9e64/01063406832-p/01063406832-p.jpg?ts=1708510193846&amp;w=503',
    'https://static.zara.net/assets/public/dd96/6158/760141f793cc/d529bc5e9e64/01063406832-p/01063406832-p.jpg?ts=1708510193846&amp;w=503',
    'https://static.zara.net/assets/public/dd96/6158/760141f793cc/d529bc5e9e64/01063406832-p/01063406832-p.jpg?ts=1708510193846&amp;w=503',
    'https://static.zara.net/assets/public/dd96/6158/760141f793cc/d529bc5e9e64/01063406832-p/01063406832-p.jpg?ts=1708510193846&amp;w=503',
    'https://static.zara.net/assets/public/dd96/6158/760141f793cc/d529bc5e9e64/01063406832-p/01063406832-p.jpg?ts=1708510193846&amp;w=503',
];

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;
const LOGO_HEIGHT = 400; // Logo yüksekliği

const HomeScreen = () => (
    <View style={styles.container}>
        <StatusBar hidden />
        <Image
            source={require('../assets/images/logo/logos.png')}
            style={[styles.logo, { width: width, height: LOGO_HEIGHT }]}
            resizeMode="contain"
        />
        <FlatList
            data={images}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.image} />
            )}
            showsVerticalScrollIndicator={false}
        />
    </View>
);

const Tab = createBottomTabNavigator();

const MainPage = () => (
    <Tab.Navigator
        tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }}
    >
        <Tab.Screen
            name="Ev"
            component={HomeScreen}
            options={{
                headerShown:false,
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home-outline" size={size} color={color} />
                ),
                tabBarLabel: () => null, // Yazıyı kaldır
            }}
        />
        <Tab.Screen
            name="Arama"
            component={Searchpage} // SearchPage bileşenini buraya ekleyin
            options={{
                headerShown: false, // Header'ı gizler
                tabBarIcon: ({ color, size }) => (
                    <Icon name="search-outline" size={size} color={color} />
                ),
                tabBarLabel: () => null, // Yazıyı kaldır
            }}
        />
        <Tab.Screen
            name="Menu"
            component={Menupage}
            options={{
                headerShown:false,
                tabBarIcon: ({ color, size }) => (
                    <Icon name="menu-outline" size={size} color={color} />
                ),
                tabBarLabel: () => null, // Sadece sembol
            }}
        />
        <Tab.Screen
            name="Sepet"
            component={SepetEkrani}
            options={{
                headerShown:false,
                tabBarIcon: ({ color, size }) => (
                    <Icon name="cart-outline" size={size} color={color} />
                ),
                tabBarLabel: () => null, // Yazıyı kaldır
            }}
        />
        <Tab.Screen
            name="Kullanici"
            component={() => null}
            options={{
                headerShown:false,
                tabBarIcon: ({ color, size }) => (
                    <Icon name="person-outline" size={size} color={color} />
                ),
                tabBarLabel: () => null, // Yazıyı kaldır
            }}
        />
    </Tab.Navigator>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        resizeMode: 'cover',
    },
    logo: {
        position: 'absolute',
        top: -120,
        left: 0,
        zIndex: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 50, // Sabit navigasyon çubuğu yüksekliği
        backgroundColor: '#fff',
    },
});

export default MainPage;

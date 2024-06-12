import React from 'react';
import { Image, FlatList, View, StatusBar, Dimensions, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Searchpage from './Searchpage';
import Menupage from './Menupage';
import SepetEkrani from './SepetEkrani';
import Userpage from './Userpage';

const { width, height } = Dimensions.get('screen');

const images = [
    'https://static.zara.net/assets/public/afdc/8fc0/2937473db306/6f90a318577f/image-portrait-ipad-fill-41c9c880-d07c-433d-8aeb-f56a6e0cef1f-default_0.jpg?ts=1716395238417&w=948',
    'https://static.zara.net/assets/public/886e/6345/870544a1b85f/2b94c3e64bc2/image-portrait-ipad-fill-51c23de4-c2ac-456e-a032-5daccba363cc-default_0.jpg?ts=1716394068256&w=948',
    'https://static.zara.net/assets/public/afdc/8fc0/2937473db306/6f90a318577f/image-portrait-ipad-fill-41c9c880-d07c-433d-8aeb-f56a6e0cef1f-default_0.jpg?ts=1716395238417&w=948',
    'https://static.zara.net/assets/public/886e/6345/870544a1b85f/2b94c3e64bc2/image-portrait-ipad-fill-51c23de4-c2ac-456e-a032-5daccba363cc-default_0.jpg?ts=1716394068256&w=948',
    'https://static.zara.net/assets/public/afdc/8fc0/2937473db306/6f90a318577f/image-portrait-ipad-fill-41c9c880-d07c-433d-8aeb-f56a6e0cef1f-default_0.jpg?ts=1716395238417&w=948',
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
                listeners: ({ navigation }) => ({ // listeners ekleyin
                    tabPress: () => {
                        navigation.navigate('Sepet', { reload: true }); // 'Sepet' ekranına yönlendirirken reload parametresini true olarak ayarla
                    }
                })
            }}
        />

        <Tab.Screen
            name="Kullanici"
            component={Userpage}
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
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './Screens/AuthContext'; 
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import MainPage from './Screens/Mainpage';
import Searchpage from './Screens/Searchpage'; // Searchpage dosyasının doğru yolu
import Product from './Screens/Product'; // Product dosyasının doğru yolu
import Menupage from './Screens/Menupage';
import Menuback from './Screens/Menuback';
import SepetEkrani from './Screens/SepetEkrani';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="Searchpage" component={Searchpage} options={{ headerShown: false }} />
        <Stack.Screen name="Product" component={Product} options={{ headerShown: false }} />
        <Stack.Screen name="Menupage" component={Menupage} options={{ headerShown: false }} />
        <Stack.Screen name="Menuback" component={Menuback} options={{ headerShown: false }} />
        <Stack.Screen name="SepetEkrani" component={SepetEkrani} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

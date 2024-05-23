import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity } from "react-native";

const SingIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Kullanıcı girişi fonksiyonu
  const handleSignIn = () => {
    // API'ye post isteği gönder
    fetch('http://192.168.1.28:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // API'den dönen yanıtı konsola yazdır
        if (data.token) {
            // Giriş başarılıysa MainPage'e git
            navigation.navigate('MainPage');
        } else {
            // Giriş başarısızsa kullanıcıyı bilgilendir
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    });
  };

  function navigate() {
    navigation.navigate('SignUp');
  }
  
  return (
    <View style={styles.mainView}>
        <View style={styles.topView}>
            <Image source={require('../assets/images/logo/logo.png')}
            style={{ width: 400, height: 410 }} 
            />
        </View>

        <View style={styles.bottomView}>
            <Text style={styles.Heading}>
                Welcome{'\n'}
                back
            </Text>
            <View style={styles.FormView}>
                <TextInput 
                    placeholder={"Email address"} 
                    placeholderTextColor={'#fff'} 
                    style={styles.TextInput} 
                    value={email} 
                    onChangeText={text => setEmail(text)} 
                />
                <TextInput 
                    placeholder={"Password*"} 
                    secureTextEntry={true} 
                    placeholderTextColor={'#fff'} 
                    style={styles.TextInput} 
                    value={password} 
                    onChangeText={text => setPassword(text)} 
                />
                <TouchableOpacity style={styles.Button} onPress={handleSignIn}>
                    <Text style={styles.ButtonText} >Sign in</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.TextButton} onPress={navigate}>
                <Text style={styles.SignUpText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topView: {
    width: '100%',
    height: '30%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  bottomView: {
    width: '100%',
    height: '70%',
    backgroundColor: '#000',
    borderTopLeftRadius:30,
    borderTopRightRadius:30
  },
  Heading:{
    color:'#fff',
    fontSize:40,
    fontWeight:'bold',
    marginLeft:15,
    marginTop:60
  },
  FormView:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    marginTop:40

  },
  TextInput:{
    width:'90%',
    borderWidth:1,
    borderColor:'#fff',
    height:52,
    borderRadius:10,
    paddingLeft:14,
    marginTop:20,
    color:'#fff'
  },
  Button:{
    width:'90%',
    height:52,
    color:'#fff',
    backgroundColor:'#fff',
    marginTop:20,
    borderRadius:10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  ButtonText:{
    fontWeight:'bold',
    fontSize:18
  },
  SignUpText:{
    color:'gray',
  },
  TextButton:{
    width:'100%',
    display:'flex',
    alignItems:'center',
    marginTop:20
  }
});

export default SingIn;

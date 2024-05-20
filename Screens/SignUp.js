import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView } from "react-native";

const SignUp = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Şifrelerin eşleştiğini kontrol et
    if (password !== confirmPassword) {
        setMessage('Şifreler uyuşmuyor');
        return;
    }

    // Kullanıcı bilgilerini bir objede topla
    const userData = {
        fullname: fullname,
        email: email,
        mobile: mobile,
        password: password
    };

    // API'ye POST isteği gönder
    fetch('http://192.168.1.6:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // API'den dönen yanıtı konsola yazdır
        if (data.message === "User registered successfully!") {
            setMessage('Kayıt başarılı');
            // Başarılı kayıt durumunda, kullanıcı bilgilerini sıfırla
            setFullname('');
            setEmail('');
            setMobile('');
            setPassword('');
            setConfirmPassword('');
        } else {
            setMessage('Kullanıcı kaydı başarısız!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        setMessage('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    });
};


  return (
      <View style={styles.mainView}>
          <View style={styles.topView}>
              <Image source={require('../assets/images/logo/logo.png')} style={{ width: 400, height: 410 }} />
          </View>

          <ScrollView style={styles.bottomView}>
              <Text style={styles.Heading}>
                  Welcome{'\n'}
                  to us
              </Text>
              {message ? <Text style={styles.Message}>{message}</Text> : null}
              <View style={styles.FormView}>
                  <TextInput
                      placeholder={"Full name"}
                      placeholderTextColor={'#fff'}
                      style={styles.TextInput}
                      value={fullname}
                      onChangeText={text => setFullname(text)}
                  />
                  <TextInput
                      placeholder={"Email address"}
                      placeholderTextColor={'#fff'}
                      style={styles.TextInput}
                      value={email}
                      onChangeText={text => setEmail(text)}
                  />
                  <TextInput
                      placeholder={"Mobile"}
                      placeholderTextColor={'#fff'}
                      style={styles.TextInput}
                      value={mobile}
                      onChangeText={text => setMobile(text)}
                  />
                  <TextInput
                      placeholder={"Password*"}
                      secureTextEntry={true}
                      placeholderTextColor={'#fff'}
                      style={styles.TextInput}
                      value={password}
                      onChangeText={text => setPassword(text)}
                  />
                  <TextInput
                      placeholder={"Confirm Password*"}
                      secureTextEntry={true}
                      placeholderTextColor={'#fff'}
                      value={confirmPassword}
                      style={styles.TextInput}
                      onChangeText={text => setConfirmPassword(text)}
                  />
                  <TouchableOpacity style={styles.Button} onPress={handleSignUp}>
                      <Text style={styles.ButtonText}>Sign up</Text>
                  </TouchableOpacity>
              </View>

          </ScrollView>
      </View>
  )
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
        height: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomView: {
        width: '100%',
        height: '80%',
        backgroundColor: '#000',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    Heading: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 60
    },
    FormView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40

    },
    TextInput: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        height: 52,
        borderRadius: 10,
        paddingLeft: 14,
        marginTop: 20,
        color: '#fff'
    },
    Button: {
        width: '90%',
        height: 52,
        color: '#fff',
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    Message: {
        color: 'red',
        marginTop: 10
    }
});

export default SignUp;

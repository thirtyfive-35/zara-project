import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useAuth } from './AuthContext';

const API_URL = 'http://192.168.1.16:3000/api/users'; // API URL'si

const Userpage = () => {
    const [userData, setUserData] = useState(null);
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data[0]; // API yanıtındaki ilk objeyi al
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [token]); // useEffect bağımlılıklarına token ekleyin

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profil</Text>
            <View style={styles.line}></View>

            <Text style={styles.label}>İsim</Text>
            <Text style={styles.value}>{userData.fullname}</Text>
            <View style={styles.line}></View>

            <Text style={styles.label}>E-mail</Text>
            <Text style={styles.value}>{userData.email}</Text>
            <View style={styles.line}></View>

            <Text style={styles.label}>Telefon</Text>
            <Text style={styles.value}>+90 {userData.mobile}</Text>
            <View style={styles.line}></View>

            <Text style={styles.label}>Parola</Text>
            <Text style={styles.value}>*********</Text>
            <View style={styles.line}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor:'#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 16
    },
    label: {
        fontSize: 15,
        marginBottom: 8
    },
    value: {
        fontSize: 16,
        marginBottom: 16
    }
});

export default Userpage;
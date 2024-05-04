import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext'; 
const SignupScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const navigation = useNavigation();
    const { setUser } = useUser();
    const handleSignup = async () => {
        try {
            const response = await axios.post('http://192.168.1.14:4000/api/users/register', {
                name,
                email,
                password,
                address,
                phone
            });
            setUser({
                userId: response.data.user.userId,
                name: response.data.user.name,
                email: response.data.user.email,
                address: response.data.user.address,
                phone: response.data.user.phone
            });
            Alert.alert("Success", "Registration successful!");
            navigation.navigate('bottom-navigation');
        } catch (error) {
            console.error('Signup failed:', error);
            Alert.alert("Error", "Failed to register");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <Button
                title="Register"
                onPress={handleSignup}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    input: {
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    }
});

export default SignupScreen;

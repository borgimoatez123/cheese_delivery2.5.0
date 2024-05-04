import React, { useState } from 'react';
import { Text, TextInput, ActivityIndicator, View, StyleSheet, Button, Alert ,TouchableOpacity} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext'; 
import { COLORS, SIZES } from "../constants/theme";
import LottieView from "lottie-react-native";
const LoginScreen = () => {
  const { setUser } = useUser();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://192.168.1.14:4000/api/users/login', {
                email,
                password
            });
            setIsLoading(false);
            // Store user details from response
            setUser({
                userId: response.data.user.userId,
                name: response.data.user.name,
                email: response.data.user.email,
                address: response.data.user.address,
                phone: response.data.user.phone
            });
            Alert.alert("Success", "You are logged in!");
            // Optionally pass user details to the next screen or save to global state
            navigation.navigate('bottom-navigation');
        } catch (error) {
            setIsLoading(false);
            Alert.alert("Error", error.response ? error.response.data.message : error.message);
        }
    };
    const goToSignup = () => {
       
        navigation.navigate('SignupScreen');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
             <TouchableOpacity onPress={goToSignup}>

                <Text> create acounte</Text>
             </TouchableOpacity>
            <Button title="Log In" onPress={handleLogin} disabled={isLoading} />
        </View>
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
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    label: {
        fontSize: 16,
    }
});

export default LoginScreen;

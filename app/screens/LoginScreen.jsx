import React, { useRef,useState } from 'react';
import { Text, TextInput, View, StyleSheet, Button, Alert, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useUser } from '../context/UserContext';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./login.style";
import { COLORS, SIZES } from "../constants/theme";
import LottieView from 'lottie-react-native';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginScreen = () => {
  const { setUser } = useUser();
  const navigation = useNavigation();
  const animation = useRef(null);
  const [obsecureText, setObsecureText] = useState(false);

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://192.168.1.14:4000/api/users/login', { //  // 10.2.40.64
        email: values.email, 
        password: values.password
      });
      // Store user details from response
      setUser({
        userId: response.data.user.userId,
        name: response.data.user.name,
        email: response.data.user.email,
        address: response.data.user.address,
        phone: response.data.user.phone
      });
      Alert.alert("Success", "You are logged in!");
      navigation.navigate('bottom-navigation');
    } catch (error) {
      Alert.alert("Error", error.response ? error.response.data.message : error.message);
    }
  };

  const goToSignup = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <View style={{ marginHorizontal: 20, marginTop: 50 }}>
        <LottieView
          autoPlay
          ref={animation}
          style={{ width: "100%", height: SIZES.height / 3.2 }}
          source={require("../../assets/anime/delivery.json")}
        />
           <Text style={styles.titleLogin}>Cheese Family</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin(values);
            setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched ,    setFieldTouched,}) => (
            <View >
                  <View style={styles.wrapper}>
              <Text style={styles.label}>Email:</Text>
              <View
                  style={styles.inputWrapper(
                    touched.email ? COLORS.secondary : COLORS.offwhite
                  )}
                >
 <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
              <TextInput
                placeholder="Enter email"
                onFocus={() => {
                  setFieldTouched("email");
                }}
                onBlur={() => {
                  setFieldTouched("email", "");
                }}
                onChangeText={handleChange('email')}
                
                value={values.email}
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1 }}
                keyboardType="email-address"
              />  
              </View>
              {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
            
 </View>
              
              <View style={styles.wrapper}>
              <Text style={styles.label}>Password:</Text>
              <View
                  style={styles.inputWrapper(
                    touched.password ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                     <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
              <TextInput
           style={{ flex: 1 }}
           placeholder="Password"
           secureTextEntry={obsecureText}
                onChangeText={handleChange('password')}
        
                value={values.password}
                onFocus={() => {
                    setFieldTouched("password");
                  }}
                  onBlur={() => {
                    setFieldTouched("password", "");
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
              />
                <TouchableOpacity
                    onPress={() => {
                      setObsecureText(!obsecureText);
                    }}
                  >
                    <MaterialCommunityIcons
                      name={obsecureText ? "eye-outline" : "eye-off-outline"}
                      size={18}
                    />
                  </TouchableOpacity>
             </View>
              {touched.password && errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
              </View>
             
              <Button
         
                title={"L O G I N"}
                onPress={handleSubmit }
                
              />

<TouchableOpacity onPress={goToSignup}>
                <Text         style={styles.registration} >Create account</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};



export default LoginScreen;

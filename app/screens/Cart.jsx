import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView ,Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL,COLORS, SIZES } from "../constants/theme";
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity,removeFromCart,cleanCart } from '../redux/CartReducer';
import CartItem from '../components/CartItem';
const Cart = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cart); 



 
  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  };
  
  const handleOrders = async () => {
    // Mapping items to fit backend schema requirements
    const items = cartItems.map(item => ({
      cheeseId: item._id,  // Ensure this is a valid MongoDB ObjectId
      quantity: item.quantity,
      price: item.price  // Ensure this field exists and is a number
    }));

    const priceTotal = getTotalPrice(); // Ensure this calculation is correct
    console.log("Submitting order with priceTotal:", priceTotal);

    console.log("Order being sent:", { userId: user.userId, items, priceTotal }); // Log the data

    try {
      const response = await fetch(`${API_URL}/api/order/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          items,
          phone: user.phone,
          name: user.name,
          address: user.address,
          priceTotal,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Order placed successfully!');
        dispatch(cleanCart()); 
        navigation.navigate('OrdersScreen');
      } else {
        Alert.alert('Error', result.message || 'Failed to place order');
        console.error('Order submission error:', result);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send order: ' + error.message);
      console.error('Network or other error:', error);
    }
  };

  return (
    <SafeAreaView 
    style={{
      paddinTop: Platform.OS === "android" ? 40 : 0,
      flex: 1,
      backgroundColor: "white",
    }}
    >
    <ScrollView>
    <View style={styles.container}>
    {cartItems.map((item) => (
      <CartItem key={item._id} item={item} />
    ))}
    <View style={styles.feeContainer}>
      <Text style={styles.feeText}>Delivery Fee</Text>
      <Text style={styles.feeAmount}>0 TND </Text>
   
    </View>
    <View style={styles.totalContainer}>
      <Text style={styles.totalText}>Order Total</Text>
      <Text style={styles.totalAmount}>{getTotalPrice().toFixed(2)} TND </Text>
    </View>
    <TouchableOpacity onPress={handleOrders} style={styles.orderButton}>
      <Text style={styles.orderButtonText}>Place Order</Text>
    </TouchableOpacity>
  </View>
  </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  feeText: {
    fontSize: 16,
    color: '#666',
  },
  feeAmount: {
    fontSize: 16,
    color: '#666',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: "#FFA500", // Orange color similar to the image
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  orderButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default Cart;
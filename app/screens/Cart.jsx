import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from "../constants/theme";
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const Cart = ({ route }) => {
  const navigation = useNavigation();
  const { user } = useUser();
  const { items } = route.params;
  const [cartItems, setCartItems] = useState(items.map(item => ({ ...item, currentPrice: item.price })));

  const handleIncreaseQuantity = (index) => {
    const newItems = cartItems.map((item, idx) => {
      if (idx === index) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(newItems);
  };

  const handleDecreaseQuantity = (index) => {
    const newItems = cartItems.map((item, idx) => {
      if (idx === index && item.quantity > 1) { // Ensure quantity does not go below 1
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(newItems);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + (item.quantity * item.currentPrice), 0);
  };

  const handleOrders = async () => {
    const userId = user.userId; 
    const name = user.name;
    const phone = user.phone;
    const address = user.address;

    // Map items to fit backend schema requirements
    const items = cartItems.map(item => ({
      cheeseId: item.id,  
      quantity: item.quantity,
      price: item.currentPrice,  // This sends the currentPrice as the price
    }));

    const priceTotal = getTotalPrice();

    try {
      const response = await fetch('http://192.168.1.14:4000/api/order/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          name,
          items,
          phone,
          address,
          priceTotal,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Order placed successfully! Do you want to order more?');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', result.message || 'Failed to place order');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send order: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      {cartItems.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemText}>
            {item.name} - {item.quantity} x {item.currentPrice.toFixed(2)} TND
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDecreaseQuantity(index)}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleIncreaseQuantity(index)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <Text style={styles.totalText}>
        Total Price: {getTotalPrice().toFixed(2)} TND
      </Text>
      <View style={{ paddingHorizontal: 80, paddingVertical: 20 }}>
        <TouchableOpacity onPress={handleOrders} style={{ backgroundColor: COLORS.primary, borderRadius: 30, alignItems: 'center' }}>
          <Text style={{ color: COLORS.lightWhite, padding: 10, fontSize: 18 }}>
            Order Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  itemText: {
    fontSize: 16,
    flex: 3, // gives more space to item description
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1, // allocate space evenly between buttons and item description
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  totalText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
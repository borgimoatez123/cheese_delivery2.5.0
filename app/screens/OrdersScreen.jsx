import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator,Image ,Platform} from 'react-native';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { SafeAreaView } from "react-native-safe-area-context";
const OrdersScreen = () => {
  const { user } = useUser();  // Accessing the user object from context
  console.log('Current user:', user); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.userId) {  // Adjust to use 'userId' instead of 'id'
        setError("User not logged in or user ID not found.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://192.168.1.14:4000/api/order/myorder/${user.userId}`); // Use user.userId here
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    

    fetchOrders();
  }, [user]);

  if (!user) {
    return <Text>Please log in to view your orders.</Text>;
  }

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error fetching orders: {error}</Text>;
  }
  const getStatusColor = status => {
    switch(status) {
      case 'Pending':
        return '#ff0000'; // red
      case 'Confirmed':
        return '#0000ff'; // blue
      case 'Delivered':
        return '#00ff00'; // green
      default:
        return '#808080'; // grey for unknown status
    }
  };
  const getStatusText = status => {
    switch(status) {
      case 'Pending':
        return 'You will receive a call from delivery person';
      case 'Confirmed':
        return 'Your cheese is coming to you. Wait a while';
      case 'Delivered':
        return 'What do you think about your experience with us?';
      default:
        return status; // Fallback to display the raw status if not one of the expected values
    }
  };
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.deliveryStatus) }]} />
    <Image source={require('../../assets/images/parcel_icon.png')}/>
 
    <Text style={styles.headerText}>Total Price: {item.priceTotal} TND </Text>
    <Text style={styles.itemText}>Status: {getStatusText(item.deliveryStatus)}</Text>
    {item.items.map((orderItem, index) => (
        <View key={index} style={styles.cheeseContainer}>
            <Text style={styles.cheeseText}>Cheese Name: {orderItem.cheeseId.name}</Text>
            <Text style={styles.cheeseText}>Description: {orderItem.cheeseId.description}</Text>
            <Text style={styles.cheeseText}>Quantity: {orderItem.quantity} kg </Text>
        </View>
    ))}
</View>
);
  return (
    <SafeAreaView 
    style={{
      paddinTop: Platform.OS === "android" ? 40 : 0,
      flex: 1,
      backgroundColor: "white",
    }}
    >
    <View style={styles.container}>
    {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
    ) : (
        <FlatList
            data={orders}
            renderItem={renderItem}
            keyExtractor={item => item._id}
        />
    )}
</View>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  statusDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cheeseContainer: {
    marginTop: 5,
    padding: 5,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
  },
  cheeseText: {
    fontSize: 14,
  },
});


export default OrdersScreen;

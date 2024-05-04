
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Store } from '../constants/uidata';
import axios from 'axios'; // Make sure to import axios

const StoreCardHome = () => {
  const navigation = useNavigation();
  const [cheesesData, setCheesesData] = useState([]);

  useEffect(() => {
    const fetchCheesesData = async () => {
      try {
        const response = await axios.get('http://192.168.1.14:4000/api/cheese/all');
        const data = response.data;
        if (!Array.isArray(data)) {  // Check if the data is an array
          throw new Error('Data is not an array');
        }
        setCheesesData(data);
      } catch (error) {
        console.error('Failed to fetch food data:', error);
      }
    };
  
    fetchCheesesData();
  }, []);
  return (
    <View style={{ marginBottom: 20 }}>
      <FlatList
        data={Store}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            // Filter food data based on the store name
            const filteredData = cheesesData.filter(food => food.store === item.name);
            navigation.navigate('InStore', { storeData: filteredData , storeName: item.name,storeImage: item.image  });
          }}>
            <View style={styles.storeCard}>
              <Image source={{ uri: item.image }} style={styles.storeImage} />
              <Text style={styles.storeName}>{item.name}</Text>
              <Text style={styles.storeDescription}>{item.description}</Text>
              <Text style={styles.storeAddress}>{item.address}</Text>
              <Text style={styles.storeRating}>Rating: {item.stars} stars, {item.reviews} reviews</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  storeCard: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }
  },
  storeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10
  },
  storeName: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 8
  },
  storeDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
    marginHorizontal: 8
  },
  storeAddress: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
    marginHorizontal: 8
  },
  storeRating: {
    fontSize: 12,
    color: '#444',
    marginBottom: 8,
    marginHorizontal: 8,
    fontWeight: '500'
  }
});

export default StoreCardHome;

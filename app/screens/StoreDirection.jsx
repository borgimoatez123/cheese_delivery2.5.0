import React, { useState ,useContext} from 'react';
import { StyleSheet,View, Text, ScrollView ,Image ,TouchableOpacity ,FlatList } from 'react-native';
import { COLORS, SIZES } from "../constants/theme";
import {
  Ionicons
} from "@expo/vector-icons";
import { Store } from '../constants/uidata';

const StoreDirection = () => {



  


    
  
  
  
    return (
      <View style={{ backgroundColor: COLORS.lightWhite, height: SIZES.height }}>
        <Image source={{ uri: Store.image }} style={{ width: SIZES.width, height: SIZES.height / 4, borderBottomRightRadius: 30 }} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbtn}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.primary} />
        </TouchableOpacity>
  
  
   
  
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>{Store.name}</Text>
     
     
   
      </View>
    );
}

export default StoreDirection

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
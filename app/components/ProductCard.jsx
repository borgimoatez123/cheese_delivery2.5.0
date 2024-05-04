import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { COLORS, SIZES } from "../constants/theme";

const ProductCard = ({ productName, productPrice,imageUrl, onAddPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{productName}</Text>
  
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}> {productPrice}</Text>
      <Button title="Add" style={{}} onPress={onAddPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    elevation: 5,
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  restBtn: {
    borderColor: COLORS.lightWhite,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    marginRight: 10,
  }
});

export default ProductCard;

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet  } from 'react-native';
import { COLORS, SIZES } from "../constants/theme";

const ProductCard = ({ productName, productPrice,imageUrl, onAddPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{productName}</Text>
  
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}> {productPrice}</Text>
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Text style={styles.buttonText}>Buy now</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#FFC72C",  // Your specified color
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    width: 100,  // Set a width for the button
  },
  buttonText: {
    color: 'white',  // Set text color to white for better visibility
    fontSize: 16,  // Optional: Adjust the font size as needed
  }
});


export default ProductCard;

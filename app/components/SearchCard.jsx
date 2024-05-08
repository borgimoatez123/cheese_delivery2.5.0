import { View, Text,Image ,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
import React from 'react'
import { categories } from '../constants/uidata';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';
const SearchCard = ({item}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const categoryImage = categories.find(category => category.title.toLowerCase() === item.category.toLowerCase())?.imageUrl;
    const handleAddToCart = () => {
        dispatch(addToCart({ _id: item._id, name: item.name, price: item.price, category: item.category }));
        navigation.navigate('Cart');
    };
  return (

    <View style={styles.card}>
    <Text style={styles.title}>{item.name}</Text>

    <Image source={{ uri: categoryImage }} style={styles.image} />
    <Text style={styles.title}> {item.price} TND</Text>
    <TouchableOpacity style={styles.addButton} >
      <Text style={styles.buttonText} onPress={handleAddToCart} >Buy now</Text>
    </TouchableOpacity>
  </View>

  )
}
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
  
export default SearchCard
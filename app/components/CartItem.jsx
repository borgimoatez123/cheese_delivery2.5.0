import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/CartReducer';
import { Alert } from 'react-native';
import { categories } from '../constants/uidata';
import { FontAwesome } from '@expo/vector-icons';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const categoryImage = categories.find(category => category.title.toLowerCase() === item.category.toLowerCase())?.imageUrl;

    const handleIncreaseQuantity = () => {
        dispatch(incrementQuantity({ _id: item._id }));
    };

    const handleDecreaseQuantity = () => {
        if (item.quantity > 0.5) {
            dispatch(decrementQuantity({ _id: item._id }));
        } else {
            Alert.alert("Notice", "Can't reduce below 1. Use remove if needed.");
        }
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart({ _id: item._id }));
    };

    return (
        <View style={styles.card}>
        <Image
            source={{ uri: categoryImage }}
            style={styles.image}
        />
        <View style={styles.detailsContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{` ${(item.price ).toFixed(2)} TND`}</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={handleDecreaseQuantity}>
                    <AntDesign name="minuscircle" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity} kg  </Text>
                <TouchableOpacity onPress={handleIncreaseQuantity}>
                    <AntDesign name="pluscircle" size={24} color="#333" />
                </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity onPress={handleRemoveFromCart} style={styles.removeButton}>
            <FontAwesome name="trash-o" size={24} color="grey" />
        </TouchableOpacity>
    </View>
);
};

const styles = StyleSheet.create({
card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 50,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
},
image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 15
},
detailsContainer: {
    flex: 1,
    paddingRight: 10
},
name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5
},
price: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10
},
quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center'
},
quantity: {
    marginHorizontal: 10,
    fontSize: 16
},
removeButton: {
    paddingLeft: 10
}
});
 
export default CartItem;

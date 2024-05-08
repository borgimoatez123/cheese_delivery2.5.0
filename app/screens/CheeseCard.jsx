import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Alert, Text } from 'react-native';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { categories } from "../constants/uidata";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartReducer';
import { API_URL } from '../constants/theme';
const CheeseCard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    useEffect(() => {
        fetchServerData();
    }, []);

    const fetchServerData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/cheese/all`);
          const serverData = response.data.map(product => {
    const normalizedServerCategory = product.category.trim().toLowerCase();
    const uiProduct = categories.find(({ title }) =>
        title.trim().toLowerCase() === normalizedServerCategory
    );
    return {
        id: product._id, 
        category:product.category,
        name: product.name,
        imageUrl: uiProduct ? uiProduct.imageUrl : 'https://via.placeholder.com/150',
        price: product.price,
        
    };
});

            setProducts(serverData);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            Alert.alert('Error', 'Failed to load products');
        } finally {
            setLoading(false);
        }
    };

       const handleAddPress = (product) => {
        dispatch(addToCart({
            _id: product.id,
            category:product.category,
            name: product.name,
            price: product.price,
            quantity: 1 // Initial quantity when adding to cart
        }));
        navigation.navigate('Cart');
    }; 
    
    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {products.length > 0 ? products.map((product, index) => (
                <View style={styles.cardContainer} key={index}>
                    <ProductCard
                        productName={product.name}
                        imageUrl={product.imageUrl}
                        productPrice={`${product.price.toFixed(2)} TND`}
                        onAddPress={() => handleAddPress(product)}
                    />
                </View>
            )) : <Text>No products found</Text>}
        </ScrollView>
    );
}

export default CheeseCard;


const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        width: '50%', // Each card takes up half of the container width
        padding: 5, // Optional padding to ensure there's space between cards
        backgroundColor: 'transparent', // Ensuring the background is transparent
        shadowOpacity: 0, // Removing any shadow effects
        elevation: 0, // Removing elevation on Android to prevent any shadow
    }
});
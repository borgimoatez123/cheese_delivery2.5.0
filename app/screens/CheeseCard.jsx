import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Alert, Text } from 'react-native';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { categories } from "../constants/uidata";
import { useNavigation } from '@react-navigation/native';

const CheeseCard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchServerData();
    }, []);

    const fetchServerData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://192.168.1.14:4000/api/cheese/all');
          const serverData = response.data.map(product => {
    const normalizedServerCategory = product.category.trim().toLowerCase();
    const uiProduct = categories.find(({ title }) =>
        title.trim().toLowerCase() === normalizedServerCategory
    );
    return {
        id: product._id, // Assuming the unique identifier from the server is '_id'
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
        // Pass data to Cart component via navigation with cheeseId
        navigation.navigate('Cart', {
            items: [{
                cheeseId: product.id, // Assuming 'id' from server data is used as 'cheeseId'
                name: product.name,
                price: product.price,
                quantity: 1, // Assuming initial quantity
            }]
        });
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
    }
});
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity} from "react-native";
import React,{useRef, useState,useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants/theme";
import {Feather, AntDesign } from '@expo/vector-icons';
import styles from "./search.style";
import LottieView from "lottie-react-native";
import axios from 'axios'; // Make sure to import axios
const Search = () => {
  const [searchKey, setSearchKey] = useState('')
  const [cheesesData, setCheesesData] = useState([]);
  const [searchResults, setSearchResults] = useState([])
  const animation = useRef(null);

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

  const handleSearch = () => {
    if (searchKey.trim()) {
      // Filter cheeses data based on search key
      const filteredCheeses = cheesesData.filter(cheese =>
        cheese.name.toLowerCase().includes(searchKey.toLowerCase())
      );
      setSearchResults(filteredCheeses);
    } else {
      // If the search key is empty, clear results
      setSearchResults([]);
    }
  };
  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.name}</Text>
    </View>
  );
console.log('jtt ',searchResults)
  return (
    <SafeAreaView>
      <View style={{backgroundColor: COLORS.primary, height: SIZES.height}}>
      <View style={{backgroundColor: COLORS.offwhite, height: SIZES.height-140, borderBottomEndRadius: 30, borderBottomStartRadius: 30}}>
      <View style={styles.searchContainer}>
    
      <View style={styles.searchWrapper}>
      
        <TextInput 
        style={styles.input}
        value={searchKey}
        onChangeText={setSearchKey}
        placeholder='share your cheese?'
        />
      </View>

      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <Feather name='search' size={24} color={COLORS.secondary}/>
      </TouchableOpacity>
    </View>

    {searchResults.length === 0 ? (
      <View style={{width: SIZES.width, height: SIZES.height/1.5, right: 90}}>
         <LottieView
          autoPlay
          ref={animation}
          style={{ width: "100%", height: "100%", }}
          source={require("../../assets/anime/cheese.json")}
        />
      </View>
    ): (
      <FlatList
      data={searchResults}
      renderItem={renderItem}
      keyExtractor={item => item._id}  // Use a unique property of your data, like `_id`
      contentContainerStyle={styles.list}
    />
    )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;

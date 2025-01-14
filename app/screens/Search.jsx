import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity,ScrollView} from "react-native";
import React,{useRef, useState,useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants/theme";
import {Feather, AntDesign } from '@expo/vector-icons';
import styles from "./search.style";
import LottieView from "lottie-react-native";
import axios from 'axios'; // Make sure to import axios
import {API_URL} from '../constants/theme'
import SearchCard from "../components/SearchCard";
const Search = () => {
  const [searchKey, setSearchKey] = useState('')
  const [cheesesData, setCheesesData] = useState([]);
  const [searchResults, setSearchResults] = useState([])
  const animation = useRef(null);

  useEffect(() => {
    const fetchCheesesData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cheese/all`);
        const data = response.data;
        if (!Array.isArray(data)) {  // Check if the data is an array
          throw new Error('Data is not an array');
        }
        setCheesesData(data);
      } catch (error) {
        console.error('Failed to fetch cheese data:', error);
      }
    };
  
    fetchCheesesData();
  }, []);

  const handleSearch = () => {
    if (searchKey.trim()) {
      const filteredCheeses = cheesesData.filter(cheese =>
        cheese.name.toLowerCase().includes(searchKey.toLowerCase())
      );
      setSearchResults(filteredCheeses);
    } else {
      setSearchResults([]);
    }
  };

console.log('jtt ',searchResults)
  return (
    <SafeAreaView>
      <ScrollView>
      <View >
      <View >
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
  
<View>
    {searchResults.length === 0 ? (
      <View style={{width: SIZES.width, height: SIZES.height/1.5}}>
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
      renderItem={({ item }) => <SearchCard item={item} />}
      keyExtractor={item => item._id}  
      numColumns={2} // Use a unique property of your data, like `_id`
    
      contentContainerStyle={styles.list}
    />
   
    )}
</View>

        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

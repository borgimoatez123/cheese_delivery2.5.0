import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import {categories} from "../constants/uidata";
import CategoryItem from "./CategoryItem";
const CategoryList = ({
  setSelectedCategory,
  setSelectedSection,
  setSelectedValue,
}) => {
  const [selected, setSelected] = useState(null);

  const scrollX = useRef(new Animated.Value(0)).current;  // Animated value
  const isPressed = useRef(false);  // Track if the item is pressed
  useEffect(() => {
    // Start the animation loop
    const animate = () => {
      if (!isPressed.current) {
        Animated.sequence([
          Animated.timing(scrollX, {
            toValue: 300,  // Distance to move right
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(scrollX, {
            toValue: 0,  // Move back to the start
            duration: 3000,
            useNativeDriver: true,
          })
        ]).start(() => animate());
      }
    };
    animate();
  }, []);
  const handleSelectedCategory = (item) => {
    if (selected == item.value) {
      setSelectedCategory(null);
      setSelected(null);
      setSelectedSection(null);
      setSelectedValue(null);
    } else {
      
      setSelectedCategory(item._id);
      setSelected(item.value);
      setSelectedSection('category');
      setSelectedValue(item.title);
    }
  };

  return (
    <FlatList
      data={categories}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ marginTop: 5
      }}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity
        onPressOut={() => { isPressed.current = false; }}
        onPressIn={() => { isPressed.current = true; }} 
        onPress={()=> handleSelectedCategory(item)}>
          <CategoryItem selected={selected} category={item} />
        </TouchableOpacity>
      )}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({});

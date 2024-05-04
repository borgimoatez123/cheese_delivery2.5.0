import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {categories} from "../constants/uidata";
import CategoryItem from "./CategoryItem";
const CategoryList = ({
  setSelectedCategory,
  setSelectedSection,
  setSelectedValue,
}) => {
  const [selected, setSelected] = useState(null);


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
      style={{ marginTop: 5 }}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=> handleSelectedCategory(item)}>
          <CategoryItem selected={selected} category={item} />
        </TouchableOpacity>
      )}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({});

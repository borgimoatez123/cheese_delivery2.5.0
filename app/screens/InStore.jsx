import React, { useState ,useContext} from 'react';
import { StyleSheet,View, Text, ScrollView ,Image ,TouchableOpacity ,FlatList } from 'react-native';
import { COLORS, SIZES } from "../constants/theme";
import {
  Ionicons
} from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { EvilIcons } from '@expo/vector-icons';
import Carousel from '../components/Carousel';

const InStore = ({ route, navigation }) => {

  
  const { storeData, storeName, carouselImages ,phone } = route.params;

  const [selectedItems, setSelectedItems] = useState({});

  const handleSelectItem = (itemId, isChecked) => {
    setSelectedItems(prevItems => {
      const currentQuantity = prevItems[itemId] || 0;
      const newQuantity = isChecked ? currentQuantity + 1 : Math.max(currentQuantity - 1, 0);
      console.log(itemId); // tjib el el id 
      return { ...prevItems, [itemId]: newQuantity };
    });
  }
console.log(handleSelectItem)
const handleConfirm = () => {
  const selectedItemsDetails = storeData.filter(item => selectedItems[item._id] > 0).map(item => {
    return {
      id: item._id,  
      cheeseId: item._id,  
      name: item.name,
      price: item.price,
      quantity: selectedItems[item._id]
    };
  });

  if (selectedItemsDetails.length > 0) {
    navigation.navigate('Cart', { items: selectedItemsDetails });
  } else {
    alert('Please select at least one item.');
  }
};

  

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
      <BouncyCheckbox
        size={35}
        unfillColor="#FFFFFF"
        fillColor={COLORS.primary}
        innerIconStyle={{ borderWidth: 1 }}
        textStyle={styles.small}
        text={item.name}
        isChecked={selectedItems[item._id] > 0}
        onPress={(isChecked) => handleSelectItem(item._id, isChecked)}
      />
      <Text style={styles.small}>Prix: {item.price} TND</Text>
    </View>
  );

  return (
    <View style={{ backgroundColor: COLORS.lightWhite, height: SIZES.height }}>
  <Carousel images={carouselImages} style={{ width: SIZES.width, height: SIZES.height / 4, borderBottomRightRadius: 30 }} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbtn}>
        <Ionicons name="chevron-back-circle" size={30} color={COLORS.primary} />
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => navigation.navigate('StoreDirection')}
          style={{ position: "absolute", bottom: 25, right: 3 }}
        >
          <View style={styles.restBtn}>
      
          <EvilIcons name="location" size={30} color="white" />
          
          </View>
        </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>{storeName}</Text>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>{phone}</Text>
      <ScrollView style={{ padding: 20 }}>
        <FlatList
          data={storeData}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </ScrollView>
      <View style={{ paddingHorizontal: 80, paddingVertical: 20 }}>
        <TouchableOpacity onPress={handleConfirm} style={{ backgroundColor: COLORS.primary, borderRadius: 30, alignItems: 'center' }}>
          <Text style={{ color: COLORS.lightWhite, padding: 10, fontSize: 18 }}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default InStore;
const styles = StyleSheet.create({
  backbtn: {
    marginLeft: 12,
    alignItems: "center",
    zIndex: 999,
    position: "absolute",
    top: SIZES.xxLarge,
  },
  title: {
    fontSize: 22,
    fontFamily: "medium",
    color: COLORS.black,
  },
  sharebtn: {
    marginRight: 12,
    alignItems: "center",
    zIndex: 999,
    right: 0,
    position: "absolute",
    top: SIZES.xxLarge + 3,
  },
  restBtn: {
    borderColor: COLORS.lightWhite,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    marginRight: 10,
  },
  container: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  small: {
    fontSize: 15,
    fontFamily: "regular",
    color: COLORS.gray,
    textAlign: "justify",
  },
  tags: {
    right: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  input: {
    borderColor: COLORS.primary1,
    borderWidth: 1,
    backgroundColor: COLORS.offwhite,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  suspended: {
    position: "absolute",
    zIndex: 999,

    width: "100%",
    alignItems: "center",
  },
  cart: {
    width: SIZES.width - 24,
    height: 60,
    justifyContent: "center",
    backgroundColor: COLORS.primary1,
    borderRadius: 30,
  },
  cartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  cartbtn: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  restBtn: {
    borderColor: COLORS.lightWhite,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    marginRight: 10,
    marginBottom:550,
  }
});
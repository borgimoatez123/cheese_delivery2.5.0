import { View, Text  ,Pressable ,TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
const SearchCom = () => {
    const navigation = useNavigation();
  return (
    <View
    style={{
      backgroundColor: "#00CED1",
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 7,
        gap: 10,
        backgroundColor: "white",
        borderRadius: 3,
        height: 38,
        flex: 1,
      }}
      onPress={()=>  navigation.navigate('Search')}
    >
      <AntDesign
        style={{ paddingLeft: 10 }}
        name="search1"
        size={22}
        color="black"
        onPress={()=>  navigation.navigate('Search')}
      />
      <TextInput placeholder="Search your cheese"   editable={false}  />
    </Pressable>

    <Feather name="mic" size={24} color="black" />
  </View>
  )
}

export default SearchCom
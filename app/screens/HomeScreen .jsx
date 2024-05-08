import { ScrollView, StyleSheet, Text, View ,  Platform } from "react-native";
import React, {useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import pages from "./page.style";
import HomeHeader from "../components/HomeHeader";

import CategoryList from "../components/CategoryList";
import ChoicesList from "../components/ChoicesList";
import StoreCardHome from "../components/StoreCardHome";
import PbuImage from "../components/PbuImage";
import Heading from "../components/Heading";

import CheeseCard from "./CheeseCard";
import SearchCom from "../components/SearchCom";
const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState(null);
        return (
      <SafeAreaView 
      style={{
        paddinTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
      >
             
    
             <HomeHeader />
          
           
              
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
      
        <SearchCom/>
        <ScrollView   showsVerticalScrollIndicator={false}
            style={{ borderBottomEndRadius: 30, borderBottomStartRadius: 30 }}>
               
    <CategoryList
              setSelectedCategory={setSelectedCategory}
              setSelectedSection={setSelectedSection}
              setSelectedValue={setSelectedValue}
            />
             <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />
 
            <PbuImage/>
            <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />
             <ChoicesList setSelectedChoice={setSelectedChoice} setSelectedSection={setSelectedSection}/>
             <View>
             <Heading heading={'Store near you '} onPress={()=>{}}/>
             <StoreCardHome/>
             <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />
             <CheeseCard/>
             </View>
        </ScrollView>
          </View>
          </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    }
});

export default HomeScreen;

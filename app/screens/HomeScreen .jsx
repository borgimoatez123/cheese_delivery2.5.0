import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, {useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import pages from "./page.style";
import HomeHeader from "../components/HomeHeader";
import { UserReversedGeoCode } from "../context/UserReversedGeoCode";
import { UserLocationContext } from "../context/UserLocationContext";
import CategoryList from "../components/CategoryList";
import ChoicesList from "../components/ChoicesList";
import StoreCardHome from "../components/StoreCardHome";
import PbuImage from "../components/PbuImage";
import Heading from "../components/Heading";
import Divider from "../components/Divider";
import CheeseCard from "./CheeseCard";
const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState(null);
        return (
      <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
        <HomeHeader />
        <ScrollView   showsVerticalScrollIndicator={false}
            style={{ borderBottomEndRadius: 30, borderBottomStartRadius: 30 }}>
    <CategoryList
              setSelectedCategory={setSelectedCategory}
              setSelectedSection={setSelectedSection}
              setSelectedValue={setSelectedValue}
            />
<Divider/>
            <PbuImage/>
             <ChoicesList setSelectedChoice={setSelectedChoice} setSelectedSection={setSelectedSection}/>
             <View>
             <Heading heading={'Store near you '} onPress={()=>{}}/>
             <StoreCardHome/>
             <Divider/>
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

import { StyleSheet, Text, View,TouchableOpacity   } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AssetImage from "./AssetImage";
import { UserReversedGeoCode } from "../context/UserReversedGeoCode";
import { COLORS, SIZES } from "../constants/theme";
import { UserLocationContext } from "../context/UserLocationContext";
import * as Location from "expo-location";
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";

const HomeHeader = () => {
  const { user } = useUser();
  const { address, setAddress } = useContext(UserReversedGeoCode);
  const { location, setLocation } = useContext(UserLocationContext);

  const navigation = useNavigation();
  useEffect(() => {
    if (location !== null) {
      reverseGeoCode(location.coords.latitude, location.coords.longitude);
    }
  }, [location]);

  const reverseGeoCode = async (latitude, longitude) => {
    const reversedGeoCodedAddress = await Location.reverseGeocodeAsync({
      longitude: longitude,
      latitude: latitude,
    });
    setAddress(reversedGeoCodedAddress[0]);
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={styles.outerStyle}>
        <AssetImage
          data={require("../../assets/images/profile.png")}
          width={50}
          height={50}
          mode={"cover"}
          raduis={99}
        />
        <View style={styles.headerStyle}>
          <Text style={styles.heading}>{user.name}</Text>

           <Text
            style={styles.location}
          >{`${address.city} ${address.name}`}</Text>
        </View>
      </View>
      
     
    </View>
  );
};



export default HomeHeader;

const styles = StyleSheet.create({
  outerStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  headerStyle: {
    marginLeft: 15,
    justifyContent: "center",
  },
  heading: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  location: {
    fontFamily: "regular",
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
  },
});


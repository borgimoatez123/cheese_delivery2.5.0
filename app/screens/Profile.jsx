import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert ,TouchableOpacity,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { AntDesign } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import ProfileTile from '../components/ProfileTile';
import AssetImage from "../components/AssetImage";
import { useNavigation } from '@react-navigation/native';
const ProfileScreen = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const bkImg =
  "https://d326fntlu7tb1e.cloudfront.net/uploads/ab6356de-429c-45a1-b403-d16f7c20a0bc-bkImg-min.png";

  return (
    <View>
      <View style={{ backgroundColor: COLORS.primary, height: SIZES.height }}>
        <View
          style={{
            backgroundColor: COLORS.offwhite,
            height: SIZES.height - 80,
            borderBottomEndRadius: 30,
            borderBottomStartRadius: 30,
          }}
        >
          <Image
            source={{ uri: bkImg }}
            style={[
              StyleSheet.absoluteFillObject,
              {
                opacity: 0.7,
              },
            ]}
          />
          <View style={styles.profile}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
                <AssetImage
          data={require("../../assets/images/profile.png")}
          width={50}
          height={50}
          mode={"cover"}
          raduis={99}
        />
              <View style={{ marginLeft: 10, marginTop: 3 }}>
                <Text style={styles.text}>
                  {user === null ? "" : user.name}
                </Text>
                <Text style={styles.email}>
                  {user === null ? "" : user.email}
                </Text>
              </View>
            </View>

            <TouchableOpacity>
              <AntDesign name="logout" size={24} color="red" />
            </TouchableOpacity>
            
          </View>

          

          <View
            style={{
              height: 140,
              backgroundColor: COLORS.lightWhite,
              margin: 10,
              borderRadius: 12,
            }}
          >
           
          </View>

          <View
            style={{
              height: 140,
              backgroundColor: COLORS.lightWhite,
              margin: 10,
              borderRadius: 12,
            }}
          >
            <ProfileTile title={"Coupons"} icon={"tago"} />
            <ProfileTile title={"My Store"} icon={"bag"} font={2} />
            <ProfileTile title={"History"} icon={"globe-outline"} font={1} />
          </View>

        

          <View
            style={{
              height: 140,
              backgroundColor: COLORS.lightWhite,
              margin: 10,
              borderRadius: 12,
            }}
          >
            <ProfileTile
              title={"Shipping Address"}
              icon={"location-outline"}
              font={1}
            />
            <ProfileTile title={"Services Center"} icon={"customerservice"} />
            <ProfileTile title={"Settings"} icon={"setting"} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontFamily: "medium",
    color: COLORS.black,
  },
  email: {
    marginLeft: 10,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 60,
  },
});



/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
/*<View>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
        
          </View>*/ 
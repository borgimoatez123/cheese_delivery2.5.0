import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {Ionicons} from '@expo/vector-icons'
import { COLORS } from "../constants/theme";

const Heading = ({ heading, onPress }) => {
  return (
    <View style={styles.heading}>
      <Text style={styles.text}>{heading}</Text>

      <TouchableOpacity onPress={onPress}>
        <Ionicons name="grid" size={20} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 7,
    justifyContent: "space-between",
    marginRight: 16,
  },
  text: {marginLeft: 16, fontSize: 18, fontFamily: 'bold'}
});

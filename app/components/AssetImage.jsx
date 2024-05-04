import { StyleSheet, Image, View } from "react-native";
import React from "react";

const AssetImage = ({ data, width, height, mode, raduis }) => {
  return (
    <Image source={data} style={styles.image(width, height, mode, raduis)} />
  );
};

export default AssetImage;

const styles = StyleSheet.create({
  image: (width, height, mode, raduis) => ({
    height: height,
    width: width,
    borderRadius: raduis,
    resizeMode: mode,
  }),
});

import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker ,Polyline } from 'react-native-maps';
import { View, Text } from 'react-native'


const Directions = () => {
  // Store data
  const store = {
    id: 1,
    name: "La ferme de Beja",
    description: "cheese shop",
    address: "Avenue Habib Bourguiba, Beja",
    stars: 4,
    reviews: "4.4k",
    phone: "54 955 155",
    coords: {
      latitude: 36.72272793895047,
      longitude: 9.183841154516688,
      title: "La ferme de Beja",
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0221
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: store.coords.latitude,
          longitude: store.coords.longitude,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0221
        }}
      >
        <Marker
          coordinate={{ latitude: store.coords.latitude, longitude: store.coords.longitude }}
          title={store.name}
          description={store.description}
        />
        
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});


export default Directions
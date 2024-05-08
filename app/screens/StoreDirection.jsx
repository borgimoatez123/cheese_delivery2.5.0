import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from "@expo/vector-icons";
import * as Linking from 'expo-linking';
import { Store } from '../constants/uidata';

const StoreDirection = ({ route }) => {
  const { storeName } = route.params;
  const store = Store.find(s => s.name === storeName);

  const openGoogleMaps = () => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q='
    });
    const latLng = `${store.coords.latitude},${store.coords.longitude}`;
    const label = encodeURIComponent(store.name);
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: store.coords.latitude,
          longitude: store.coords.longitude,
          latitudeDelta: store.coords.latitudeDelta,
          longitudeDelta: store.coords.longitudeDelta
        }}
      >
        <Marker
          coordinate={{ latitude: store.coords.latitude, longitude: store.coords.longitude }}
          title={store.name}
          description={store.description}
        />
      </MapView>
      <TouchableOpacity onPress={openGoogleMaps} style={styles.button}>
        <Ionicons name="navigate" size={20} color="white" />
        <Text style={styles.buttonText}>Open in Google Maps</Text>
      </TouchableOpacity>
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
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'royalblue',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    marginLeft: 5
  }
});

export default StoreDirection;

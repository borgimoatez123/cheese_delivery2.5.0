import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/screens/LoginScreen'
import { UserProvider } from'./app/context/UserContext'
import SignupScreen from './app/screens/SignupScreen';
import { UserReversedGeoCode } from './app/context/UserReversedGeoCode';
import { UserLocationContext } from './app/context/UserLocationContext';
import BottomTab from './app/navigation/BottomTab';
import * as Location from 'expo-location';
import InStore from './app/screens/InStore';
import StoreDirection from './app/screens/StoreDirection';
import Search from './app/screens/Search';
import OrdersScreen from './app/screens/OrdersScreen';
import { Provider } from 'react-redux';
import Store from'./store';
const Stack = createNativeStackNavigator();

const App = () => {
  const [location, setLocation] = useState(null);

  const [address, setAddress] = useState(null);

  const [error, setErrorMsg] = useState(null);
  const defaultAddresss = { "city": "Beja", "country": "tunisia", "district": "Pudong", "isoCountryCode": "CN", "name": "33 islaib", "postalCode": "94108", "region": "SH", "street": "Stockton St", "streetNumber": "1", "subregion": "San Francisco County", "timezone": "America/Los_Angeles" }


  useEffect(() => {
    (async () => {
     setAddress(defaultAddresss);

    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      setErrorMsg('Permission to access location as denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location)
    console.log('this ',location)

    })();
  }, [])
  return (
    <Provider store={Store}>
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <UserReversedGeoCode.Provider value={{ address, setAddress }}>
      <UserProvider>

        <NavigationContainer>
   
        <Stack.Navigator initialRouteName="Login">
<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
<Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen
              name='bottom-navigation'
              component={BottomTab}
              options={{ headerShown: false }}
            />
<Stack.Screen name="InStore" component={InStore}  options={{ headerShown: false }}/>
<Stack.Screen name="StoreDirection" component={StoreDirection}  options={{ headerShown: false }}/>
<Stack.Screen name="Search" component={Search}  options={{ headerShown: false }}/>
<Stack.Screen name="OrdersScreen" component={OrdersScreen}  options={{ headerShown: false }}/>


          </Stack.Navigator>
        
        </NavigationContainer>
      
        </UserProvider>
      </UserReversedGeoCode.Provider>
    </UserLocationContext.Provider>
    </Provider>
  );
};

export default App;
/*<Stack.Navigator initialRouteName="Login">
<Stack.Screen name="Login" component={LoginScreen} />*/
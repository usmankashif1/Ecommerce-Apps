import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import AppIntroSliders from '../screens/AppIntroSlider';
import Login from '../screens/Login';
import Accounts from '../screens/Accounts';
import SignUp from '../screens/SignUp';
import Cart from '../screens/Cart';
import BottomNavigation from './BottomNavigation';
import ViewAllProducts from '../screens/ViewAllProducts';
import ProductOverview from '../screens/ProductOverview';
import Notification from '../screens/Notification';
import PersonalDetails from '../screens/PersonalDetails';
import MyFavourites from '../screens/MyFavourites';
import ShippingAddress from '../screens/ShippingAddress';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import FAQs from '../screens/FAQs';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import SelectLanguage from '../screens/SelectLanguage';
import SuccessfulRegistered from '../screens/SuccessfulRegistered';
import PutDeliveryAddress from '../screens/PutDeliveryAddress';
import PaymentSection from '../screens/PaymentSection';
import CardsSelection from '../screens/CardsSelection';
import FilterPage from '../screens/FilterPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();

  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = auth().onAuthStateChanged(user => {
    setUser(user);
    setLoading(false); 
  });

  return () => unsubscribe();
}, []);

if (loading) {
  return <SplashScreen />;
}
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
    {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
    {!user ? (
      <>
        <Stack.Screen name="Accounts" component={Accounts} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="AppIntroSliders" component={AppIntroSliders} />
        <Stack.Screen name="SuccessfulRegistered" component={SuccessfulRegistered} />
      </>
    ) : (
      <>
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="ProductOverview" component={ProductOverview} />
        <Stack.Screen name="ViewAllProducts" component={ViewAllProducts} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
        <Stack.Screen name="MyFavourites" component={MyFavourites} />
        <Stack.Screen name="ShippingAddress" component={ShippingAddress} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
        <Stack.Screen name="PutDeliveryAddress" component={PutDeliveryAddress} />
        <Stack.Screen name="PaymentSection" component={PaymentSection} />
        <Stack.Screen name="CardsSelection" component={CardsSelection} />
        <Stack.Screen name="FilterPage" component={FilterPage} />
      </>
    )}
  </Stack.Navigator>
  
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});

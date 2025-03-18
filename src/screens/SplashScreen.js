import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale } from 'react-native-size-matters';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    clearStorage();
    setTimeout(() => {
            setShowSplash(false);

      getData();
    }, 1500);
  }, []);
  
  const clearStorage = async () => {
    await AsyncStorage.clear(); 
  };
  const getData = async () => {
    const Email = await AsyncStorage.getItem('Getemail');
    if (Email == '' || Email == null || Email == undefined) {
      // navigation.navigate('BottomNavigation');
      navigation.navigate('Accounts');

    } else {
      // navigation.navigate('Accounts');
      navigation.navigate('BottomNavigation');

    }
  };

  return (
    <ImageBackground
      style={styles.splashImg}
      source={require('../assets/images/img.png')}>
      <View style={styles.blackOverlay} />

      <Image
        style={styles.logo}
        source={require('../assets/images/logoF.png')}
      />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splashImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logo: {
    height: scale(120),
    width: scale(200),
  },
});

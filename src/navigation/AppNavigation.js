import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import StackNavigation from './StackNavigation';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
const AppNavigation = () => {
  
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});

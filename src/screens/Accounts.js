import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import newTheme from '../utils/Constants';
import {useNavigation} from '@react-navigation/native';
import Design from '../utils/Design';
import { scale } from 'react-native-size-matters';

const {height,width}=Dimensions.get('window');
export default function Accounts() {
  const navigation = useNavigation();
  return (
    <View style={Design.container}>
      <ImageBackground
        style={styles.BackgroundContainer}
        source={require('../assets/images/img.png')}>
        <View style={styles.blackOverlay} />

        <View style={styles.ButtonView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.ButtonContainer}>
            <Text style={styles.ButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={styles.SignUp}>
            <Text style={styles.SignUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  BackgroundContainer: {
    height: '100%',
    width: '100%',
  },
  ButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    height: height*0.09,
    width: width*0.9,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
  },
  ButtonText: {
    color: 'black',
    fontSize: scale(20),
    fontFamily: newTheme.Extra_Bold,
  },
  SignUp: {
    borderRadius: 30,
    borderWidth: 3,
    height: height*0.09,
    width: width*0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
  SignUpText: {
    color: 'white',
    fontSize: scale(18),
    fontFamily: newTheme.Extra_Bold,
  },
  blackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ButtonView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    bottom: 20,
  },
});

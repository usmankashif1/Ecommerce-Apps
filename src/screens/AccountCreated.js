import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import newTheme from '../utils/Constants';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'

const AccountCreated = () => {
  const navigation=useNavigation();
  return (
    <View style={styles.Container}>
      <View>
        <LottieView
          style={{height: 200, width: 200}}
          autoPlay
          source={require('../assets/lottie/Animation - 1724932675827.json')}
        />
        <Text style={styles.successful}>Successful !</Text>
        <Text style={{color:'#909090'}}>
          Your have Successful registered in{'\n'}     our app and start working in
          it.
        </Text>
      </View>
      <TouchableOpacity style={styles.Button} >
        <AntDesign name='shoppingcart' size={25} color='white' />
        <Text style={styles.ButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountCreated;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  successful: {
    fontSize: 20,
    color: 'black',
    fontFamily: newTheme.Bold,
    alignSelf: 'center',
  },
});

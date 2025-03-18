import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import newTheme from '../utils/Constants';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const SuccessfulRegistered = () => {
    const navigation=useNavigation();
  return (
    <View style={styles.Container}>
      <LottieView autoPlay loop={false}
        style={{height: 350, width: 350}}
        source={require('../assets/lottie/Animation - 1724932675827.json')}
      />
      <View style={{bottom:25,marginBottom: 20}}>
      <View style={{bottom:25, marginBottom: 20}}>
        <View style={{bottom: 25, alignItems: 'center', marginBottom: 25}}>
          <Text style={styles.SuccessfulText}>Successful!</Text>
          <Text style={styles.SubHeading}>
            You have successfully registered in our app start working in it.
          </Text>
        </View>
      </View>
      </View>
      <TouchableOpacity style={styles.Button} onPress={()=>navigation.navigate('BottomNavigation')}>
        <Text style={styles.ButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessfulRegistered;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SuccessfulText: {
    fontFamily: newTheme.Bold,
    fontSize: 20,
    // bottom:20
    color:'black'
  },
  SubHeading: {
    textAlign: 'center',
    padding: 20,
    bottom: 20,
    fontFamily: newTheme.regular,
    color:'#909090'
  },
  Button:{
    backgroundColor:'black',
    height:50,
    width:'80%',
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center'

  },
  ButtonText:{
    color:'white',
    fontFamily:newTheme.Semi_Bold,
    fontSize:17
  }
});

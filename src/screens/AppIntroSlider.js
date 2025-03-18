import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import newTheme from '../utils/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import BottomNavigation from '../navigation/BottomNavigation';

const AppIntroSliders = () => {
  const navigation = useNavigation(); // Get the navigation object

  const slides = [
    {
      img: 'https://cdn.shopify.com/s/files/1/2337/7003/products/2f70e1d5a6efdaddeae9b52549f3a340.jpg?v=1703511902&width=450',
      title: '20% Discount\non New Arrival Products',
      description:
        'Publish up your selfies to make yourself\nmore beautiful with this app.',
    },
    {
      img: 'https://glamandgracepk.netlify.app/img/s_p_1%20(1).png',
      title: 'Take Advantage\nof The Offer Shopping',
      description:
        'Publish up your selfies to make yourself\nmore beautiful with this app.',
    },
    {
      img: 'https://glamandgracepk.netlify.app/img/p4%20(3).png',
      title: 'All Types Offers\nWithin Your Rearch',
      description:
        'Publish up your selfies to make yourself\nmore beautiful with this app.',
    },
  ];

  return (
    <AppIntroSlider
    activeDotStyle={{width:40,height:10,backgroundColor:'black'}}
      renderNextButton={() => (
        <View
          style={{
            backgroundColor: 'black',
            borderWidth: 1,
            height: 50,
            width: 50,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons name="caret-forward" size={25} color="white" />
        </View>
      )}
      renderDoneButton={() => (
        <View 
          style={{
            backgroundColor: 'black',
            borderWidth: 1,
            height: 50,
            width: 50,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons  name="caret-forward" size={25} color="white" />
        </View>
      )}
      onDone={() => navigation.navigate('SuccessfulRegistered')} 
      data={slides}
      renderItem={({item}) => (
        <View style={styles.Container}>
          <Image style={styles.images} source={{uri: item.img}} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      )}
    />
  );
};

export default AppIntroSliders;

const styles = StyleSheet.create({
  Container: {
    backgroundColor:'white',
    flex:1
  },
  images: {
    height: '60%',
    width: '80%',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop:20
  },
  title: {
    fontSize: 27,
    fontFamily: newTheme.Extra_Bold,
    color: 'black',
    marginLeft: 20,
    marginTop:5,
    padding:10
  },
  description: {
    fontSize: 17,
    marginLeft: 20,
    color:newTheme.secondary,
    
    
  },
});

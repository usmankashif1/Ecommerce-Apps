import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import newTheme from '../utils/Constants';
import CustomInputs from '../components/CustomInputs';
import DiscountCards from './DiscountCards';
import ProductsPage from './ProductsPage';
import {useNavigation} from '@react-navigation/native';
import PopularProducts from './PopularProducts';
import WinterCollection from './WinterCollection';
import SummerCollection from './SummerCollection';
import Design from '../utils/Design';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {scale} from 'react-native-size-matters';

const Home = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.Container}>
      <View style={styles.topbar}>
        <TouchableOpacity>
          <Ionicons
            name="reorder-three"
            size={responsiveHeight(4.2)}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <FontAwesome5
            name="user-alt"
            size={responsiveHeight(3.4)}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.welcome}>Welcome,</Text>
      <Text
        style={[
          Design.heading,
          {color: newTheme.secondary, marginLeft: 20, bottom: 5},
        ]}>
        Our Fashion App
      </Text>
      <View style={styles.SearchFilter}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewAllProducts')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 17,
            height: '75%',
            width: '70%',
            backgroundColor: '#d5d9dd',
            borderRadius: 50,
          }}>
          <Feather name="search" color="black" size={28} />

          <Text
            style={[
              Design.heading,
              {
                fontSize: scale(17),
                fontFamily: newTheme.Semi_Bold,
                left: 6,
                top: 1,
              },
            ]}>
            Search Your Product
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filter}
          onPress={() => navigation.navigate('FilterPage')}>
          <AntDesign name="filter" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <DiscountCards />
      <View style={styles.TitleVIewAll}>
        <Text
          style={{
            fontFamily: newTheme.Bold,
            color: 'black',
            fontSize: 19,
            marginLeft: 20,
          }}>
          New Arrivals
        </Text>
        <Text
          style={{
            fontFamily: newTheme.Semi_Bold,
            marginRight: 20,
            color: '#909090',
          }}
          onPress={() => navigation.navigate('ViewAllProducts')}>
          View All
        </Text>
      </View>
      <ProductsPage />
      <View style={styles.TitleVIewAll}>
        <Text style={styles.Heading}>Popular Products</Text>
        <Text
          style={{
            fontFamily: newTheme.Semi_Bold,
            marginRight: 20,
            color: '#909090',
          }}
          onPress={() => navigation.navigate('ViewAllProducts')}>
          View All
        </Text>
      </View>

      <PopularProducts />
      <View style={styles.TitleVIewAll}>
        <Text style={[styles.Heading, {marginTop: 10}]}>Winter Collection</Text>
        <Text
          style={{
            fontFamily: newTheme.Semi_Bold,
            marginRight: 20,
            color: '#909090',
          }}
          onPress={() => navigation.navigate('ViewAllProducts')}>
          View All
        </Text>
      </View>
      <WinterCollection />
      <View style={styles.TitleVIewAll}>
        <Text style={[styles.Heading, {marginTop: 10}]}>Summer Collection</Text>
        <Text
          style={{
            fontFamily: newTheme.Semi_Bold,
            marginRight: 20,
            color: '#909090',
          }}
          onPress={() => navigation.navigate('ViewAllProducts')}>
          View All
        </Text>
      </View>
      <SummerCollection />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  filter: {
    height: 57,
    width: 57,
    backgroundColor: 'black',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  SearchFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  Heading: {
    fontFamily: newTheme.Bold,
    fontSize: 20,
    color: 'black',
    marginLeft: 20,
  },
  TitleVIewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  welcome: {
    fontSize: responsiveFontSize(2.8),
    color: 'black',
    fontFamily: newTheme.Bold,
    marginTop: 10,
    marginLeft: 20,
    top: 5,
  },
});

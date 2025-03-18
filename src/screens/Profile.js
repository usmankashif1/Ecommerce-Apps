import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import newTheme from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Design from '../utils/Design';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  const navigation = useNavigation();
  // const route = useRoute();

  const [imagePath, setImagePath] = useState('');
  const [getname, setgetName] = useState('');
  const [getemail, setgetEmail] = useState('');

  useFocusEffect(
    useCallback(() => {
      const getImage = async () => {
        const imageUrl = await AsyncStorage.getItem('profileImageUri');
        const Iname = await AsyncStorage.getItem('Getname');
        const Iemail = await AsyncStorage.getItem('Getemail');
        setgetEmail(Iemail);
        setgetName(Iname);
        setImagePath(imageUrl);
      };
      getImage();
    }, []),
  );

  const logout = async () => {
    // await AsyncStorage.removeItem('Getemail');

    auth()
      .signOut()
      .then(() => navigation.navigate('Accounts'));
  };

  const data = [
    {
      id: '1',
      iconFamily: 'FontAwesome',
      iconName: 'user',
      color: 'black',
      title: 'Personal Details',
      screen: 'PersonalDetails',
    },
    {
      id: '2',
      iconFamily: 'AntDesign',
      iconName: 'heart',
      color: 'black',
      title: 'My Favourites',
      screen: 'MyFavourites',
    },
    {
      id: '3',
      iconFamily: 'MaterialIcons',
      iconName: 'local-shipping',
      color: 'black',
      title: 'Shipping Address',
      screen: 'ShippingAddress',
    },
    {
      id: '4',
      iconFamily: 'Ionicons',
      iconName: 'settings-sharp',
      color: 'black',
      title: 'Settings',
      screen: 'Settings',
    },
    {
      id: '5',
      iconFamily: 'MaterialIcons',
      iconName: 'security',
      color: 'black',
      title: 'Privacy Policy',
      screen: 'PrivacyPolicy',
    },
    {
      id: '6',
      iconFamily: 'MaterialIcons',
      iconName: 'info',
      color: 'black',
      title: 'FAQS',
      screen: 'FAQs',
    },
  ];

  const renderItem = ({item}) => {
    let IconComponent;

    switch (item.iconFamily) {
      case 'Ionicons':
        IconComponent = Ionicons;
        break;
      case 'Entypo':
        IconComponent = Entypo;
        break;
      case 'MaterialCommunityIcons':
        IconComponent = MaterialCommunityIcons;
        break;
      case 'AntDesign':
        IconComponent = AntDesign;
        break;
      case 'FontAwesome':
        IconComponent = FontAwesome;
        break;
      case 'MaterialIcons':
        IconComponent = MaterialIcons;
        break;
      default:
        IconComponent = Ionicons;
    }

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate(item.screen)}>
        <View
          style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
          <View
            style={{
              marginLeft: 20,
              height: 40,
              width: 40,
              backgroundColor: '#eeeeee',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <IconComponent name={item.iconName} size={23} color={item.color} />
          </View>
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
        <MaterialIcons
          name="navigate-next"
          size={27}
          color="black"
          style={styles.NextIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={Design.container}>
      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => navigation.navigate('Home')}>
        <Ionicons name="caret-back-circle-sharp" size={40} color="black" />
      </TouchableOpacity>
      <View style={styles.profileInfoContainer}>
        <Image
          style={styles.profileIMG}
          source={
            imagePath
              ? {uri: imagePath}
              : require('../assets/images/userIcon.jpg')
          }
        />
        <View style={{}}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: newTheme.Bold,
              color: 'black',
              right: 10,
            }}>
            {getname}
          </Text>
          <Text
            style={{fontFamily: newTheme.regular, color: 'black', right: 10}}>
            {getemail}
          </Text>
        </View>
      </View>
      <View style={styles.secondContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuIcon: {
    marginTop: 13,
    marginLeft: 10,
    overflow: 'hidden',
    width: 40,
    height: 40,
  },
  profileInfoContainer: {
    height: 100,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIMG: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginHorizontal: 15,
    right: 5,
  },
  secondContainer: {
    height: 380,
    width: '85%',
    borderWidth: 2,
    borderColor: '#eeeeee',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    top: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    marginLeft: 20,
    color: 'black',
  },
  NextIcon: {
    marginTop: 12,
    marginRight: 10,
  },
  logout: {
    color: 'red',
    fontFamily: newTheme.Semi_Bold,
    fontSize: 15,
    left: 22,
    bottom: 10,
  },
});

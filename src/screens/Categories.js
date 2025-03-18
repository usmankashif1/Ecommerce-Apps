import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import newTheme from '../utils/Constants';

const Categories = () => {
  const data = [
    {
      id: '1',
      iconFamily: 'AntDesign',
      iconName: 'shoppingcart',
      color: 'white',
      title: 'New Arrivals',
      productNumber: '334 Product',
    },
    {
      id: '2',
      iconFamily: 'Ionicons',
      iconName: 'shirt',
      color: 'white',
      title: 'Summer Collection',
      productNumber: '324 Product',
    },
    {
      id: '3',
      iconFamily: 'Entypo',
      iconName: 'shopping-bag',
      color: 'white',
      title: 'Winter Collection',
      productNumber: '434 Product',
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
      <View style={styles.itemContainer}>
        <IconComponent style={{marginLeft:20}} name={item.iconName} size={45} color={item.color} />
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.productNumber}>{item.productNumber}</Text>
      </View>
    );
  };

  return (
    <View style={styles.Container}>
      <View style={styles.topBar}>
        <View style={styles.backButton}>
          <Ionicons name="caret-back" size={25} color="white" />
        </View>
        <AntDesign name="search1" size={30} color="black" />
      </View>
      <Text style={styles.CategoriesText}>Categories</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    height: 40,
    width: 40,
    backgroundColor: 'black',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 20,
  },
  CategoriesText: {
    fontSize: 25,
    color: 'black',
    fontFamily: newTheme.Semi_Bold,
    marginTop: 20,
    marginLeft: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: 'black',
    height: 70,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 40,
    alignItems:'center',
  },
  itemText:{
    color:'white',
    fontSize:20,
    fontFamily:newTheme.regular
  },
  productNumber:{
    color:'white',
    fontSize:13,
    fontFamily:newTheme.regular,
    marginRight:20
  }
});

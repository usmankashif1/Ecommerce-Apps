import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import newTheme from '../utils/Constants';

const ViewAllProducts = ({route}) => {
  const {Filters = {}} = route.params || {};
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + '...'
      : title;
  };

  useEffect(() => {
    fetchProducts(Filters);
  }, [Filters]);

  const fetchProducts = async Filters => {
    const response = await fetch('https://fakestoreapi.com/products');
    const jsondata = await response.json();

    let filteredProducts = jsondata;

    if (Filters.category) {
      filteredProducts = filteredProducts.filter(
        product => product.category === Filters.category,
      );
    }

    if (Filters.priceRange) {
      filteredProducts = filteredProducts.filter(
        product =>
          product.price >= Filters.priceRange[0] &&
          product.price <= Filters.priceRange[1],
      );
    }

    if (Filters.rating) {
      filteredProducts = filteredProducts.filter(
        product => product.rating >= Filters.rating,
      );
    }

    if (Filters.sort === 'price-asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (Filters.sort === 'price-desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (Filters.sort === 'rating') {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    setData(filteredProducts);
    setFilteredData(filteredProducts);
  };

  const filterBySearchTerm = () => {
    if (searchTerm === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    filterBySearchTerm();
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{left: 10, top: 10}}
        onPress={() => navigation.goBack()}>
        <Ionicons name="caret-back-circle-sharp" color="black" size={40} />
      </TouchableOpacity>
      <View style={styles.searchBox}>
        <EvilIcons style={{bottom: 3}} name="search" size={30} color="black" />
        <TextInput
          placeholder="Search any Product"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
          placeholderTextColor={newTheme.secondary}
        />
      </View>
      {filteredData.length === 0 ? (
        <Text style={styles.noProducts}>No products found</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredData}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductOverview', {product: item})
              }
              style={styles.itemContainer}>
              <Image source={{uri: item.image}} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>
                  {truncateTitle(item.title, 25)}
                </Text>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <View style={styles.starRatingContainer}>
                  <Image
                    style={styles.star}
                    source={require('../assets/images/star.png')}
                  />
                  <Text style={styles.count}>({item.rating.count})</Text>
                </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  menuIcon: {
    top: 6,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    margin: 15,
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 17,
    color:'black',
  },
  noProducts: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    marginTop: 20,
  },
  itemContainer: {
    height: 270,
    width: 180,
    margin: 10,
    backgroundColor: 'white',
    marginHorizontal: 7,
    borderRadius: 10,
  },
  itemImage: {
    height: 135,
    width: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
    right: 5,
    marginTop: 20,
  },
  itemDetails: {
    marginLeft: 10,
    marginTop: 10,
  },
  itemTitle: {
    fontSize: 15,
    color: 'black',
    fontFamily: newTheme.regular,
    padding: 10,
    marginRight: 10,
  },
  itemPrice: {
    color: 'black',
    fontSize: 15,
    fontFamily: newTheme.Bold,
  },
  itemDiscount: {
    flexDirection: 'row',
    marginTop: 5,
  },
  itemActualPrice: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  itemOffPrice: {
    marginLeft: 10,
    color: '#FE735C',
  },
  likeButtonContainer: {
    height: 28,
    width: 28,
    borderRadius: 30,
    backgroundColor: 'black',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    top: 8,
    right: 7,
  },
  star: {
    height: 25,
    width: 25,
    bottom: 2,
  },
  count: {
    fontFamily: newTheme.Semi_Bold,
    color: 'black',
    
  },
  starRatingContainer: {
    flexDirection: 'row',
    marginLeft:5
  },
});

export default ViewAllProducts;

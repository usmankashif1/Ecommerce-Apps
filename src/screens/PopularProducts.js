import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import newTheme from '../utils/Constants';

const PopularProducts = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [likedItems, setLikedItems] = useState({});

  useEffect(() => {
    productsAPIS();
    getLikedItems();
  }, []);

  const productsAPIS = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const jsondata = await response.json();
    const filteredData = jsondata.filter(item => item.rating.count > 300);
    setData(filteredData.slice(0, 3));
  };

  const getLikedItems = async () => {
    try {
      const likedProducts = await AsyncStorage.getItem('likedProducts');
      if (likedProducts) {
        const likedArray = JSON.parse(likedProducts);
        const likedMap = likedArray.reduce((acc, item) => {
          acc[item.id] = true;
          return acc;
        }, {});
        setLikedItems(likedMap);
      }
    } catch (error) {
      console.log('Error retrieving liked products', error);
    }
  };

  const toggleLike = async item => {
    const itemId = item.id;
    const updatedLikedItems = {...likedItems, [itemId]: !likedItems[itemId]};
    setLikedItems(updatedLikedItems);

    try {
      const likedProducts = await AsyncStorage.getItem('likedProducts');
      let likedArray = likedProducts ? JSON.parse(likedProducts) : [];

      if (updatedLikedItems[itemId]) {
        if (!likedArray.find(product => product.id === itemId)) {
          likedArray.push(item);
        }
      } else {
        likedArray = likedArray.filter(product => product.id !== itemId);
      }

      await AsyncStorage.setItem('likedProducts', JSON.stringify(likedArray));
    } catch (error) {
      console.log('Error storing liked product', error);
    }
  };

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + '...'
      : title;
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
              navigation.navigate('ProductOverview', {product: item})
            }>
            <Image source={{uri: item.image}} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.name}>{truncateTitle(item.title, 18)}</Text>
              <View style={styles.starRatingContainer}>
                <Image
                  style={styles.star}
                  source={require('../assets/images/star.png')}
                />
                <Text style={styles.count}>({item.rating.count})</Text>
              </View>
            </View>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    height: 80,
    width: '90%',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  itemImage: {
    height: 70,
    width: '30%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  itemDetails: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    color: 'black',
    fontFamily: newTheme.Semi_Bold,
  },
  itemPrice: {
    color: 'black',
    fontSize: 15,
    fontFamily: newTheme.Bold,
    marginTop: 20,
    top: 10,
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
    alignSelf: 'flex-start',
    marginTop: 7,
    alignItems: 'center',
  },
});

export default PopularProducts;

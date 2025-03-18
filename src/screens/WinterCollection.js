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
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import newTheme from '../utils/Constants';

const WinterCollection = () => {
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
    setData(jsondata);
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
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
              navigation.navigate('ProductOverview', {product: item})
            }>
            <TouchableOpacity
              style={styles.likeButtonContainer}
              onPress={() => toggleLike(item)}>
              {likedItems[item.id] ? (
                <AntDesign style={{}} name="heart" color="red" size={16} />
              ) : (
                <AntDesign style={{}} name="hearto" color="white" size={16} />
              )}
            </TouchableOpacity>
            <Image source={{uri: item.image}} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.name}>{truncateTitle(item.title, 20)}</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    height: 220,
    width: 170,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
  },
  itemImage: {
    height: 150,
    width: '85%',
    resizeMode: 'contain',
    bottom: 20,
  },
  itemDetails: {
    alignItems: 'center',
    overflow: 'hidden',
    bottom: 10,
  },
  name: {
    fontSize: 15,
    color: 'black',
  },
  itemPrice: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  likeButtonContainer: {
    height: 28,
    width: 28,
    borderRadius: 30,
    backgroundColor: 'black',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    height: 25,
    width: 25,
  },
  count: {
    fontFamily: newTheme.Semi_Bold,
    color: 'black',
    top:3
  },
  starRatingContainer: {
    flexDirection: 'row',
    alignItems:'center',
    marginLeft:3
  },
});

export default WinterCollection;

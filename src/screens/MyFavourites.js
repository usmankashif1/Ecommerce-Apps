import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import newTheme from '../utils/Constants';
import CustomInputs from '../components/CustomInputs';

const MyFavourites = () => {
  const navigation = useNavigation();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getWishlistItems();
  }, []);

  const getWishlistItems = async () => {
    try {
      const likedProducts = await AsyncStorage.getItem('likedProducts');
      if (likedProducts !== null) {
        setWishlistItems(JSON.parse(likedProducts));
      }
    } catch (error) {
      console.log('Error retrieving liked products', error);
    }
  };

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };

  const removeItem = async (index) => {
    const newWishlistItems = wishlistItems.filter((_, i) => i !== index);
    setWishlistItems(newWishlistItems);
    try {
      await AsyncStorage.setItem('likedProducts', JSON.stringify(newWishlistItems));
    } catch (error) {
      console.error('Error saving updated wishlist:', error);
    }
  };

  const filteredProducts = wishlistItems.filter(wishlistItem =>
    wishlistItem.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ left: 10, top: 10 }}
        onPress={() => navigation.goBack()}>
        <Ionicons name="caret-back-circle-sharp" size={40} color="black" />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <CustomInputs
          iconFamily={'AntDesign'}
          name={'search1'}
          backgroundcolor={newTheme.gray}
          iconColor={'black'}
          placeholder={'Search...'}
          bordercolor={'#38bccf'}
          flex={1}
          hbox={50}
          fontSize={17}
          radius={30}
          borderRadius={30}
          width={'90%'}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          placeholderTextColor={newTheme.secondary}
        />
        </View>
      {filteredProducts.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18, color: 'black'}}>No favourites yet!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.ItemContainer} onPress={() => navigation.navigate('ProductOverview', { product: item })}>
              <Image
                style={{ height: 85, width: 85, resizeMode: 'contain', marginLeft: 10 }}
                source={{ uri: item.image }}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.productTitle}>
                  {truncateTitle(item.title, 30)}
                </Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(index)}>
                <Entypo name='circle-with-cross' size={20} color='black'/>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  ItemContainer: {
    height: 110,
    width: '92%',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 13,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10
  },
  productTitle: {
    fontSize: 14,
    fontFamily: newTheme.Bold,
    color: 'black',
  },
  productSubtitle: {
    fontFamily: newTheme.regular,
  },
  productPrice: {
    fontSize: 15,
    fontFamily: newTheme.Bold,
    color: 'black',
  },
  searchContainer: {
    alignItems: 'center'
  },
  removeButton: {
    marginRight: 5,
    bottom: 25,
    marginBottom: 25,
  },
});

export default MyFavourites;

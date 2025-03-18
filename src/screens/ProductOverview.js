import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import newTheme from '../utils/Constants';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const ProductOverview = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const route = useRoute();
  const {product} = route.params;
  const navigation = useNavigation();

  const handleColorPress = color => setSelectedColor(color);
  const handleSizePress = size => setSelectedSize(size);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const saveCartItem = async () => {
    try {
      const existingItems = await AsyncStorage.getItem('cartItems');
      const cartItems = existingItems ? JSON.parse(existingItems) : [];

      const existingItemIndex = cartItems.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize,
      );

      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        cartItems.push({...product, quantity, selectedSize, selectedColor});
      }

      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      navigation.navigate('Cart');
    } catch (error) {
      console.error('Error saving cart item:', error);
    }
  };

  return (
    <ScrollView style={styles.Container}>
      <AppIntroSlider
        data={[{img: {uri: product.image}}]}
        showDoneButton={false}
        showNextButton={false}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              style={{left: 10, top: 10}}
              onPress={() => navigation.goBack()}>
              <Ionicons
                name="caret-back-circle-sharp"
                color="black"
                size={40}
              />
            </TouchableOpacity>
            <Image style={styles.ProductImg} source={{uri: product.image}} />
          </View>
        )}
      />
      <View style={styles.LowerView}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{product.title}</Text>
            <Text style={styles.subtitle}>Roller Rabbit Vado Odelle Dress</Text>
          </View>
          <Text style={styles.stockText}>Available in Stock</Text>
          <View style={styles.stockContainer}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decreaseQuantity}>
                <Text style={styles.quantityControl}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity}>
                <Text style={styles.quantityControl}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.reviewsContainer}>
              <Stars
                default={5}
                count={5}
                half={true}
                starSize={50}
                fullStar={
                  <Icon
                    name={'star'}
                    color="yellow"
                    style={styles.myStarStyle}
                  />
                }
                emptyStar={
                  <Icon
                    name={'star-outline'}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                  />
                }
                halfStar={
                  <Icon name={'star-half'} style={styles.myStarStyle} />
                }
              />
              <Text style={styles.reviewsText}>(237 Reviews)</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sizeTitle}>Size</Text>
        <View style={styles.sizesContainer}>
          <View>
          <FlatList
            horizontal
            data={[
              {size: 'S'},
              {size: 'M'},
              {size: 'L'},
              {size: 'XL'},
              {size: 'XXL'},
            ]}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.sizes,
                  selectedSize === item.size && styles.selectedSize,
                ]}
                onPress={() => handleSizePress(item.size)}>
                <Text
                  style={[
                    styles.sizesText,
                    selectedSize === item.size && styles.selectedSizeText,
                  ]}>
                  {item.size}
                </Text>
              </TouchableOpacity>
            )}
          />
          </View>

          <View style={styles.colorContainer}>
            <TouchableOpacity
              style={[styles.colors]}
              onPress={() => handleColorPress('black')}>
              {selectedColor === 'black' && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Ionicons name="checkmark" size={20} color="white" />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.colors, {backgroundColor: '#CADCA7'}]}
              onPress={() => handleColorPress('#CADCA7')}>
              {selectedColor === '#CADCA7' && (
                <View style={styles.iconContainer}>
                  <Ionicons name="checkmark" size={20} color="white" />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.colors, {backgroundColor: '#F79F1F'}]}
              onPress={() => handleColorPress('#F79F1F')}>
              {selectedColor === '#F79F1F' && (
                <View style={styles.iconContainer}>
                  <Ionicons name="checkmark" size={20} color="white" />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.colors, {backgroundColor: 'white'}]}
              onPress={() => handleColorPress('white')}>
              {selectedColor === 'white' && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Ionicons name="checkmark" size={20} color="black" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.totalPrice}>
            Total Price{'\n'}
            <Text style={styles.priceValue}>${product.price}</Text>
          </Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={saveCartItem}>
            <Icon name="purse" color="white" size={20} />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductOverview;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ProductImg: {
    height: 250,
    width: 350,
    alignSelf: 'center',
    resizeMode: 'contain',
    bottom:10
  },
  LowerView: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    width: '100%',
    height:'80%',
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  name: {
    fontSize: 18,
    color: 'black',
    fontFamily: newTheme.Semi_Bold,
  },
  subtitle: {
    fontFamily: newTheme.regular,
    color: newTheme.secondary,
    marginTop: 5,
  },

  quantityText: {
    marginHorizontal: 15,
    fontSize: 20,
  },
  stockContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  reviewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    
  },
  reviewsText: {
    marginLeft: 5,
    fontSize: 15,
    fontFamily: newTheme.regular,
    color: 'black',
    top:2
  },
  stockText: {
    fontSize: 15,
    fontFamily: newTheme.regular,
    color: 'black',
  },
  sizeTitle: {
    fontSize: 20,
    fontFamily: newTheme.Bold,
    marginTop: 10,
    color:'black'
  },
  sizesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    
  },
  sizes: {
    backgroundColor: 'white',
    borderWidth: 1,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sizesText: {
    fontSize: 18,
    fontFamily: newTheme.regular,
    color: 'black',
  },
  selectedSize: {
    backgroundColor: 'black',
  },
  selectedSizeText: {
    color: 'white',
  },
  colorContainer: {
    height: 145,
    width: 42,
    backgroundColor: 'white',
    borderRadius: 30,
    bottom: 45,
    marginHorizontal: 20,
    elevation: 4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    
    
  },
  myStarStyle: {
    color: '#ffab07',
    backgroundColor: 'transparent',
    fontSize: 20,
  },
  myEmptyStarStyle: {
    color: 'white',
    fontSize: 20,
  },
  colors: {
    height: 28,
    width: 28,
    borderRadius: 20,
    backgroundColor: 'black',
    elevation: 3,
  },
  descriptionContainer: {
    bottom: 40,
  },
  descriptionTitle: {
    fontSize: 20,
    color: 'black',
    fontFamily: newTheme.Semi_Bold,
  },
  descriptionText: {
    fontFamily: newTheme.regular,
    color: 'black',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalPrice: {
    fontFamily: newTheme.regular,
    color:'black'
  },
  priceValue: {
    fontFamily: newTheme.Bold,
    fontSize: 18,
    color: 'black',
    
  },
  addToCartButton: {
    backgroundColor: 'black',
    height: 50,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 30,
    flexDirection: 'row',
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontFamily: newTheme.Semi_Bold,
  },
  quantityContainer: {
    flexDirection: 'row',
    height: 40,
    width: 90,
    backgroundColor: '#eeeeee',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 20,
    color: 'black',
    fontFamily: newTheme.regular,
  },
  quantityControl: {
    fontSize: 20,
    fontFamily: newTheme.regular,
    color: 'black',
  },
});

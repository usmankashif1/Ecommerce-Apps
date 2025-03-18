import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import newTheme from '../utils/Constants';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PutDeliveryAddress from './PutDeliveryAddress';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('cartItems');
        if (storedItems) {
          setCartItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const saveCartItems = async (items) => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart items:', error);
    }
  };

  const truncateTitle = (title, maxLength) => {
    if (title?.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };

  const increaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    setCartItems(newCartItems);
    saveCartItems(newCartItems);
  };

  const decreaseQuantity = (index) => {
    if (cartItems[index].quantity > 1) {
      const newCartItems = [...cartItems];
      newCartItems[index].quantity -= 1;
      setCartItems(newCartItems);
      saveCartItems(newCartItems);
    }
  };

  const removeItem = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
    saveCartItems(newCartItems);
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateShippingCost = () => {
    return (cartItems.length * 5).toFixed(2); // $5 per item
  };

  const calculateTotalPrice = () => {
    return (parseFloat(calculateSubtotal()) + parseFloat(calculateShippingCost())).toFixed(2);
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={{ left: 10, top: 10,height:40,width:40 }}
        onPress={() => navigation.navigate('Home')}>
        <Ionicons name="caret-back-circle-sharp" color="black" size={40} />
      </TouchableOpacity>
      <Text style={styles.title}>My Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.ItemContainer} onPress={() => navigation.navigate('ProductOverview', { product: item })}>
            <Image
              style={{ height: 70, width: 70, resizeMode: 'contain',marginLeft:10 }}
              source={{ uri: item.image }}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.productTitle}>
                {truncateTitle(item.title, 30)}
              </Text>
              <Text style={styles.productSubtitle}>Vado Odelle Dress</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => decreaseQuantity(index)}>
                <Text style={styles.quantityControl}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => increaseQuantity(index)}>
                <Text style={styles.quantityControl}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeItem(index)}>
              <Entypo name='circle-with-cross' size={20} color='black'/>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalItems}>
          Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}{' '}
          Items): ${calculateSubtotal()}
        </Text>
        <Text style={styles.totalItems}>
          Shipping Cost: ${calculateShippingCost()}
        </Text>
        <Text style={styles.totalPrice}>Total: ${calculateTotalPrice()}</Text>
      </View>
      <TouchableOpacity style={styles.proceedButton} onPress={()=>navigation.navigate('PutDeliveryAddress')}>
        <Text style={styles.proceedText}>Proceed to Checkout</Text>
        <AntDesign size={30} color="white" name="rightcircle" />
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontFamily: newTheme.Bold,
    marginTop: 20,
    marginLeft: 20,
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
    
  },
  productTitle: {
    fontSize: 14,
    fontFamily: newTheme.Bold,
    color: 'black',
  },
  productSubtitle: {
    fontFamily: newTheme.regular,
    color:'black'
  },
  productPrice: {
    fontSize: 15,
    fontFamily: newTheme.Bold,
    color: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    height: 32,
    width: 75,
    backgroundColor: '#eeeeee',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,

  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 18,
    color: 'black',
    fontFamily: newTheme.regular,
  },
  quantityControl: {
    fontSize: 20,
    fontFamily: newTheme.regular,
    color: 'black',
  },
  removeButton: {
    marginRight: 5,
    bottom:25,
    marginBottom:25,
    
  },
  
  totalContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignItems:'center'
  },
  totalItems: {
    fontSize: 14,
    fontFamily: newTheme.regular,
    color: 'black',
  },
  totalPrice: {
    fontFamily: newTheme.Semi_Bold,
    color: 'black',
    fontSize: 18,
  },
  proceedButton: {
    height: 45,
    width: '65%',
    backgroundColor: 'black',
    alignSelf: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    bottom:7
  },
  proceedText: {
    color: 'white',
    fontSize: 17,
    fontFamily: newTheme.Semi_Bold,
    left:5
  },
});

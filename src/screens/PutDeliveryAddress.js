import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import newTheme from '../utils/Constants';

const PutDeliveryAddress = () => {
  const [deliveryData, setDeliveryData] = useState({
    street: '',
    city: '',
    state: '',
    phoneno: '',
    zipcode: '',
    country: '',
  });

  const navigation = useNavigation();

  const saveDeliveryData = async () => {
    try {
      await AsyncStorage.setItem('GetDeliveryData', JSON.stringify(deliveryData));
      console.log('Delivery data saved successfully');
    } catch (error) {
      console.error('Failed to save delivery data:', error);
    }
  };

  const handleChange = (field, value) => {
    setDeliveryData(prevData => ({ ...prevData, [field]: value }));
  };

  const inputFields = [
    { id: '1', label: 'Street', key: 'street' },
    { id: '2', label: 'City', key: 'city' },
    { id: '3', label: 'State', key: 'state' },
    { id: '4', label: 'Phone No.', key: 'phoneno' },
    { id: '5', label: 'Zip Code', key: 'zipcode' },
    { id: '6', label: 'Country', key: 'country' },
  ];
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Cart')}>
        <Ionicons name="caret-back-circle-sharp" color="black" size={40} />
      </TouchableOpacity>
      <Text style={styles.heading}>Delivery Address</Text>
      <FlatList
        data={inputFields}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{item.label}</Text>
            <TextInput
              style={styles.textInput}
              placeholder={`Enter ${item.label}`}
              placeholderTextColor={newTheme.secondary}
              value={deliveryData[item.key]}
              onChangeText={text => handleChange(item.key, text)}
            />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await saveDeliveryData();
          navigation.navigate('CardsSelection');
        }}
      >
        <AntDesign name="shoppingcart" size={25} color="white" />
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  backButton: {
    marginLeft: 1,
    height: 40,
    width: 40,
    marginBottom: 7,
  },
  heading: {
    fontFamily: newTheme.Bold,
    fontSize: 20,
    color: 'black',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 100,
    fontFamily: newTheme.Semi_Bold,
    marginTop: 15,
    color: 'black',
  },
  textInput: {
    width: '75%',
    height: 45,
    backgroundColor: '#eaeaea',
    marginTop: 20,
    borderRadius: 10,
    color: 'black',
    fontSize: 16,
    fontFamily: newTheme.regular,
    paddingLeft: 20,
    
  },
  button: {
    backgroundColor: 'black',
    height: 50,
    width: '90%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontFamily: newTheme.Semi_Bold,
    fontSize: 17,
    marginLeft: 10,
  },
});

export default PutDeliveryAddress;

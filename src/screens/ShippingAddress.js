import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import newTheme from '../utils/Constants';

const ShippingAddress = () => {
  const navigation = useNavigation();
  const [deliveryData, setDeliveryData] = useState({});

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const data = await AsyncStorage.getItem('GetDeliveryData');
        if (data) {
          setDeliveryData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error fetching delivery data:', error);
      }
    };

    fetchDeliveryData();
  }, []);

  const renderDetail = (label, value) =>
    value ? (
      <View style={styles.detailContainer}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    ) : (
      <Text style={styles.text}>No delivery address yet.</Text>
    );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="caret-back-circle-sharp" color="black" size={40} />
      </TouchableOpacity>
      <Text style={styles.heading}>Delivery Address</Text>
      {Object.keys(deliveryData).length > 0 ? (
        <View style={styles.detailsContainer}>
          {renderDetail('Street', deliveryData.street)}
          {renderDetail('City', deliveryData.city)}
          {renderDetail('State', deliveryData.state)}
          {renderDetail('Phone No.', deliveryData.phoneno)}
          {renderDetail('Zip Code', deliveryData.zipcode)}
          {renderDetail('Country', deliveryData.country)}
        </View>
      ) : (
        <Text style={styles.text}>No Address Found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  backButton: {
    height: 40,
    width: 40,
  },
  detailsContainer: {
    marginTop: 20,
    height: '50%',
    width: '957',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    padding: 15,
    borderRadius: 15,
    elevation: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    width: '40%',
  },
  value: {
    fontSize: 18,
    width: '60%',
    color: 'black',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  heading: {
    fontFamily: newTheme.Bold,
    color: 'black',
    marginTop: 20,
    fontSize: 20,
  },
});

export default ShippingAddress;

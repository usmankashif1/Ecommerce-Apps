import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import newTheme from '../utils/Constants';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Design from '../utils/Design';

const PaymentSection = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const inputFields = [
    {id: '1', placeholder: 'Card Number'},
    {id: '2', placeholder: 'Exp Date'},
    {id: '3', placeholder: 'CVV'},
  ];

  return (
    <View style={[Design.container,{padding:20}]}>
      <Modal visible={visible} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <LottieView
              autoPlay
              loop={false}
              style={styles.lottieAnimation}
              source={require('../assets/lottie/Animation - 1724932675827.json')}
            />

            <Text style={[Design.heading, styles.successText]}>
              Successful!
            </Text>
            <Text style={[Design.subHeading,{color:newTheme.secondary,textAlign:'center',bottom:20}]}>
              You have Successfully Sent{'\n'} the Payment!
            </Text>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.continueButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('PutDeliveryAddress')}>
        <Ionicons name="caret-back-circle-sharp" color="black" size={40} />
      </TouchableOpacity>

      <Text style={Design.heading}>Payment</Text>
      <Image
        style={styles.cardImage}
        source={{
          uri: 'https://www.visa.co.in/dam/VCOM/regional/ap/india/global-elements/images/in-visa-platinum-card-498x280.png',
        }}
      />
      <Text style={[Design.heading, styles.cardDetailsText]}>Card Details</Text>

      <FlatList
        data={inputFields}
        renderItem={({item}) => (
          <TextInput style={styles.TextInput} placeholder={item.placeholder} placeholderTextColor={newTheme.secondary} />
        )}
      />

      <TouchableOpacity style={styles.Button} onPress={() => setVisible(true)}>
        <AntDesign name="shoppingcart" size={25} color="white" />
        <Text style={styles.ButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentSection;

const styles = StyleSheet.create({
 
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: 320,
    width: 300,
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  lottieAnimation: {
    height: 180,
    width: 200,
    bottom: 7,
  },
  
  successText: {
    bottom: 20,
  },
  successDescription: {
    fontSize: 14,
    fontFamily: newTheme.regular,
    textAlign: 'center',
    bottom: 20,
  },
  continueButton: {
    width: '70%',
    height: 40,
    backgroundColor: 'black',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 15,
  },
  backButton: {
    height: 40,
    width: 40,
    bottom: 7,
  },
  cardImage: {
    height: '30%',
    width: '100%',
    marginTop: 10,
  },
  cardDetailsText: {
    marginTop: 15,
  },
  TextInput: {
    color: 'black',
    height: 50,
    width: '93%',
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 16,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#a0a0a0',
    paddingLeft: 20,
  },
  Button: {
    backgroundColor: 'black',
    height: 50,
    width: '90%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  ButtonText: {
    color: 'white',
    fontFamily: newTheme.Semi_Bold,
    fontSize: 17,
    left: 10,
  },
});

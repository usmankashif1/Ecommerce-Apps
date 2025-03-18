import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import newTheme from '../utils/Constants';
const CardsSelection = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const data = [
    {
      id: 1,
      img: 'https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Logo.png',
      title: 'Credit Card',
    },
    {
      id: 2,
      img: 'https://icon-icons.com/icons2/729/PNG/512/paypal_icon-icons.com_62739.png',
      title: 'PayPal',
    },
    {
      id: 3,
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1024px-Visa_Inc._logo.svg.png',
      title: 'Visa',
    },
    {
      id: 4,
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png',
      title: 'Google Pay',
    },
  ];

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={{height: 40, width: 40, bottom: 10}}
        onPress={() => navigation.goBack()}>
        <Ionicons name="caret-back-circle-sharp" color="black" size={40} />
      </TouchableOpacity>
      <Text style={styles.heading}>Payment</Text>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => setSelected(item.id)}
            style={[
              styles.SubContainer,
              selected === item.id && styles.CardSelectedContainer,
            ]}>
            <View style={styles.imgContainer}>
              <Image style={styles.img} source={{uri: item.img}} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <Text
                style={[
                  styles.cardTitle,
                  selected === item.id && styles.CardSelectedText,
                ]}>
                {item.title}
              </Text>
              {selected === item.id ? (
                <Entypo name="circle" size={15} color="white" />
              ) : (
                <Entypo name="circle" size={15} color="black" />
              )}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{paddingBottom: 20}}
      />
      <TouchableOpacity
        style={styles.Button}
        onPress={async () => {
          navigation.navigate('PaymentSection');
        }}>
        <AntDesign name="shoppingcart" size={25} color="white" />
        <Text style={styles.ButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardsSelection;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  heading: {
    fontFamily: newTheme.Bold,
    color: 'black',
    fontSize: 20,
  },
  SubContainer: {
    height: 70,
    width: '95%',
    backgroundColor: 'white',
    elevation: 3,
    marginTop: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
  },
  img: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  imgContainer: {
    height: 48,
    width: 48,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  cardTitle: {
    fontFamily: newTheme.Bold,
    fontSize: 15,
    marginHorizontal: 15,
    color:'black'
  },
  CardSelectedContainer: {
    backgroundColor: 'black',
  },
  CardSelectedText: {
    color: 'white',
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
    flexDirection:'row'
  },
  ButtonText: {
    color: 'white',
    fontFamily: newTheme.Semi_Bold,
    fontSize: 17,
    left:10,

  }
});

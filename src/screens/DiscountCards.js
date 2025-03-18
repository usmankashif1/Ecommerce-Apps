import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import newTheme from '../utils/Constants';
import CustomButton from '../components/CustomButton';

const DiscountCards = () => {
  const cards = [
    {
      img: require('../assets/images/cards.png'),
      off: '50% Off',
      subTitle: 'On Everything today',
      code: 'With code:FSCREATION',
    },
    {
      img: require('../assets/images/cards.png'),
      off: '70% Off',
      subTitle: 'On Everything today',
      code: 'With code:FSCREATION',
    },
    {
      img: require('../assets/images/cards.png'),
      off: '30% Off',
      subTitle: 'On Everything today',
      code: 'With code:FSCREATION',
    },
    {
      img: require('../assets/images/cards.png'),
      off: '40% Off',
      subTitle: 'On Everything today',
      code: 'With code:FSCREATION',
    },
  ];

  return (
    <View style={{backgroundColor: 'white'}}>
      <FlatList
        horizontal
        data={cards}
        renderItem={({item}) => (
          <View style={styles.containerCards}>
            <ImageBackground
              style={styles.img}
              source={item.img}
              imageStyle={{borderRadius: 10}}>
              <View style={styles.overlay}>
                <Text style={styles.offText}>{item.off}</Text>
                <Text style={styles.subTitle}>{item.subTitle}</Text>
                <Text style={styles.code}>{item.code}</Text>
              </View>
              <CustomButton
                title={['Get Now']}
                backgroundColor={'black'}
                color={'white'}
                width={110}
                height={35}
                justifyContent={'center'}
                alignItems={'center'}
                bottom={10}
                left={10}
              />
            </ImageBackground>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default DiscountCards;

const styles = StyleSheet.create({
  containerCards: {
    width: 260,
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    margin: 15,
  },
  img: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,

    padding: 10,
  },
  offText: {
    color: 'black',
    fontFamily: newTheme.Bold,
    fontSize: 25,
  },
  subTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: newTheme.regular,
  },
  code: {
    color: '#666666',
    fontSize: 12,
    fontFamily: newTheme.Semi_Bold,
    marginTop: 5,
  },
});

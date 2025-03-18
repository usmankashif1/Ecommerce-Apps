import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import newTheme from '../utils/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import ViewAllProducts from './ViewAllProducts';

const FilterPage = () => {


const applyFilters=()=>{
  const Selectedfilters = {
    category: selected,
    sort: selectedSort,
    priceRange: sliderValues, 
    rating: selectedRating
  };
  navigation.navigate('ViewAllProducts', { Filters: Selectedfilters });
}


  const [selected, setSelected] = useState();
  const [selectedSort, setSelectedSort] = useState();
  const [selectedRating, setSelectedRating] = useState(null);
  const navigation = useNavigation();
  const [sliderValues, setSliderValues] = useState([3, 7]);
  const multiSliderValuesChange = values => {
    setSliderValues(values);
  };

  const categories = [
    {
      key: 1,
      name: 'Summer Collection',
    },
    {
      key: 2,
      name: 'Winter Collection',
    },
  ];

  const sortby = [
    {
      key: 3,
      title: 'New Today',
    },
    {
      key: 4,
      title: 'New This Week',
    },
    {
      key: 5,
      title: 'Top Sellers',
    },
  ];

  const ratings = [5, 4, 3, 1];

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={{left: 10, top: 10, height: 40, width: 40}}
        onPress={() => navigation.goBack()}>
        <Ionicons name="caret-back-circle-sharp" color="black" size={40} />
      </TouchableOpacity>
      <Text
        style={[
          styles.heading,
          {color: 'black', marginLeft: 17, fontSize: 18, marginTop: 20},
        ]}>
        Select Category:
      </Text>

      <View style={styles.CategoriesContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.CategoryContainer,
              selected === category.key && styles.SelectedBox,
            ]}
            onPress={() => setSelected(category.key)}>
            <Text
              style={[
                styles.heading,
                selected === category.key && styles.SelectedText,
              ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.Bar}>
        <MultiSlider
          values={[sliderValues[0], sliderValues[1]]}
          sliderLength={330}
          onValuesChange={multiSliderValuesChange}
          min={0}
          max={1750}
          step={1}
        />
      </View>
      <View style={styles.SliderContainer}>
        <Text style={styles.PriceCount}>${sliderValues[0]}</Text>
        <Text style={styles.PriceCount}>${sliderValues[1]}</Text>
      </View>
      <Text
        style={[
          styles.heading,
          {color: 'black', marginLeft: 17, fontSize: 18},
        ]}>
        Sort by
      </Text>
      <FlatList
        horizontal
        data={sortby}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.CategoryContainer,
              {marginLeft: 5, width: 123},
              selectedSort === item.key && styles.SelectedBox,
            ]}
            onPress={() => setSelectedSort(item.key)}>
            <Text
              style={[
                styles.heading,
                {fontSize: 14, fontFamily: newTheme.Semi_Bold},
                selectedSort === item.key && styles.SelectedText,
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={[styles.heading, {marginLeft: 10, fontSize: 18}]}>
        Rating
      </Text>
      <View style={styles.RatingContainer}>
        {ratings.map((rating, index) => (
          <View key={index} style={styles.ratingRow}>
            <View style={styles.starsContainer}>
              {[...Array(rating)].map((_,i) => (
                <Ionicons key={i} name="star" size={24} color="#FFA000" />
              ))}
            </View>
            <TouchableOpacity onPress={() => setSelectedRating(index)}>
              <Ionicons
                name={
                  selectedRating === index
                    ? 'checkmark-circle'
                    : 'ellipse-outline'
                }
                size={24}
                color={selectedRating === index ? 'black' : '#D3D3D3'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.Button} onPress={applyFilters}>
        <Text style={styles.ButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterPage;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  SliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    bottom: 20,
  },
  Bar: {
    alignItems: 'center',
    top: 20,
  },
  PriceCount: {
    fontFamily: newTheme.Semi_Bold,
    fontSize: 16,
    color:'black'
  },
  CategoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  CategoryContainer: {
    height: 40,
    width: '44%',
    backgroundColor: 'white',
    marginTop: 5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    marginLeft: 14,
  },
  heading: {
    fontFamily: newTheme.Bold,
    fontSize: 15,
    color: 'black',
  },
  SelectedBox: {
    backgroundColor: 'black',
  },
  SelectedText: {
    color: 'white',
  },
  RatingContainer: {
    // marginTop: 15,
    marginLeft: 10,
    marginBottom:20
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom:10
  },
  Button: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: '85%',
    height: 50,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom:20,

  },
  ButtonText: {
    color: 'white',
    fontSize: 17,
    fontFamily: newTheme.Bold,
  },
});

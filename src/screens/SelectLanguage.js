import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import newTheme from '../utils/Constants';
import CustomInputs from '../components/CustomInputs';

const SelectLanguage = () => {
  const [changer, setChanger] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectLanguage, setSelectLanguage] = useState('');

  useEffect(() => {
    const loadSelectedLanguage = async () => {
      const name = await AsyncStorage.getItem('GetLanguage');
      saveLanguage();
      if (name) {
        setSelectLanguage(name);
        const index = languages.findIndex(lang => lang.name === name);
        if (index !== -1) {
          setChanger(languages[index].key);
        }
      }
    };

    loadSelectedLanguage();
  }, []);

  const saveLanguage = async () => {
    try {
      await AsyncStorage.setItem('GetLanguage', selectLanguage);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const languages = [
    {
      key: 1,
      img: 'https://cdn.britannica.com/25/4825-004-F1975B92/Flag-United-Kingdom.jpg',
      name: 'English',
    },
    {
      key: 2,
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/800px-Flag_of_Brazil.svg.png',
      name: 'Brazilian',
    },
    {
      key: 3,
      img: 'https://cdn.britannica.com/67/6267-004-10A21DF0/Flag-Bangladesh.jpg',
      name: 'Bengali',
    },
    {
      key: 4,
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png',
      name: 'German',
    },
    {
      key: 5,
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/1200px-Flag_of_Portugal.svg.png',
      name: 'Portuguese',
    },
  ];

  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const navigation = useNavigation();

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack('PersonalDetails');
        }}>
        <Ionicons name="caret-back-circle-sharp" color="black" size={40} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <CustomInputs
          iconFamily={'AntDesign'}
          name={'search1'}
          iconColor={'black'}
          backgroundcolor={newTheme.gray}
          placeholder={'Search...'}
          placeholderTextColor={newTheme.secondary}
          bordercolor={'#38bccf'}
          flex={1}
          hbox={50}
          fontSize={17}
          radius={30}
          borderRadius={30}
          width={'90%'}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>
      <Text style={styles.heading}>Select Language</Text>
      <FlatList
        data={filteredLanguages}
        keyExtractor={item => item.key.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.FlatListConatiner,
              changer === item.key && styles.clickedFlatlistContainer,
            ]}
            onPress={() => {
              setChanger(item.key);
              setSelectLanguage(item.name);
            }}>
            <Image style={styles.languageImage} source={{uri: item.img}} />
            <Text
              style={[
                styles.LanguageText,
                changer === item.key && styles.ClickedLanguageText,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.contentContainer}
      />
      <TouchableOpacity style={styles.saveButton} onPress={()=>{saveLanguage();navigation.goBack()}}>
        <Text style={styles.SaveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    left: 10,
    top: 10,
    height:40,
    width:40
  },
  searchContainer: {
    alignItems: 'center',
  },
  searchInput: {
    width: '90%',
    height: 50,
    backgroundColor: '#f3f4f5',
    borderRadius: 30,
    paddingLeft: 20,
    fontSize: 15,
    fontFamily: newTheme.regular,
  },
  heading: {
    fontSize: 18,
    color: 'black',
    fontFamily: newTheme.Bold,
    marginTop: 15,
    marginLeft: 20,
  },
  FlatListConatiner: {
    flex: 1,
    height: 77,
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 15,
    elevation: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  languageImage: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginLeft: 20,
  },
  LanguageText: {
    marginLeft: 20,
    fontSize: 16,
    fontFamily: newTheme.Semi_Bold,
    color:'black'
  },
  clickedFlatlistContainer: {
    backgroundColor: 'black',
  },
  ClickedLanguageText: {
    color: 'white',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  saveButton: {
    backgroundColor: 'black',
    height: 55,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 30,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SaveText: {
    color: 'white',
    fontSize: 20,
    bottom: 2,
  },
});

export default SelectLanguage;

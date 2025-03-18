import {
  Dimensions,
  FlatList,
  Image,
  InteractionManager,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import newTheme from '../utils/Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomInputs from '../components/CustomInputs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Design from '../utils/Design';
import { scale } from 'react-native-size-matters';


const {height,width}=Dimensions.get('window');
const PersonalDetails = () => {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [SelectLanguage, setSelectLanguage] = useState('');

  const GetLanguageName = async () => {
    const LanguageName = await AsyncStorage.getItem('GetLanguage');
    setSelectLanguage(LanguageName);
  };

  useFocusEffect(
    useCallback(() => {
      const loadImageUri = async () => {
        const storedImageUri = await AsyncStorage.getItem('profileImageUri');
        const name = await AsyncStorage.getItem('Getname');
        const email = await AsyncStorage.getItem('Getemail');
        GetLanguageName();

        setName(name);
        setEmail(email);
        setImageUri(storedImageUri);
      };
      loadImageUri();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      // Re-fetch the language name when the screen is focused
      GetLanguageName();
    }, []),
  );

  const PersonalDetail = async () => {
    try {
      await AsyncStorage.setItem('Getname', name);
      await AsyncStorage.setItem('Getemail', email);
      console.log('Name and Email saved successfully');
    } catch (error) {
      console.error('Failed to save name and email:', error);
    }
  };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleNotificationSwitch = () =>
    setIsNotificationEnabled(previousState => !previousState);
  const toggleDarkModeSwitch = () =>
    setIsDarkModeEnabled(previousState => !previousState);

  const genders = [
    {id: '1', label: 'Male'},
    {id: '2', label: 'Female'},
  ];

  const data = [
    {
      id: '1',
      iconFamily: 'MaterialIcons',
      iconName: 'language',
      color: 'black',
      title: 'Language',
      screen: 'SelectLanguage',
    },
    {
      id: '2',
      iconFamily: 'Ionicons',
      iconName: 'notifications',
      color: 'black',
      title: 'Notification',
    },
    {
      id: '3',
      iconFamily: 'MaterialIcons',
      iconName: 'dark-mode',
      color: 'black',
      title: 'Dark Mode',
    },
    {
      id: '4',
      iconFamily: 'Entypo',
      iconName: 'help-with-circle',
      color: 'black',
      title: 'Help Center',
      screen: '',
    },
  ];

  const renderItem = ({item}) => {
    let IconComponent;

    switch (item.iconFamily) {
      case 'Ionicons':
        IconComponent = Ionicons;
        break;
      case 'Entypo':
        IconComponent = Entypo;
        break;
      case 'MaterialCommunityIcons':
        IconComponent = MaterialCommunityIcons;
        break;
      case 'AntDesign':
        IconComponent = AntDesign;
        break;
      case 'FontAwesome':
        IconComponent = FontAwesome;
        break;
      case 'MaterialIcons':
        IconComponent = MaterialIcons;
        break;
      default:
        IconComponent = Ionicons;
    }

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          if (item.title !== 'Notification' && item.title !== 'Dark Mode') {
            navigation.navigate(item.screen);
          }
        }}>
        <View style={styles.settingSubContainer}>
          <View
            style={{
              marginLeft: 20,
              height: 40,
              width: 40,
              backgroundColor: '#eeeeee',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <IconComponent name={item.iconName} size={23} color={item.color} />
          </View>

          <Text style={styles.itemText}>{item.title}</Text>
        </View>
        <View style={styles.settingSubContainer}>
          {item.title === 'Notification' || item.title === 'Dark Mode' ? (
            <Switch
              value={
                item.title === 'Notification'
                  ? isNotificationEnabled
                  : isDarkModeEnabled
              }
              onValueChange={
                item.title === 'Notification'
                  ? toggleNotificationSwitch
                  : toggleDarkModeSwitch
              }
              trackColor={{false: '#767577', true: 'blue'}}
              thumbColor={
                item.title === 'Notification' && isNotificationEnabled
                  ? '#ececee'
                  : item.title === 'Dark Mode' && isDarkModeEnabled
                  ? '#ececee'
                  : '#f4f3f4'
              }
              ios_backgroundColor="#3e3e3e"
            />
          ) : null}

          {item.title === 'Language' && (
            <Text style={styles.flatListText}>
              {SelectLanguage || 'Select Language'}
            </Text>
          )}

          {item.title !== 'Notification' && item.title !== 'Dark Mode' && (
            <MaterialIcons
              name="navigate-next"
              size={27}
              color="black"
              style={styles.NextIcon}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const selectImage = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets[0].uri) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        saveImageUri(uri);
        uploadImage(uri);
      }
    });
  };

  const saveImageUri = async uri => {
    try {
      await AsyncStorage.setItem('profileImageUri', uri);
    } catch (error) {
      console.error('Failed to save image URI to AsyncStorage:', error);
    }
  };

  const uploadImage = uri => {
    const formData = new FormData();
    formData.append('photo', {
      uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    axios.post('YOUR_UPLOAD_URL', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return (
    <View style={Design.container}>
      <TouchableOpacity
        style={{left: 10, top: 10, height: 40, width: 40}}
        onPress={() => navigation.navigate('Profile', {imageUri})}>
        <Ionicons name="caret-back-circle-sharp" color="black" size={40} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.addImgContainer} onPress={selectImage}>
        <Image
          style={styles.profileIMG}
          source={
            imageUri
              ? {uri: imageUri}
              : require('../assets/images/userIcon.jpg')
          }
        />
        <Entypo
          style={{alignSelf: 'flex-end', top: 10}}
          name="circle-with-plus"
          color="black"
          size={23}
        />
      </TouchableOpacity>

      <Text style={[Design.heading, {alignSelf: 'center', marginTop: 15}]}>
        Upload Image
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.text}>Name: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={setName}
          value={name}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <Text style={styles.text}>Gender</Text>
        <View style={{flexDirection: 'row', marginLeft: 15}}>
          {genders.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.GenderContainer,
                selectedGender === item.id && styles.selectedButton,
              ]}
              onPress={() => setSelectedGender(item.id)}>
              <Text
                style={[
                  styles.GenderText,
                  selectedGender === item.id && styles.GenderButtonText,
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
        <Text style={styles.text}>Age: </Text>
        <TextInput style={styles.inputField} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.text}>Email: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <Text
        style={[
          styles.heading,
          {marginLeft: 20, fontFamily: newTheme.Bold, marginTop: 20},
        ]}>
        Settings :
      </Text>
      <View style={styles.SettingContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          PersonalDetail();
          navigation.navigate('Profile');
        }}>
        <Text style={styles.ButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Button: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: '50%',
    height: 50,
    alignSelf: 'center',
    marginTop: 10,
  },
  ButtonText: {
    color: 'white',
    fontSize: 17,
    fontFamily: newTheme.Bold,
  },
  profileIMG: {
    height: 70,
    width: 70,
    borderRadius: 20,
    alignSelf: 'center',
    left: 15,
  },
  heading: {
    fontFamily: newTheme.Bold,
    color: 'black',
    marginTop: 20,
    fontSize: 16,
  },
  addImgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '20%',
    alignSelf: 'center',
  },
  inputField: {
    borderBottomWidth: 2,
    height: 40,
    width: '70%',
    fontSize: 15,
    borderColor: '#dddddd',
    paddingLeft: 0,
    marginLeft: 10,
    left: 5,
    color: 'black',
  },
  text: {
    fontSize: scale(16),
    width: 80,
    left: 20,
    top: 10,
    fontFamily: newTheme.Semi_Bold,
    color: 'black',
  },
  GenderContainer: {
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 10,
    width: width*0.2,
    height: height*0.06,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    top: 10,
    alignSelf: 'center',
  },
  GenderText: {
    fontFamily: newTheme.Semi_Bold,
    fontSize: scale(16),
    color: 'black',
  },
  selectedButton: {
    backgroundColor: 'black',
  },
  GenderButtonText: {
    color: 'white',
  },
  SettingContainer: {
    height: '35%',
    width: '90%',
    borderWidth: 2,
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 17,
    borderColor: '#dddddd',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 3,
  },
  itemText: {
    marginLeft: 10,
    fontSize: scale(15),
    fontFamily: newTheme.Semi_Bold,
    color: 'black',
  },
  NextIcon: {},
  settingSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatListText: {
    color: 'black',
    fontFamily: newTheme.regular,
  },
});

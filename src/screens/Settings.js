import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import newTheme from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Settings = () => {
  const [SelectLanguage, setSelectLanguage] = useState('');
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleNotificationSwitch = () =>
    setIsNotificationEnabled(previousState => !previousState);
  const toggleDarkModeSwitch = () =>
    setIsDarkModeEnabled(previousState => !previousState);
  const navigation = useNavigation();

  const GetLanguageName = async () => {
    const LanguageName = await AsyncStorage.getItem('GetLanguage');
    setSelectLanguage(LanguageName);
  };

  useEffect(() => {
    const languageName = async () => {
      GetLanguageName();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Re-fetch the language name when the screen is focused
      GetLanguageName();
    }, []),
  );


  const saveData = async () => {
    try {
      await AsyncStorage.setItem('GetLanguage', SelectLanguage);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

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
      screen: 'Settings',
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
              marginLeft: 3,
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
  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack('Profile');
        }}>
        <Ionicons name="caret-back-circle-sharp" color="black" size={40} />
      </TouchableOpacity>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.SettingContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <TouchableOpacity style={styles.Button} onPress={()=>{saveData();navigation.goBack()}}>
        <Text style={styles.ButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  SettingContainer: {
    height: '35%',
    width: '85%',
    borderWidth: 2,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 17,
    borderColor: '#dddddd',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 5,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: newTheme.Semi_Bold,
    color: 'black',
  },
  NextIcon: {},
  settingSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontFamily: newTheme.Bold,
    color: 'black',
    marginTop: 20,
    fontSize: 20,
    marginLeft: 20,
  },
  Button: {
    backgroundColor: 'black',
    height: 55,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 30,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
    top:20
  },
  ButtonText:{
    color:'white',
    fontFamily:newTheme.Bold,
    fontSize:18
  },
  backButton: {
    left: 10,
    top: 10,
    height:40,
    width:40
  },
  flatListText:{
    color:'black',
    fontFamily:newTheme.regular
  }
});

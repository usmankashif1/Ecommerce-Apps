import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomInputs from '../components/CustomInputs';
import CustomButton from '../components/CustomButton';
import newTheme from '../utils/Constants';
import Design from '../utils/Design';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {scale} from 'react-native-size-matters';
import firebase from '../../firebaseConfig';

const SignUp = () => {
  const navigation = useNavigation();

  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, Password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const [name, setName] = useState('');
  const [BadName, setBadName] = useState(false);
  const [email, setEmail] = useState('');
  const [BadEmail, setBadEmail] = useState(false);

  const [Password, setPassword] = useState('');
  const [BadPassword, setBadPassword] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [ConfirmBadPassword, setConfirmBadPassword] = useState(false);
  const [buttonDisabled, SetButtonDisabled] = useState(false);

  const [getname, setgetName] = useState('');
  const [getemail, setgetEmail] = useState('');
  const handleInputChange = txt => {
    setEmail(txt);
    // setUser(txt);
  };

  const handleUser = txt => {
    setName(txt);
    // setTextName(txt);
  };

  const validation = () => {
    let isValid = true;
    SetButtonDisabled(true);

    if (name === '') {
      setBadName(true);
      SetButtonDisabled(false);
      isValid = false;
    } else {
      setBadName(false);

      if (email === '') {
        setBadEmail(true);
        SetButtonDisabled(false);
        isValid = false;
      } else {
        setBadEmail(false);

        if (Password === '') {
          setBadPassword(true);
          SetButtonDisabled(false);
          isValid = false;
        } else {
          setBadPassword(false);

          if (ConfirmPassword === '') {
            setConfirmBadPassword(true);
            SetButtonDisabled(false);
            isValid = false;
          } else {
            setConfirmBadPassword(false);
            if (ConfirmPassword !== Password) {
              setConfirmBadPassword(true);
              SetButtonDisabled(false);
              isValid = false;
            } else {
              setConfirmBadPassword(false);
            }
          }
        }
      }
    }

    if (isValid) {
      saveDetails();
      CreateUser();
    }

    return isValid;
  };

  const CreateUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, Password)
      .then(() => {});
  };

  const saveDetails = async () => {
    await AsyncStorage.setItem('Getname', name);
    await AsyncStorage.setItem('Getemail', email);
    await AsyncStorage.setItem('GetPassword', Password);
    await AsyncStorage.setItem('GetConfirmPassword', ConfirmPassword);
  };

  const handleSignUp = async () => {
    if (validation()) {
      await createUser();
      navigation.navigate('AppIntroSliders');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedName = await AsyncStorage.getItem('Getname');
      const storedEmail = await AsyncStorage.getItem('Getemail');

      setgetName(storedName || '');
      setgetEmail(storedEmail || '');
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/images/logoF.png')}
      />
      <Text style={[Design.heading, {marginTop: 20, marginLeft: 20}]}>
        Sign Up
      </Text>
      <Text
        style={[
          Design.subHeading,
          {marginLeft: 20, color: newTheme.secondary},
        ]}>
        Create a new Account
      </Text>
      <View style={{alignItems: 'center'}}>
        <CustomInputs
          iconFamily={'FontAwesome'}
          name={'user'}
          placeholder={'User Name'}
          iconColor={newTheme.secondary}
          placeholderTextColor={newTheme.secondary}
          bordercolor={'black'}
          bdwidth={1.5}
          colorIcon={'black'}
          flex={1}
          hbox={50}
          fontSize={17}
          radius={10}
          borderRadius={30}
          width={'90%'}
          color={newTheme.secondary}
          onChangeText={handleUser}
          value={name}
        />
        {BadName === true && (
          <Text style={Design.validation}>Please Enter User Name</Text>
        )}
        <CustomInputs
          placeholder={'Email'}
          iconColor={newTheme.secondary}
          placeholderTextColor={newTheme.secondary}
          bdwidth={1.5}
          iconFamily={'Entypo'}
          name={'mail'}
          bordercolor={'black'}
          flex={1}
          hbox={50}
          fontSize={17}
          radius={10}
          borderRadius={30}
          width={'90%'}
          color={newTheme.secondary}
          onChangeText={handleInputChange}
          value={email}
        />
        {BadEmail === true && (
          <Text style={Design.validation}>Please Enter Email</Text>
        )}
        <CustomInputs
          iconFamily={'Entypo'}
          iconColor={newTheme.secondary}
          placeholderTextColor={newTheme.secondary}
          name={'lock'}
          placeholder={'Password'}
          bordercolor={'black'}
          bdwidth={1.5}
          showPassword={true}
          colorIcon={newTheme.secondary}
          flex={1}
          hbox={50}
          fontSize={17}
          radius={10}
          borderRadius={30}
          width={'90%'}
          color={newTheme.secondary}
          onChangeText={txt => setPassword(txt)}
          value={Password}
        />
        {BadPassword === true && (
          <Text style={Design.validation}>Please Enter Password</Text>
        )}
        <CustomInputs
          iconFamily={'Entypo'}
          iconColor={newTheme.secondary}
          placeholderTextColor={newTheme.secondary}
          name={'lock'}
          placeholder={'Confirm Password'}
          bordercolor={'black'}
          bdwidth={1.5}
          showPassword={true}
          colorIcon={newTheme.secondary}
          flex={1}
          hbox={50}
          fontSize={17}
          radius={10}
          borderRadius={30}
          width={'90%'}
          color={newTheme.secondary}
          onChangeText={txt => setConfirmPassword(txt)}
          value={ConfirmPassword}
        />
        {BadPassword === true && (
          <Text style={Design.validation}>Please Enter Password</Text>
        )}
        {ConfirmBadPassword === true && (
          <Text style={Design.validation}>Passwords do not match</Text>
        )}
        <CustomButton
          title={['Create an Account']}
          backgroundColor={buttonDisabled ? '#8e8e8e' : 'black'}
          width={'90%'}
          height={'14%'}
          color={'white'}
          justifyContent={'center'}
          alignItems={'center'}
          fontSize={18}
          elevation={4}
          marginTop={20}
          onPress={() => {
            handleSignUp();
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text style={styles.subHeading}>or already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.subHeading, {color: '#1227c9'}]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  logo: {
    height: '14%',
    width: '45%',
    alignSelf: 'center',
  },
  subHeading: {
    fontSize: scale(16),

    fontFamily: newTheme.regular,
    color: 'black',
  },
});

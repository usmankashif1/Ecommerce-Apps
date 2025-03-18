import {StyleSheet, Text, TextInput, View,TouchableOpacity, Dimensions} from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import newTheme from '../utils/Constants';
const IconLibrary = {
  AntDesign,
  Entypo,
  FontAwesome5,
  EvilIcons,
  FontAwesome,
};
const CustomInputs = props => {
  const {width,height} = Dimensions.get('screen')
  const Icon = IconLibrary[props.iconFamily]
  
    const [secureTextEntry, setSecureTextEntry] = useState(false);
    const toggleSecureTextEntry = () => {
      setSecureTextEntry(!secureTextEntry);
    };

  return (
    <View
      style={{
        justifyContent: props.content ,
        backgroundColor: props.backgroundcolor,
        width: props.width,
        borderRadius: props.radius ? props.radius:10,
        flexDirection: props.direction ? props.direction:'row',
        borderWidth: props.bdwidth ?props.bdwidth:0,
        borderColor: props.bordercolor ? props.bordercolor:newTheme.white,
        margin: props.margin,
        alignItems: props.alignItems ? props.align:'center',
        marginTop:15,
        paddingHorizontal:10,
        marginLeft:props.marginLeft

      }}>
      {Icon && props.name && (
        <Icon name={props.name} 
        size={props.size ? props.size:25} 
        color={props.iconColor ? props.iconColor:newTheme.black} />
      )}
      
      {props.placeholder && (
        <TextInput
          style={{
            width: props.wbox ? props.wbox:'85%',
            height: props.hbox ? props.hbox:'85%',
            fontFamily:newTheme.regular ,
            backgroundColor: props.bgColor ? props.bgColor:newTheme.white,
            fontSize:props.fontSize?props.fontSize:14,
            color: 'black',
            top:props.top,
            flex:props.flex?props.flex:0,
            borderRadius: props.borderRadius ? props.borderRadius:10,
            alignSelf: props.alignSelf ? props.alignSelf:'center',
            marginLeft:props.marginLeft,
            placeholderTextColor:props.placeholderTextColor

          }}
          placeholder={props.placeholder}
          keyboardType='default'
          secureTextEntry={secureTextEntry}
          placeholderTextColor={props.placeholderTextColor}
          onChangeText={props.onChangeText}
          value={props.value}
        />
      )}
      {props.showPassword&&
        <TouchableOpacity  onPress={toggleSecureTextEntry}>
          <Entypo
            name={secureTextEntry?"eye-with-line" :'eye'}
            size={props.sizeIcon  ? props.sizeIcon : 25}
            color={props.colorIcon ? props.colorIcon : newTheme.primary}
          />
        </TouchableOpacity>
      }
    </View>
  );
};

export default CustomInputs;

const styles = StyleSheet.create({});

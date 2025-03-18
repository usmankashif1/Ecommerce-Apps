import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import newTheme from '../utils/Constants';

const IconLibrary = {
  AntDesign,
  Entypo,
  FontAwesome5,
  EvilIcons,
  FontAwesome,
  Ionicons,
};

const CustomButton = (props) => {
  const Icon = IconLibrary[props.iconFamily];

  return (
    <TouchableOpacity
    disabled={props.disabled}
      onPress={props.onPress}
      style={{
        marginTop: props.marginTop,
        padding: props.padding,
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
        backgroundColor: props.backgroundColor,
        width: props.width,
        height: props.height,
        borderRadius: 30,
        bottom: props.bottom,
        left: props.left,
        elevation: props.elevation,
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
        flexDirection: 'row',
      }}
    >
      {Icon && props.name && (
        <Icon
          name={props.name}
          size={props.size ? props.size : 25}
          color={props.iconColor ? props.iconColor : newTheme.black}
        />
      )}
      <Text style={{ color: props.color, fontFamily: props.fontFamily, fontSize: props.fontSize }}>
        {props.title[0]}
        <Text style={{ fontSize:20,fontFamily:newTheme.Bold}}>{props.title[1]}</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});

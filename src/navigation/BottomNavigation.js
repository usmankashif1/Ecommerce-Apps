import {StyleSheet, Text, View, Animated} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useIsFocused} from '@react-navigation/native';
import Cart from '../screens/Cart';
import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import newTheme from '../utils/Constants';

const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();
  
  const AnimatedTabIcon = ({label, IconComponent, iconName, isFocused,size}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (isFocused) {
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }, [isFocused]);

    const translateX = animatedValue.interpolate({
      inputRange: [0, 0],
      outputRange: [-50, 0],
    });

    const opacity = animatedValue.interpolate({
      inputRange: [0, 0],
      outputRange: [0, 1],
    });

    return (
      <View style={isFocused ? styles.IconText : null}>
        <IconComponent name={iconName} color="black" size={18} />
        {isFocused && (
          <Animated.Text
            style={[
              styles.labelStyle,
              {transform: [{translateX}], opacity},
            ]}>
            {label}
          </Animated.Text>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            height: 65,
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            elevation: 20,
          },
          tabBarShowLabel: false
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,animation:'slide_from_right',
            tabBarIcon: ({focused}) => (
              <AnimatedTabIcon
                label="Home"
                IconComponent={Entypo}
                iconName="home"
                isFocused={focused}
                
              />
            ),
          }}
        />

        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <AnimatedTabIcon
                label="Cart"
                IconComponent={FontAwesome6}
                iconName="cart-shopping"
                isFocused={focused}
              />
            ),animation:'slide_from_right'
          }}
        />
        {/* <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <AnimatedTabIcon
                label="Notif"
                IconComponent={Fontisto}
                iconName="bell-alt"
                isFocused={focused}
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <AnimatedTabIcon
                label="Profile"
                IconComponent={FontAwesome}
                iconName="user"
                isFocused={focused}
              />
            ),animation:'slide_from_right'
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  IconText: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    width: 85,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'space-evenly',
    elevation: 2,
  },
  labelStyle: {
    fontFamily: newTheme.regular,
    right: 5,
    top: 1,
    color: 'black',
  },
});

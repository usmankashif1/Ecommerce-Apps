import {StyleSheet} from 'react-native';
import newTheme from './Constants';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    fontFamily: newTheme.Bold,
    color: 'black',
    fontSize: responsiveFontSize(2.7),
  },
  subHeading: {
    fontSize: 14,
    fontFamily: newTheme.regular,
    color:'black'
  },
  validation:{
    fontFamily:newTheme.regular,
    color:'red',
    alignSelf:'flex-start',
    marginLeft:20,
  }
});

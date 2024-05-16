import {StyleSheet, Dimensions, Platform} from 'react-native';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
const { width } = Dimensions.get('window');

const { width: screenWidth } = Dimensions.get('window');

export default StyleSheet.create({
     loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.orangeColor,
        opacity: 0.8
      }
});
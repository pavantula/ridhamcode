import {StyleSheet, Dimensions, Platform} from 'react-native';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
const { width } = Dimensions.get('window');

const { width: screenWidth } = Dimensions.get('window');

export default StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        borderBottomLeftRadius: Sizes.fixPadding + 25.0,
        borderBottomRightRadius: Sizes.fixPadding + 25.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: Colors.whiteColor,
    },
    headerKrushi: {        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        ...Fonts.blackColor18Bold, 
        textAlign: 'center',
        marginTop: Sizes.fixPadding,
        marginRight: Sizes.fixPadding * 10.0,
    }, 
    productsSlides:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleSlide:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Sizes.fixPadding,
        width: screenWidth - 25.0,
        marginVertical: Sizes.fixPadding,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLightColor,
    },
    titleText:{
        ...Fonts.blackColor16Medium,
    },
    userProfileData:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    badge: {
        position: 'absolute',
        top: 14,
        right: 0,
        ...Fonts.whiteColor12Regular,
      },
});
import {StyleSheet, Dimensions, Platform} from 'react-native';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
const { width } = Dimensions.get('window');

const { width: screenWidth } = Dimensions.get('window');

export default StyleSheet.create({
     headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: Colors.whiteColor,
    },
    productsSlides:{
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
    },
    buttonStartShopping:{        
        textAlign: 'center',
        ...Fonts.whiteColor16Regular
    },
    titleSlide:{
        backgroundColor: Colors.greenColor,
        width: width - Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    textExmptyBag:{
        marginVertical: Sizes.fixPadding,
    },
    emptyMainText:{
        ...Fonts.blackColor16Regular,
        textAlign: 'center',
        marginVertical: Sizes.fixPadding
    },
    emptySubText:{
        ...Fonts.blackColor14Regular,
        textAlign: 'center',
        marginVertical: Sizes.fixPadding
    }
});
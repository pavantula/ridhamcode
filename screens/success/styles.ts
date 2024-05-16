import {StyleSheet,Dimensions} from 'react-native';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
const { width } = Dimensions.get('window');

export default StyleSheet.create({   
    nextAndLoginButtonStyle: {
        backgroundColor: Colors.greenColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 12.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%'
    }, 
    loginButtonStyle:{
        backgroundColor: Colors.orangeColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 12.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.0,
        width:'100%'
    },
    krushiIDCheckMain: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical: Sizes.fixPadding, 
        justifyContent: 'center',
        backgroundColor: Colors.greenColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
    },
    logoHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
         marginBottom: Sizes.fixPadding * 2.0,
    },
    headerWrapStyle: {
        marginHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: Colors.whiteColor,
    },
    krushiIDProfileData:{
        backgroundColor: Colors.whiteColor,
        margin: Sizes.fixPadding * 2.0,
    },
    profileInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding
    },
     backArrowStyle: {
         marginTop: Sizes.fixPadding,
    },
    headerText: {
        ...Fonts.blackColor18Bold, 
        marginTop: Sizes.fixPadding,
    },
    addToCartText:{
        ...Fonts.whiteColor16Medium,

    },
});
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
    categorySlides: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    analyticsStyle:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding * 2.0,
    },
    analyticCard:{
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding,
        width: '48%',
        elevation: 10,
        borderRadius: 10,
        height: 180,
    },
    analyticText:{
         ...Fonts.blackColor14Regular,
         textAlign: 'center',
         marginVertical: 2,
    },
    analyticNumber:{
         ...Fonts.blackColor14Bold,
         textAlign: 'center',
         marginVertical: 2, 
    },
    analyticLargeCard:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding,
        width: '100%',
        marginBottom: Sizes.fixPadding * 2.0
    },
    analyticIcon:{
        marginBottom: Sizes.fixPadding,
    },
    sectionBorder:{
        backgroundColor: Colors.borderGreyColor,
        paddingVertical: 0.5,
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
    },
    section: {
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginTop: Sizes.fixPadding * 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.borderGreyColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding  + 5.0,
    },
    profileInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding
    },
    textIcon: {
        paddingRight: Sizes.fixPadding * 2.0,
    },
});
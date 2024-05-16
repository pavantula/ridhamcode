import {StyleSheet,Dimensions} from 'react-native';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
const { width } = Dimensions.get('window');

export default StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0,
        // backgroundColor: Colors.whiteColor,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerKrushi: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    settingIconHeader: {
        // marginTop: Sizes.fixPadding - 50.0
        borderRadius: Sizes.fixPadding * 50.0,
        color: Colors.yellowColor,
        backgroundColor: Colors.blackColor
    },
    backArrowStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding * 50.0,
    },
    accountInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    KrushiIDCheckMain: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical: Sizes.fixPadding * 10.0, 
        justifyContent: 'center',
        backgroundColor: Colors.yellowColor,
        marginHorizontal: Sizes.fixPadding * 12.0,
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding +  2.0,
        elevation: 3,
    },
    profileInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        margin: Sizes.fixPadding * 2.0, 
        elevation: 5,
        borderRadius: Sizes.fixPadding +  2.0,
         padding: Sizes.fixPadding,
    },
    headerTextData: {
        margin: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Sizes.fixPadding,        
        ...Fonts.blackColor20Medium,
    },
    headerLogo:{
        alignItems: 'center',
        justifyContent: 'center',    
    },
    section: {
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginTop: Sizes.fixPadding * 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        ...Fonts.blackColor16Light
    },
    checkbox: {
        margin: 8,
    },
    sectionLast: {
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lastText: {
        ...Fonts.blackColor12Regular
    },
    categoriesWrapStyle: {
        flex: 1,
        maxWidth: width,
        backgroundColor: '#DFDFDF',
        elevation: 10.0,
        borderRadius: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding + 20.0,
        marginVertical: Sizes.fixPadding + 15.0
    },
    categoryInfoOuterWrapStyle: {
        borderBottomLeftRadius: 0.0,
        borderBottomRightRadius: 0.0,
        height: 120.0,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 2.0,
        paddingVertical: Sizes.fixPadding,
    },
    productImage: {
        width: width - 50,
        height: 50.0
    },
     productInfoWrapStyle: {
        paddingBottom: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
    },
    productDetailWrapStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    arrowIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 2.0,
        borderRadius: 10.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: 8.0
    },
});
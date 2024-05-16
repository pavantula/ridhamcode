import {StyleSheet,Dimensions} from 'react-native';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
const { width } = Dimensions.get('window');

export default StyleSheet.create({
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 8.0,
        marginBottom: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    krushiIDProfileData:{
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    krushiIDCheckMain: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical: Sizes.fixPadding * 2.0, 
        justifyContent: 'center',
        backgroundColor: Colors.greenColor,
        paddingVertical: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
    },
    profileInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding +  2.0,
        paddingVertical: Sizes.fixPadding
    },
    headerTextData: {        
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlign: 'left',      
        ...Fonts.blackColor36Bold,
    },
    section: {
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginTop: Sizes.fixPadding * 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionBorder:{
        backgroundColor: Colors.borderGreyColor,
        paddingVertical: 0.5,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0,
    },
    textInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    textIcon: {
        paddingRight: Sizes.fixPadding * 2.0,
    },
});
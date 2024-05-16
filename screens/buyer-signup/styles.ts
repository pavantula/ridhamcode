import {StyleSheet,Dimensions} from 'react-native';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
const { width } = Dimensions.get('window');

export default StyleSheet.create({
    headerWrapStyle: {
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        flex:1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    krushiIDProfileData:{
        margin: Sizes.fixPadding,
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
        ...Fonts.blackColor22Bold,
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
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
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
    logoHeader:{
        flexDirection: 'row',
       alignItems: 'center',
        justifyContent: 'center', 
         marginBottom: Sizes.fixPadding * 2.0,
    },
    dropdown: {
      margin: Sizes.fixPadding,
      width: '90%',
      backgroundColor: 'white',
      borderRadius: 5,
      paddingHorizontal: 12,
      borderWidth: 0,
      height: 10,
      borderColor: Colors.borderLightColor,
    },
    placeholderStyle: {
       ...Fonts.blackColor14Regular
    },
    disablePlaceholderStyle: {
       ...Fonts.blackColor14Regular,
      color: Colors.borderLightColor,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    itemStyle: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    paragraph: {
        ...Fonts.blackColor16Regular,
    },
    checkbox: {
        margin: 8,
    },
});
import {StyleSheet, Dimensions, Platform} from 'react-native';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
const { width } = Dimensions.get('window');

const { width: screenWidth } = Dimensions.get('window');

export default StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
        borderBottomLeftRadius: Sizes.fixPadding + 25.0,
        borderBottomRightRadius: Sizes.fixPadding + 25.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: Colors.whiteColor,
    },
    categorySlides: {
        marginHorizontal: Sizes.fixPadding,
    },    
    productImage: {
       height: 150,
       width: 125,
       borderRadius: 5,
    },
    categoryCardColumns: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#000',
        padding: 8,
        flexDirection:'row',
        alignItems:'center'
    },
    categoryName:{
         ...Fonts.blackColor14Medium,
    },
    headerText: {
        ...Fonts.blackColor18Bold, 
        textAlign: 'center',
        marginTop: Sizes.fixPadding,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
    },
    mainCardView: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 10,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: Colors.borderLightColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 10.0,
    },
    subCardView: {
        height: 150,
        width: 125,      
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    titleText:{
        ...Fonts.blackColor18Bold,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 10.0,
    },
    titleSlide:{
        backgroundColor: Colors.greenColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 10.0,
        borderRadius: 5,
    },
    buttonStartShopping:{        
        textAlign: 'center',
        ...Fonts.whiteColor16Medium
    },
    dropdown: {
      margin: Sizes.fixPadding,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 12,
      borderWidth: 1,
      borderColor: Colors.borderLightColor,
    },
    icon: {
      marginRight: 5,
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
    fieldLabel:{
        marginHorizontal: Sizes.fixPadding,
        ...Fonts.blackColor14Medium
    },
    sectionTitle:{
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        ...Fonts.blackColor16Bold
    },
    textInfoWrapStyle: {
        margin: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderWidth: 1,
        borderColor: Colors.borderLightColor,
        height: 50,
    },
    krushiIDCheckMain: {
        flexDirection: 'row', 
        alignItems: 'center', 
        margin: Sizes.fixPadding * 2.0, 
        justifyContent: 'center',
        backgroundColor: Colors.greenColor,
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
    },
    dateTimePicker: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#C5C5C5',
        borderWidth: 1,
        marginVertical: 10,
        height: 43,
   },
   inputsContainer: {
    flex: 1, marginBottom: 20
  },
  inputContainer: {    
    ...Platform.select({
          ios: {
            shadowOffset: {width: 0, height: 1}, 
            shadowOpacity: 0.8,
            shadowColor: "#000",
            shadowRadius: 5,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: Colors.greenColor,
            marginBottom: Sizes.fixPadding,
            padding: Sizes.fixPadding,
            borderRadius: 5,
          },
          android: {
            shadowOffset: {width: 0, height: 1}, 
            shadowOpacity: 0.2,
            shadowColor: "#000",
            shadowRadius: 5,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: Colors.orangeColor,
            marginBottom: Sizes.fixPadding,
            padding: Sizes.fixPadding,
            borderRadius: 5,
            marginHorizontal: Sizes.fixPadding,
          },
        }),
  },
  viewContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInputStyle:{
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderWidth: 1,
        borderColor: Colors.borderLightColor,
        height: 50,
        width: (width / 2) - 40.00,
        ...Fonts.blackColor14Regular
  },
  textInputStyleButton:{
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
        backgroundColor: 'red',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding + 5.0,
        borderWidth: 1,
        borderColor: Colors.borderLightColor,
        height: 50,
        width: (width / 2) - 40.00,
        ...Fonts.whiteColor14Regular
  },
  krushiIDAddLocation:{
        flexDirection: 'row', 
        alignContent: 'flex-end',
        alignItems: 'center', 
        margin: Sizes.fixPadding * 2.0, 
        justifyContent: 'center',
        backgroundColor: Colors.orangeColor,
        padding: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        width: width/2
  },
  radioGroup: { 
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        justifyContent: 'space-around', 
        marginVertical: Sizes.fixPadding,         
        backgroundColor: 'white', 
    }, 
    radioButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
    }, 
    radioLabel: { 
        marginLeft: 8, 
        fontSize: 16, 
        color: '#333', 
    }, 

    itemPhotosTitleWrapStyle: {
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    addPhotoIconWrapStyle: {
        width: 60.0,
        height: 60.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subHeadingText: {
        ...Fonts.blackColor16Medium,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderColor: '#ececec',
        borderWidth: 1.0,
    },
    removeIcon:{
        position: 'relative',

    },
    textFieldWrapStyle: {
        ...Fonts.blackColor14Medium,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding,
        borderColor: '#ececec',
        borderWidth: 1.0,
        elevation: 2.0,
        height:50.0
    },
    errorTextFieldWrapStyle: {    
        ...Fonts.blackColor14Medium,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: '#D10000',
        borderWidth: 1.50,
        elevation: 2.0,
        backgroundColor: Colors.whiteColor, 
        height:50.0       
    },
    cameraBlade:{
        flexDirection: 'row',
        ...Fonts.blackColor14Medium,
        backgroundColor: '#EEEEEE',
        borderRadius: Sizes.fixPadding + 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
    },
    nextButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 5.0,
        shadowColor: Colors.primaryColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        marginTop: 200,
    },
    registerTextWithBackArrowWrapStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
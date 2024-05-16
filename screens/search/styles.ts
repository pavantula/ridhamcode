import {StyleSheet,Dimensions} from 'react-native';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
const { width } = Dimensions.get('window');

export default StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerKrushi: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 2.0
    },
    settingIconHeader: {
        // marginTop: Sizes.fixPadding - 50.0
        borderRadius: Sizes.fixPadding * 50.0,
        color: Colors.yellowColor,
        backgroundColor: Colors.blackColor
    },
    backArrowStyle: {
        backgroundColor: Colors.whiteColor,
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
      container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "80%",

      },
      searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#d9dbda",
        borderRadius: 5,
        alignItems: "center",
      },
      searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#d9dbda",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "space-evenly",
      },
      input: {
        ...Fonts.blackColor14Regular,
        marginLeft: 10,
        width: "90%",
      },
      productImage: {
       height: 150,
       width: 125,
       borderRadius: 5,
    },
      mainCardView: {
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
    title: {
        ...Fonts.blackColor18Bold,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 10.0,
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
});
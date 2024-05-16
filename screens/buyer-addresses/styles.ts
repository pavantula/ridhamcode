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
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: Colors.whiteColor,
    },
    headerKrushi:{
        paddingLeft: Sizes.fixPadding,
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 10,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: Colors.borderLightColor,        
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 10.0,
        padding: Sizes.fixPadding,
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
});
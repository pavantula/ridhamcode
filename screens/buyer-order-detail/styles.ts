import {StyleSheet, Dimensions, Platform} from 'react-native';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
const { width } = Dimensions.get('window');

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

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
        flex: 1,
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
         margin: Sizes.fixPadding * 2.0,
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 5,
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.5,
        borderColor: Colors.borderLightColor,
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
    },
    mainCardViewStstus:{
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 5,
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.5,
        borderColor: Colors.borderLightColor,
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
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
    tabViewStyle:{
        backgroundColor: Colors.greenColor
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 50,
        borderRadius: 25,
        aspectRatio: 1,
        backgroundColor: 'orange',
        opacity: 0.6,
    },
    categorySlides: {
        marginHorizontal: Sizes.fixPadding,
    },  
    sectionTitle:{
        marginTop: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        ...Fonts.blackColor16Bold
    },
    fieldLabel:{
        marginHorizontal: Sizes.fixPadding,
        ...Fonts.blackColor14Medium
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
});
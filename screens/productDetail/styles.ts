import {StyleSheet, Dimensions, Platform} from 'react-native';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
const { width } = Dimensions.get('window');

const { width: screenWidth } = Dimensions.get('window');

export default StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
    },
    activeDotStyle: {
        marginHorizontal: Sizes.fixPadding - 7.0,
        width: 12.0,
        height: 12.0,
        borderRadius: 6.0,
        backgroundColor: Colors.whiteColor
    },
    inActiveDotStyle: {
        marginHorizontal: Sizes.fixPadding - 7.0,
        width: 8.0,
        height: 8.0,
        borderRadius: 4.0,
        backgroundColor: Colors.grayColor
    },
    sliderPaginationWrapStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: 0.0,
        right: 0.0,
    },
    snackBarStyle: {
        backgroundColor: '#333333',
        elevation: 0.0,
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
    },
    similarProductDetailWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.whiteColor,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomRightRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 5.0,
    },
    similarProductWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        width: 100.0, height: 100.0,
        marginRight: Sizes.fixPadding,
    },
    accordContainer: {
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.borderGreyColor
    },
    accordHeader: {
        padding: 4,
        backgroundColor: Colors.whiteColor,
        color: Colors.blackColor,
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',        
    },
    accordTitle: {
        ...Fonts.blackColor16Medium
    },
    accordBody: {
        padding: 5,
        ...Fonts.blackColor14Regular
    },
    textSmall: {
        fontSize: 16
    },
    seperator: {
        height: 12
    },
    nutritionStyle:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: Colors.borderLightColor,
        padding: 4,
    },
    nutritionStyle2:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: Colors.whiteColor,
        padding: 4,
    },
    nutritionTitle:{
         ...Fonts.blackColor14Regular
    },
    nutritionValue:{
         ...Fonts.blackColor14Regular
    },
    buttonAddToCart:{
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
        backgroundColor: Colors.orangeColor,        
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: Sizes.fixPadding * 2.0,
    },
    buttonAddToCartDisabled:{
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
        backgroundColor: Colors.borderGreyColor,        
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: Sizes.fixPadding * 2.0,
    },

    buttonAddToCartEnabled:{
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
        backgroundColor: Colors.orangeColor,        
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: Sizes.fixPadding * 2.0,
    },
    addToCartText:{
        ...Fonts.whiteColor16Medium,

    },
    sectionTitle:{
        ...Fonts.orangeColor18Bold,
    },
    sellerCard:{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.greenColor,
        marginVertical:Sizes.fixPadding,
    },
    sellerCardColumn:{        
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
    },    
    sellerLabelColumn:{
        ...Fonts.blackColor14Medium,
    },
    sellerNameColumn:{
        ...Fonts.blackColor14Regular,
    },
    sellerCardColumnSeparate:{        
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    categorySlides2: {
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    sellersSubCard:{
        borderWidth: 1,
        borderColor: Colors.borderLightColor,
        marginVertical: 3,
        borderRadius: 5,
    },
    input:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: Colors.greenColor,
        borderRadius: 5,
        padding: 10,
    },
    mainCardView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 10,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: Colors.borderLightColor,        
        marginBottom: Sizes.fixPadding + 10.0,
        padding: Sizes.fixPadding,
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
     loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.orangeColor,
        opacity: 0.8
      }
});
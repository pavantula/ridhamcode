import {StyleSheet, Dimensions, Platform} from 'react-native';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
const { width } = Dimensions.get('window');

const { width: screenWidth } = Dimensions.get('window');

export default StyleSheet.create({
     headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding - 20.0,
        borderBottomLeftRadius: Sizes.fixPadding + 25.0,
        borderBottomRightRadius: Sizes.fixPadding + 25.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: Colors.whiteColor,
    },
    headerKrushi: {        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categorySlides: {
        marginHorizontal: Sizes.fixPadding,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    bannersSlides:{
        marginVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryCard: {
        width: (width / 2.0) - 100.00,
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        padding: Sizes.fixPadding,
    },
    categoryName: {
        ...Fonts.blackColor12Regular,
        textAlign: 'center'
    },
    categoryImage: {
       height: 50, 
       width: 50,
       borderRadius: 40,
       marginHorizontal: Sizes.fixPadding,  
    },
    titleSlide:{
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding,
        width: screenWidth,
        marginBottom: Sizes.fixPadding,
    },
    titleText:{
        ...Fonts.blackColor18Bold,
    },
    navBars: { 
        flex: 0.3,
        textAlign: 'right',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: Sizes.fixPadding * 2.0,
    },
    productCardData:{
        width: (width / 2.0) - 125.0,
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        padding: Sizes.fixPadding * 12.0,
    },
    productImageStyle: {
       height: 212, 
       width: 170,
       borderRadius: 5,
       marginHorizontal: Sizes.fixPadding,   
    },
    textViewBlock:{
        shadowOffset: {width: 0, height: 1}, 
        shadowOpacity: 0.8,
        shadowColor: "#000",
        shadowRadius: 1,
        borderRadius: 0,
        backgroundColor: 'rgba(0,0,0, 0.7)',
        width: 170,
        height: 40,
        elevation: 10,
        bottom: 0,
        borderRadius: 5,
        marginHorizontal: Sizes.fixPadding, 
        position: 'absolute',
    },
    textView: {        
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        ...Fonts.whiteColor14Regular,
        paddingVertical: Sizes.fixPadding
    },
    // buttonViewMore: {
    //     ...Fonts.whiteColor14Regular, 
    //     textAlign: 'center',
    //     backgroundColor: Colors.orangeColor, 
    //     marginHorizontal: Sizes.fixPadding * 3.0,
    //     padding: 5,
    //     bottom: -3,
    // },
    analyticsStyle:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding  * 2.0,
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
         ...Fonts.blackColor24Bold,
         textAlign: 'center',
         marginVertical: 2, 
    },
    analyticLargeCard:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        width: '95%'
    },
    // imageText: {
    //     fontSize: 20,
    //     color: 'white',
    //     fontWeight: 'bold',
    // },
    searchStyle: {
        marginTop: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    imageContainer: {
        paddingVertical: Sizes.fixPadding,
        marginVertical: 5,
        width: width,
        borderRadius: 5
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    freshRecommendationWrapStyle: {
        flex: 1,
        maxWidth: (width / 2.0) - 25.0,
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
    },
    favoriteIconWrapStyle: {
        backgroundColor: Colors.primaryColor,
        borderTopRightRadius: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
        alignSelf: 'flex-end',
        padding: Sizes.fixPadding - 5.0,
    },
    productInfoOuterWrapStyle: {
        position: 'absolute',
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomRightRadius: Sizes.fixPadding - 5.0,
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        overflow: 'hidden',
        paddingTop: Sizes.fixPadding - 5.0,
    },
    productInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 10.0,
        paddingBottom: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 5.0,
    },
    productDetailWrapStyle: {
        marginTop: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Sizes.fixPadding
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 40.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    },
    searchInfoWrapStyle: {
        marginTop: Sizes.fixPadding + 20.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        height: 50,
        elevation: 2.0
    },
    arrowIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#48835D',
        borderWidth: 2.0,
        borderRadius: 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: 8.0,
        width: '40%'
    },
    blogTitle: {
        ...Fonts.blackColor16Medium,
        textAlign:  'center',
        paddingTop: Sizes.fixPadding 
    },
    productImage: {
        width: screenWidth - 50,
        height: 170.0
    },
    descView:{
        width: '60%'
    },
    publishDate:{
        ...Fonts.blackColor12Light,
        padding: Sizes.fixPadding
    },
    blogDesc:{
        ...Fonts.blackColor12Light,
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
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 10.0,
    },
    categoryCardColumns:{
        ...Platform.select({
          ios: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            width: (width / 2.0) - 15.0,
            height: 200,
            borderColor: Colors.greenColor, 
            borderWidth: 1,
            borderRadius: Sizes.fixPadding,
            marginRight: Sizes.fixPadding,
            marginVertical: 5
          },
          android: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            width: (width / 2.0) - 15.0,
            height: 200,
            borderColor: Colors.greenColor, 
            borderWidth: 1,
            borderRadius: Sizes.fixPadding,
            marginRight: Sizes.fixPadding,
            marginVertical: 5
          },
        }),
        
    },
    categoryIconStyle: {
        ...Platform.select({
          ios: {
            height: 160, 
            width: (width / 2) - 17.0,
            borderTopLeftRadius: Sizes.fixPadding,
            borderTopRightRadius: Sizes.fixPadding,
          },
          android: {
            height: 160, 
            width: (width / 2) - 17.0,
            borderTopLeftRadius: Sizes.fixPadding,
            borderTopRightRadius: Sizes.fixPadding,
          },
        }),       
    },
    categoryNameColumn:{        
        ...Platform.select({
          ios: {
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            ...Fonts.blackColor16Medium,
            paddingVertical: 5
          },
          android: {
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            ...Fonts.blackColor16Medium,
            paddingVertical: 5
          },
        }),
    },
    badge: {
        position: 'absolute',
        top: 14,
        right: 0,
        ...Fonts.whiteColor12Regular,
      },

});
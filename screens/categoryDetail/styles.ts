import {StyleSheet, Dimensions, Platform} from 'react-native';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
const { width } = Dimensions.get('window');

const { width: screenWidth } = Dimensions.get('window');

export default StyleSheet.create({
     headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding,
        paddingTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width - 5.0,
        backgroundColor: Colors.whiteColor,
    },
    headerKrushi: {        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categorySlides: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productsSlides:{
        paddingHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginVertical: Sizes.fixPadding * 2.0,
    },
    bannersSlides:{
        marginVertical: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryCard: {
        width: width - 25.0,
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        padding: Sizes.fixPadding,
    },
    categoryName: {
        ...Fonts.blackColor14Regular,
        textAlign: 'center'
    },
    categoryImage: {
       height: 60, 
       width: 60,
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
        ...Platform.select({
          ios: {
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: Sizes.fixPadding * 12.0,
            marginVertical: Sizes.fixPadding,
          },
          android: {
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: Sizes.fixPadding * 12.0,
            margin: Sizes.fixPadding,
            width: width - 25.0
          },
        }),
        
    },
    productImageStyle: {
        ...Platform.select({
          ios: {
               height: 200, 
               width: (width / 2) - 20.0,
               borderRadius: 5,
               marginHorizontal: Sizes.fixPadding,  
               marginVertical: Sizes.fixPadding * 2.0, 
          },
          android: {
            height: 200, 
            width: (width / 2) - 20.0,
            borderRadius: 5,
            marginHorizontal: Sizes.fixPadding,  
            marginVertical: Sizes.fixPadding, 
          },
        }),       
    },
    textViewBlock:{        
        ...Platform.select({
          ios: {
               shadowOffset: {width: 0, height: 1}, 
            shadowOpacity: 0.8,
            shadowColor: "#000",
            shadowRadius: 1,
            borderRadius: 0,
            backgroundColor: 'rgba(0,0,0, 0.7)',
            width: (width / 2) - 20.0,
            height: 40,
            bottom: 20,
            borderRadius: 5,
            marginHorizontal: Sizes.fixPadding, 
            position: 'absolute', 
            textAlign: 'center',
          },
          android: {
            shadowOffset: {width: 0, height: 1}, 
            shadowOpacity: 0.8,
            shadowColor: "#000",
            shadowRadius: 1,
            borderRadius: 0,
            backgroundColor: 'rgba(0,0,0, 0.7)',
            width: (width / 2) - 20.0,
            height: 40,
            bottom: 10,
            borderRadius: 5,
            marginHorizontal: Sizes.fixPadding, 
            position: 'absolute', 
            textAlign: 'center',
          },
        }),
    },
    textView: {        
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        ...Fonts.whiteColor16Regular,
        paddingVertical: Sizes.fixPadding
    },
    buttonViewMore: {
        ...Fonts.whiteColor16Regular, 
        textAlign: 'center',
        backgroundColor: Colors.orangeColor, 
        marginHorizontal: Sizes.fixPadding * 3.0,
        padding: 5,
        bottom: -3,
    },
    headerText: {
        ...Fonts.blackColor18Bold, 
        textAlign: 'center',
        marginTop: Sizes.fixPadding,
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
         ...Fonts.blackColor14Medium,
         textAlign: 'center',
         marginVertical: 10,
    },
    analyticNumber:{
         ...Fonts.blackColor34Bold,
         textAlign: 'center',
         marginVertical: 5, 
    },
    analyticLargeCard:{
        width: '100%',
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
        flex: 1,       
        margin: Sizes.fixPadding,
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
    notavailable:{
        ...Fonts.blackColor14Light,
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
    buttonStartShopping:{        
        textAlign: 'center',
        ...Fonts.whiteColor16Medium
    },
    tabViewStyle:{
        backgroundColor: Colors.greenColor
    },
    sectionTitle:{
        marginTop: Sizes.fixPadding,
        ...Fonts.blackColor16Bold,
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
    categorySlides2: {
        marginHorizontal: Sizes.fixPadding * 2.0,
    },  
    sectionTitle:{
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
    placeholderStyle: {
       ...Fonts.blackColor14Regular
    },
    disablePlaceholderStyle: {
       ...Fonts.blackColor14Regular,
      color: Colors.borderLightColor,
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
});
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
    analyticsStyle:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    analyticCard:{
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding,
        width: '48%',
        elevation: 10,
        borderRadius: 10,
        height: 140,
    },
    analyticText:{
         ...Fonts.blackColor16Regular,
         textAlign: 'center',
         marginVertical: 2,
    },
    analyticNumber:{
         ...Fonts.blackColor28Bold,
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
});
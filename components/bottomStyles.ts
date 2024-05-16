import {StyleSheet} from 'react-native';
import { Colors, Fonts, Sizes, } from "../constants/styles";

export default StyleSheet.create({
    bottomTabBarStyle: {
        height: 50.0,
        backgroundColor: Colors.whiteColor,        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',        
        paddingHorizontal: Sizes.fixPadding * 4.0,
        elevation: 5
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    uploadIconWrapStyle: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
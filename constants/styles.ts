import type { ScaledSize } from "react-native";
import { Dimensions, Platform  } from "react-native";

export const isIos = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const isWeb = Platform.OS === "web";

export const HEADER_HEIGHT = 100;

export const ElementsText = {
  AUTOPLAY: "AutoPlay",
};

export const window: ScaledSize = isWeb
  ? {
    ...Dimensions.get("window"),
    width: 700,
  }
  : Dimensions.get("window");


export const Fonts = {

    blackColor12Regular: {
        color: '#333339',
        fontSize: 12,
        fontFamily: 'OpenSans_Regular'
    },
     blackColor14Regular: {
        color: '#333339',
        fontSize: 14,
        fontFamily: 'OpenSans_Regular'
    },
     blackColor16Regular: {
        color: '#333339',
        fontSize: 16,
        fontFamily: 'OpenSans_Regular'
    },
     blackColor18Regular: {
        color: '#333339',
        fontSize: 18,
        fontFamily: 'OpenSans_Regular'
    },
     blackColor20Regular: {
        color: '#333339',
        fontSize: 20,
        fontFamily: 'OpenSans_Regular'
    },
     blackColor22Regular: {
        color: '#333339',
        fontSize: 22,
        fontFamily: 'OpenSans_Regular'
    },
    blackColor24Regular: {
        color: '#333339',
        fontSize: 24,
        fontFamily: 'OpenSans_Regular'
    },
    blackColor12Medium: {
        color: '#333339',
        fontSize: 12,
        fontFamily: 'Poppins_Medium'
    },
    blackColor14Medium: {
        color: '#333339',
        fontSize: 14,
        fontFamily: 'Poppins_Medium'
    },
    blackColor16Medium: {
        color: '#333339',
        fontSize: 16,
        fontFamily: 'Poppins_Medium'
    },
    blackColor18Medium: {
        color: '#333339',
        fontSize: 18,
        fontFamily: 'Poppins_Medium'
    },
    blackColor20Medium: {
        color: '#333339',
        fontSize: 20,
        fontFamily: 'Poppins_Medium'
    },
    blackColor22Medium: {
        color: '#333339',
        fontSize: 22,
        fontFamily: 'Poppins_Medium'
    },
    blackColor24Medium: {
        color: '#333339',
        fontSize: 24,
        fontFamily: 'Poppins_Medium'
    },
    blackColor12Bold: {
        color: '#333339',
        fontSize: 12,
        fontFamily: 'Poppins_Bold'
    },
    blackColor14Bold: {
        color: '#333339',
        fontSize: 14,
        fontFamily: 'Poppins_Bold'
    },
    blackColor16Bold: {
        color: '#333339',
        fontSize: 16,
        fontFamily: 'Poppins_Bold'
    },
    blackColor18Bold: {
        color: '#333339',
        fontSize: 18,
        fontFamily: 'Poppins_Bold'
    },
    blackColor20Bold: {
        color: '#333339',
        fontSize: 20,
        fontFamily: 'Poppins_Bold'
    },
    blackColor22Bold: {
        color: '#333339',
        fontSize: 22,
        fontFamily: 'Poppins_Bold'
    },
    blackColor24Bold: {
        color: '#333339',
        fontSize: 24,
        fontFamily: 'Poppins_Bold'
    },
    blackColor28Bold: {
        color: '#333339',
        fontSize: 28,
        fontFamily: 'Poppins_Bold'
    },
    blackColor30Bold: {
        color: '#333339',
        fontSize: 30,
        fontFamily: 'Poppins_Bold'
    },
    blackColor32Bold: {
        color: '#333339',
        fontSize: 32,
        fontFamily: 'Poppins_Bold'
    },
    blackColor34Bold: {
        color: '#333339',
        fontSize: 34,
        fontFamily: 'Poppins_Bold'
    },
    blackColor36Bold: {
        color: '#333339',
        fontSize: 36,
        fontFamily: 'Poppins_Bold'
    },


    whiteColor12Regular: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'OpenSans_Regular'
    },
    whiteColor14Regular: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'OpenSans_Regular'
    },
    whiteColor16Regular: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'OpenSans_Regular'
    },
    whiteColor18Regular: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'OpenSans_Regular'
    },
    whitekColor20Regular: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'OpenSans_Regular'
    },
    whiteColor22Regular: {
        color: '#FFF',
        fontSize: 22,
        fontFamily: 'OpenSans_Regular'
    },
    whiteColor24Regular: {
        color: '#FFF',
        fontSize: 24,
        fontFamily: 'OpenSans_Regular'
    },
    whiteColor12Medium: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'Poppins_Medium'
    },
    whiteColor14Medium: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Poppins_Medium'
    },
    whiteColor16Medium: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Poppins_Medium'
    },
    whiteColor18Medium: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Poppins_Medium'
    },
    whiteColor20Medium: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'Poppins_Medium'
    },
    whiteColor22Medium: {
        color: '#FFF',
        fontSize: 22,
        fontFamily: 'Poppins_Medium'
    },
    whiteColor24Medium: {
        color: '#FFF',
        fontSize: 24,
        fontFamily: 'Poppins_Medium'
    },
    whiteColor12Bold: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'Poppins_Bold'
    },
    whiteColor14Bold: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Poppins_Bold'
    },
    whiteColor16Bold: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Poppins_Bold'
    },
    whiteColor18Bold: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Poppins_Bold'
    },
    whiteColor20Bold: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'Poppins_Bold'
    },
    whiteColor22Bold: {
        color: '#FFF',
        fontSize: 22,
        fontFamily: 'Poppins_Bold'
    },
    whiteColor24Bold: {
        color: '#FFF',
        fontSize: 24,
        fontFamily: 'Poppins_Bold'
    },


    greenColor12Bold: {
        color: '#008F2A',
        fontSize: 12,
        fontFamily: 'Poppins_Bold'
    },
    greenColor14Bold: {
        color: '#008F2A',
        fontSize: 14,
        fontFamily: 'Poppins_Bold'
    },
    greenColor16Bold: {
        color: '#008F2A',
        fontSize: 16,
        fontFamily: 'Poppins_Bold'
    },
    greenColor18Bold: {
        color: '#008F2A',
        fontSize: 18,
        fontFamily: 'Poppins_Bold'
    },
    greenColor20Bold: {
        color: '#008F2A',
        fontSize: 20,
        fontFamily: 'Poppins_Bold'
    },
    greenColor22Bold: {
        color: '#008F2A',
        fontSize: 22,
        fontFamily: 'Poppins_Bold'
    },
    greenColor24Bold: {
        color: '#008F2A',
        fontSize: 24,
        fontFamily: 'Poppins_Bold'
    },

    orangeColor12Medium: {
        color: '#F7991F',
        fontSize: 12,
        fontFamily: 'Poppins_Medium'
    },
    orangeColor14Medium: {
        color: '#F7991F',
        fontSize: 14,
        fontFamily: 'Poppins_Medium'
    },
    orangeColor16Medium: {
        color: '#F7991F',
        fontSize: 16,
        fontFamily: 'Poppins_Medium'
    },
    orangeColor18Medium: {
        color: '#F7991F',
        fontSize: 18,
        fontFamily: 'Poppins_Medium'
    },
    orangeColor20Medium: {
        color: '#F7991F',
        fontSize: 20,
        fontFamily: 'Poppins_Medium'
    },
    orangeColor22Medium: {
        color: '#F7991F',
        fontSize: 22,
        fontFamily: 'Poppins_Medium'
    },
    orangeColor24Medium: {
        color: '#F7991F',
        fontSize: 24,
        fontFamily: 'Poppins_Medium'
    },

    orangeColor12Bold: {
        color: '#F7991F',
        fontSize: 12,
        fontFamily: 'Poppins_Bold'
    },
    orangeColor14Bold: {
        color: '#F7991F',
        fontSize: 14,
        fontFamily: 'Poppins_Bold'
    },
    orangeColor16Bold: {
        color: '#F7991F',
        fontSize: 16,
        fontFamily: 'Poppins_Bold'
    },
    orangeColor18Bold: {
        color: '#F7991F',
        fontSize: 18,
        fontFamily: 'Poppins_Bold'
    },
    orangeColor20Bold: {
        color: '#F7991F',
        fontSize: 20,
        fontFamily: 'Poppins_Bold'
    },
    orangeColor22Bold: {
        color: '#F7991F',
        fontSize: 22,
        fontFamily: 'Poppins_Bold'
    },
    orangeColor24Bold: {
        color: '#F7991F',
        fontSize: 24,
        fontFamily: 'Poppins_Bold'
    },

    redColor12Regular: {
        color: '#FF5454',
        fontSize: 12,
        fontFamily: 'OpenSans_Regular'
    },
    redColor14Regular: {
        color: '#FF5454',
        fontSize: 14,
        fontFamily: 'OpenSans_Regular'
    },
    redColor16Regular: {
        color: '#FF5454',
        fontSize: 16,
        fontFamily: 'OpenSans_Regular'
    },
    redColor18Regular: {
        color: '#FF5454',
        fontSize: 18,
        fontFamily: 'OpenSans_Regular'
    },
    redColor20Regular: {
        color: '#FF5454',
        fontSize: 20,
        fontFamily: 'OpenSans_Regular'
    },
    redColor22Regular: {
        color: '#FF5454',
        fontSize: 22,
        fontFamily: 'OpenSans_Regular'
    },
    redColor24Regular: {
        color: '#FF5454',
        fontSize: 24,
        fontFamily: 'OpenSans_Regular'
    },
}

export const Colors = {
    greenColor: '#008F2A',
    blackColor: '#333339',
    whiteColor: '#FFF',
    bgGreyColor: '#FFF',
    orangeColor: '#F7991F',
    redColor: '#FF5454',
    greyColor: '#8C8C8C',
    borderGreyColor: '#7B7B7B',
    borderLightColor: '#e5e7eb'
}

export const Sizes = {
    fixPadding: 10.0,
}
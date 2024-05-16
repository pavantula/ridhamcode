import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Poppins_Black: require("../assets/fonts/poppins/Poppins-Black.ttf"),
                Poppins_Bold: require("../assets/fonts/poppins/Poppins-Bold.ttf"),
                Poppins_ExtraBold: require("../assets/fonts/poppins/Poppins-ExtraBold.ttf"),
                Poppins_ExtraLight: require("../assets/fonts/poppins/Poppins-ExtraLight.ttf"),
                Poppins_Light: require("../assets/fonts/poppins/Poppins-Light.ttf"),
                Poppins_Medium: require("../assets/fonts/poppins/Poppins-Medium.ttf"),
                Poppins_Regular: require("../assets/fonts/poppins/Poppins-Regular.ttf"),
                Poppins_SemiBold: require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
                Poppins_Thin: require("../assets/fonts/poppins/Poppins-Thin.ttf"),

                OpenSans_Bold: require("../assets/fonts/open-sans/OpenSans-Bold.ttf"),
                OpenSans_ExtraBold: require("../assets/fonts/open-sans/OpenSans-ExtraBold.ttf"),
                OpenSans_Light: require("../assets/fonts/open-sans/OpenSans-Light.ttf"),
                OpenSans_Medium: require("../assets/fonts/open-sans/OpenSans-Medium.ttf"),
                OpenSans_Regular: require("../assets/fonts/open-sans/OpenSans-Regular.ttf"),
                OpenSans_SemiBold: require("../assets/fonts/open-sans/OpenSans-SemiBold.ttf"),
            });
            navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;
import React from "react";
import { SafeAreaView, View, StatusBar, Text, Image, ImageBackground } from "react-native";
import { Colors, Fonts, } from "../constants/styles";

const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.navigate('BottomTabBar')
    }, 2000);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={false} backgroundColor={Colors.whiteColor} />
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../assets/splash.png')}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                    <Image
                        source={require('../assets/krushi-icon-vertical.png')}
                        style={{ width: 250.0, height: 250.0, }}
                        resizeMode="contain"
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default SplashScreen;

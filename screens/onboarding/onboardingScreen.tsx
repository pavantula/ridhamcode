import React, { useCallback, useState } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, Image, Dimensions, Text, TouchableOpacity, ScrollView } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { FontAwesome5, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>            
                <StatusBar translucent={false} backgroundColor={Colors.whiteColor} />
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0}}>                
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 1.0, }}
                    >
                        {header()}
                        {onBoardingFunction()}
                    </ScrollView>                    
                </View>
        </SafeAreaView>
    )

    function onBoardingFunction(){
        return (
            <View style={styles.krushiIDProfileData}>
                <View style={styles.logoHeader}>
                    <Image 
                        source={require('../../assets/logo-krushi-horizontal.png')} 
                        style={{ width: '50%', height: 60, }}
                    />
                </View>
                <View style={styles.profileInfoWrapStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation.push('SellerLoginScreen')}
                            style={styles.nextAndLoginButtonStyle}
                        >
                            <Text style={{ textAlign: 'center', ...Fonts.whiteColor18Regular }}>
                                Seller
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation.push('BuyerLoginScreen', { product_id: null, is_login_from_product_detail: false })}
                            style={styles.loginButtonStyle}
                        >
                            <Text style={{ textAlign: 'center', ...Fonts.whiteColor18Regular, }}>
                                Buyer
                            </Text>
                        </TouchableOpacity>
                </View>
            </View>
        )  
    }
    

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={styles.headerKrushi}>
                    <Feather name="chevron-left" size={30} color="black" style={styles.backArrowStyle} onPress={() => navigation.pop()}/>                    
                </View>                 
            </View>
        )
    }  
}

export default OnboardingScreen;
import React, { useCallback, useState } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, Image, Dimensions, Text, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { FontAwesome5, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SuccessScreen = ({ route, navigation }) => {
    const { t, i18n } = useTranslation();

    const { order_id } = route.params;
    
    return(
        <SafeAreaView style={{ backgroundColor: Colors.whiteColor }}>            
                <StatusBar translucent={false} backgroundColor={Colors.whiteColor} />
                <View>                
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 1.0, }}
                    >
                        {header()}
                        {successFunction()}
                    </ScrollView>                    
                </View>
        </SafeAreaView>
    )

    function successFunction(){
        return (
            <View style={styles.krushiIDProfileData}>
                <Feather name="check-circle" size={45} color={Colors.greenColor} style={{ textAlign: 'center', marginVertical: Sizes.fixPadding * 3.0}}/>
                <Text style={{ ...Fonts.greenColor24Bold, textAlign: 'center', marginVertical: Sizes.fixPadding * 2.0 }}>
                    Payment Successful!
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify',marginVertical: Sizes.fixPadding * 2.0}}>
                    Thank you for your purchase with KRUSHI. Your order has been successfully processed and confirmed. You will receive an email confirmation shortly with details of your order.
                </Text>
                <Text style={{ ...Fonts.blackColor16Bold, textAlign: 'center', marginVertical: Sizes.fixPadding * 2.0 }}>
                    Your order ID is <Pressable onPress={() => navigation.navigate("BuyerOrderDetail", { order_id: order_id })}><Text style={{ ...Fonts.orangeColor24Bold}}> #{order_id} </Text></Pressable>
                </Text>

                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify', marginVertical: Sizes.fixPadding * 2.0 }}>
                   If you have any questions or concerns regarding your order, please feel free to contact our customer support team atinfo@krushi.co.in or call us at +91 9948022611.
                </Text>

                <Text style={{ ...Fonts.greenColor20Bold, textAlign: 'center',marginVertical: Sizes.fixPadding * 2.0}}>
                    Thank You For Shopping With Us!
                </Text>
                <Pressable onPress={() => navigation.navigate('BottomTabBar')}>
                    <View style={styles.krushiIDCheckMain}>
                        <Text style={styles.addToCartText}>Continue Shopping</Text>                
                        <AntDesign name="shoppingcart" size={30} color={Colors.whiteColor} />
                    </View>
                </Pressable>
            </View>
        )  
    }
    

    function header() {
        return (
            <View style={styles.headerWrapStyle}>                            
                <Pressable onPress={() => navigation.pop()}> 
                    <Text style={{ ...Fonts.blackColor16Light, marginTop: Sizes.fixPadding  }}>
                        <Feather name="chevron-left" size={30} color="black" />   
                    </Text> 
                </Pressable>
                <View style={styles.headerKrushi}>
                    <Text style={styles.headerText}>Success</Text>                   
                </View> 
                <Pressable> 
                    <Text style={{ ...Fonts.whiteColor16Regular, textAlign: 'right', marginTop: Sizes.fixPadding  }}>
                        Dum
                    </Text> 
                </Pressable>
            </View>
        )
    }  
}

export default SuccessScreen;
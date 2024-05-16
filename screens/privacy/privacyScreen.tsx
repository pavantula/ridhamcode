import React, { useCallback, useState } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, Image, Dimensions, Text, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { FontAwesome5, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const PrivacyScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    
    return(
        <SafeAreaView style={{ backgroundColor: Colors.whiteColor }}>            
                <StatusBar translucent={false} backgroundColor={Colors.whiteColor} />
                <View>                
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 1.0, }}
                    >
                        {header()}
                        {aboutUsFunction()}
                    </ScrollView>                    
                </View>
        </SafeAreaView>
    )

    function aboutUsFunction(){
        return (
            <View style={styles.krushiIDProfileData}>
                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Introduction
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> This privacy policy governs the collection, use, and disclosure of personal information by Varsha Krushi Innovations Private Limited in connection with your use of the KRUSHI platform (the "Platform").
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> By accessing or using the Platform, you agree to the terms of this privacy policy. If you do not agree with any part of this policy, you may not access or use the Platform.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Information We Collect
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> When you register for an account on the Platform, we may collect personal information such as your name, email address, and contact information.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> We may also collect information about your transactions and interactions with other users of the Platform.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> We may collect information about your device and internet connection, including your IP address, browser type, and operating system.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    How We Use Your Information
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> We use the information we collect to provide, maintain, and improve the Platform, including facilitating transactions between buyers and sellers.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> We may use your information to communicate with you about your account, transactions, and updates to the Platform.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> We may use your information to personalize your experience on the Platform and to provide you with targeted advertising and marketing communications.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Sharing of Information
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> We may share your information with third-party service providers who assist us in operating the Platform, conducting our business, or servicing you.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> We may share your information with other users of the Platform as necessary to facilitate transactions between buyers and sellers.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> We may disclose your information if required by law or if we believe that such disclosure is necessary to comply with legal process, protect our rights or property, or ensure the safety of others.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Data Security
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> We take reasonable measures to protect the security of your information against unauthorized access, disclosure, alteration, and destruction.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee the absolute security of your information.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Your Rights
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> You have the right to access, update, and delete your personal information at any time by logging into your account settings or by contacting us directly.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> You have the right to opt-out of receiving marketing communications from us by following the instructions provided in such communications or by contacting us directly.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Changes to this Policy
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    We reserve the right to modify or replace this privacy policy at any time, in our sole discretion. If we make material changes to this policy, we will notify you by email or by posting a notice on the Platform.
                </Text>
              
                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Contact Us
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                   If you have any questions about this privacy policy, please contact us at <Text style={{ ...Fonts.blackColor16Bold }}>info@krushi.co.in</Text>
                </Text>
                
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
                    <Text style={styles.headerText}>Privacy Policy</Text>                   
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

export default PrivacyScreen;
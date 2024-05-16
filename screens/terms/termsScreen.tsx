import React, { useCallback, useState } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, Image, Dimensions, Text, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { FontAwesome5, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const TermsScreen = ({ navigation }) => {
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
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> These terms and conditions govern your use of the KRUSHI, provided by Varsha Krushi Innovations Private Limited.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> By accessing or using the Platform, you agree to be bound by these terms and conditions. If you disagree with any part of these terms and conditions, you may not access the Platform.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Registration
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> To use the Platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Buying And Selling
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> The Platform facilitates transactions between buyers and sellers of agricultural products.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> Sellers agree to accurately describe the products they list on the Platform and to fulfill orders promptly and efficiently.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> Buyers agree to pay for products promptly and to communicate with sellers regarding any issues with their orders.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Escrow Transactions
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> The Platform may offer escrow services for transactions between buyers and sellers.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> Funds for escrow transactions will be held securely until the transaction is completed satisfactorily by both parties.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> In the event of a dispute between a buyer and seller, funds held in escrow may be released according to the resolution process outlined in section 6 below.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Fees
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> We may charge fees for certain services provided through the Platform, including but not limited to transaction fees and escrow fees.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> Any applicable fees will be clearly disclosed to you before you use the relevant service.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Dispute Resolution
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> In the event of a dispute between a buyer and seller, we may facilitate communication between the parties to resolve the dispute amicably.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> If a dispute cannot be resolved through negotiation, either party may request arbitration by a neutral third party.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Intellectual Property
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> All content and materials available on the Platform, including but not limited to text, graphics, logos, and images, are the property of Varsh Krushi Innovations Private Limited or its licensors and are protected by intellectual property laws.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> You may not reproduce, distribute, modify, or create derivative works of any content or materials from the Platform without our prior written consent.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Limitation of Liability
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of the Platform.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Governing Law
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> These terms and conditions shall be governed by and construed in accordance with the laws of <Text style={{ ...Fonts.blackColor16Bold }}>INDIA</Text>. Any disputes arising out of or relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts of <Text style={{ ...Fonts.blackColor16Bold }}>Indian Jurisdiction</Text>.
                </Text>                

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Amendments
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>{'\u2022'}</Text> We reserve the right to modify or replace these terms and conditions at any time, in our sole discretion. If a revision is material, we will provide at least 7 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
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
                    <Text style={styles.headerText}>Terms & Conditions</Text>                   
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

export default TermsScreen;
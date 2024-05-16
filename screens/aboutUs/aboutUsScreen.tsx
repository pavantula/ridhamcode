import React, { useCallback, useState } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, Image, Dimensions, Text, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { FontAwesome5, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const AboutUsScreen = ({ navigation }) => {
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
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>KRUSHI</Text> is a revolutionary platform that connects farmers and consumers, empowering both parties for mutual benefit. Our marketplace eliminates the need for intermediaries or agents, allowing farmers to sell their produce directly to consumers or buyers.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    For Farmers (Sellers):
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    At Krushi, we prioritize the success and prosperity of farmers. By joining our platform, farmers gain access to a wide audience of consumers eager to purchase fresh, high-quality produce.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    Here's how we support farmers:
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify', marginTop: Sizes.fixPadding}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>Direct Sales : </Text> Sell your produce directly to consumers without intermediaries, ensuring fair prices and maximum profits.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify', marginTop: Sizes.fixPadding}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>Increased Visibility : </Text> Gain exposure to a broader market and reach more potential buyers through our user-friendly platform.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify', marginTop: Sizes.fixPadding}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>Marketing Support : </Text> Benefit from our agricultural marketing strategies designed to showcase your products and attract buyers.
                </Text>

                <Text style={{ ...Fonts.orangeColor18Bold, textAlign: 'justify', marginTop: Sizes.fixPadding }}>
                    For Consumers (Buyers):
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    For consumers, Krushi offers access to a diverse range of fresh, locally sourced agricultural products. Here's why consumers love shopping with us:
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify', marginTop: Sizes.fixPadding}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>Direct Sales : </Text> Sell your produce directly to consumers without intermediaries, ensuring fair prices and maximum profits.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify', marginTop: Sizes.fixPadding}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>Quality Assurance : </Text> Enjoy peace of mind knowing that all products on our platform meet stringent quality standards and are sourced directly from farmers.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify', marginTop: Sizes.fixPadding}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>Variety : </Text> Explore a wide selection of Rice, Paddy, wheat, lentils, grains, and more, all conveniently available for purchase from the comfort of your home.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify', marginTop: Sizes.fixPadding}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>Support Local Farmers : </Text> By purchasing from Krushi, you're supporting local farmers and contributing to sustainable agriculture practices.
                </Text>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify', marginTop: Sizes.fixPadding}}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>Our Mission :</Text> At Krushi, our mission is to revolutionize the agricultural industry by creating a transparent and efficient marketplace that benefits both farmers and consumers. We are committed to fostering fair trade practices, promoting sustainability, and empowering farmers to thrive in the digital age.
                </Text>

                <Text style={{ ...Fonts.blackColor16Bold, textAlign: 'justify', marginTop: Sizes.fixPadding}}>
                    Join us today and experience the future of agriculture with Krushi!
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
                    <Text style={styles.headerText}>About Us</Text>                   
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

export default AboutUsScreen;
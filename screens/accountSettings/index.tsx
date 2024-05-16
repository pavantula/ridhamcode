import React, { useState } from "react";
import { SafeAreaView, View, Image, ScrollView, StatusBar, TextInput, Pressable, StyleSheet, Text, Alert} from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const AccountSettingsScreen = ({ navigation }) => {    
    const { t, i18n } = useTranslation();
    const [isChecked, setChecked] = useState(false);
    const handleLogout = () => {
        auth.signOut();
        navigation.push("Onboarding");
    };
    

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>            
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>                
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, }}
                    >
                        {header()}
                        {settingsPage()}
                    </ScrollView>                    
                </View>
        </SafeAreaView>
    )

    function settingsPage() {
        return (
            <View style={styles.KrushiIDProfileData}>    
                <Text style={ styles.headerTextData}>{t('SettingsScreen.title')}</Text>            
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>                            
                            <Text style={{ ...Fonts.blackColor16SemiBold }}>                         
                               {t('SettingsScreen.alertsTitle')}
                            </Text>                        
                        </View>
                    </View> 
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                            <Pressable
                                onPress={() => Alert.alert('Payment Method Change')}                            
                                >
                                <AntDesign name="arrowright" size={24} color="black" /> 
                            </Pressable>                                           
                        </View>
                    </View>                   
                </View>
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>                            
                            <Text style={{ ...Fonts.blackColor16SemiBold }}>                         
                               {t('SettingsScreen.languageTitle')}
                            </Text>                        
                        </View>
                    </View> 
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                            <Pressable
                                onPress={() => Alert.alert('Payment Method Change')}                            
                                >
                                <AntDesign name="arrowright" size={24} color="black" /> 
                            </Pressable>                                           
                        </View>
                    </View>                   
                </View>
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>                            
                            <Text style={{ ...Fonts.blackColor16SemiBold }}>                         
                               {t('SettingsScreen.termsOfUseTitle')}
                            </Text>                        
                        </View>
                    </View> 
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                            <Pressable
                                onPress={() => navigation.push('TermsOfUse', { slug: 'vilkar' })}                            
                                >
                                <AntDesign name="arrowright" size={24} color="black"/> 
                            </Pressable>                                           
                        </View>
                    </View>                   
                </View>
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>                            
                            <Text style={{ ...Fonts.blackColor16SemiBold }}>                         
                               {t('SettingsScreen.privacyTitle')}
                            </Text>                        
                        </View>
                    </View> 
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                            <Pressable
                                onPress={() => navigation.push('PrivacyPolicy', { slug: 'personvern' })}                          
                                >
                                <AntDesign name="arrowright" size={24} color="black" /> 
                            </Pressable>                                           
                        </View>
                    </View>                   
                </View>
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>                            
                            <Text style={{ ...Fonts.blackColor16SemiBold }}>                         
                               {t('SettingsScreen.deleteUserTitle')}
                            </Text>                        
                        </View>
                    </View> 
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                            <Pressable
                                onPress={() => Alert.alert('Payment Method Change')}                            
                                >
                                <AntDesign name="arrowright" size={24} color="black" /> 
                            </Pressable>                                           
                        </View>
                    </View>                   
                </View>
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>                            
                            <Text style={{ ...Fonts.blackColor16SemiBold }}>                         
                               {t('SettingsScreen.logoutTitle')}
                            </Text>                        
                        </View>
                    </View> 
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                            <Pressable
                                onPress={() => handleLogout()}                            
                                >
                                <AntDesign name="arrowright" size={24} color="black" /> 
                            </Pressable>                                           
                        </View>
                    </View>                   
                </View>
                <View style={styles.section}>
                    <Checkbox
                      style={styles.checkbox}
                      value={isChecked}
                      onValueChange={setChecked}
                      color={isChecked ? '#4630EB' : undefined}
                    />
                    <Text style={styles.paragraph}>{t('SettingsScreen.checkBoxLable')}</Text>
                </View>
                <View style={styles.sectionLast}>                    
                    <Text style={styles.lastText}>{t('SettingsScreen.emailNotShareLable')}</Text>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>  
                <View style={styles.headerKrushi}>
                    <Feather name="arrow-left-circle" size={40} color="black" style={styles.backArrowStyle} onPress={() => navigation.pop()}/>                    
                </View>  
                <AntDesign name="setting" size={40} color="black" style={styles.settingIconHeader} />
            </View>
        )
    }

}

export default AccountSettingsScreen;
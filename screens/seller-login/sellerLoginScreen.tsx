import React, { useState, createRef, useCallback, useEffect } from "react";
import { SafeAreaView, View, Image, ScrollView, StatusBar, TextInput, Pressable, StyleSheet, Text, ActivityIndicator} from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { FontAwesome5, MaterialIcons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import styles from './styles';
import { useForm, Controller } from "react-hook-form";
import * as EmailValidator from "email-validator";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SellerLoginScreen = ({ navigation }) => {  
    const { t, i18n } = useTranslation();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          seller_cnum: '',
          password: ''
        }
    });    
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [showPassword, setShowPassword] = useState(false); 

    useEffect(() => {
        AsyncStorage.getItem('user').then((user) => {
            if(user){
                navigation.push('BottomTabBar');
            }
        });       
    },[]);

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    };

    const onSubmit = async (data) => {      
        setLoading(true);      
        try {
            const payload = {
                seller_cnum: data.seller_cnum,
                password: data.password
            };
            const response = await axios.post(
                'sellerlogin-form', 
                payload,
                {
                    headers: {
                        'Content-Type': "application/json",
                        'Accept': 'application/json, text/plain, */*',
                    }  
                }   
            );
            if(response){ 
                setLoading(false);
                if(!response.data.status){
                    setError(response.data.message);
                }else{
                    setLoading(false);
                    //console.log(response.data.result[0]);
                    AsyncStorage.setItem('user', JSON.stringify(response.data.result[0]));
                    AsyncStorage.setItem('role', 'seller');
                    AsyncStorage.setItem('token', response.data.token);
                    navigation.push('BottomTabBar');
                }
            } 
        } catch (e) {
          setLoading(false); 
          console.log(e)       
        }
    };    

    return (
        <SafeAreaView style={{ flex: 1}}>            
                <StatusBar translucent={false} backgroundColor={Colors.whiteColor} />
                <View style={{marginHorizontal: Sizes.fixPadding}}>                
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 1.0, }}
                    >
                        {header()}
                        {loginForm()}
                    </ScrollView>                    
                </View>
        </SafeAreaView>
    )

    function loginForm() {
        return (
            <View style={styles.krushiIDProfileData}>
                <View style={styles.logoHeader}>
                    <Image 
                        source={require('../../assets/logo-krushi-horizontal.png')} 
                        style={{ width: '50%', height: 60, }}
                    />
                </View>
                <Text style={styles.headerTextData}>Seller {t('SignIn')}</Text>  
                <View style={styles.sectionBorder}></View>    
                {error && ( 
                    <View style={styles.section}>                   
                        <Text style={{...Fonts.redColor14Regular}}>{error}</Text>
                    </View>  
                )}       
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginBottom: Sizes.fixPadding * 2.0 }}>                            
                            <Text style={{ ...Fonts.blackColor14Regular }}>                         
                                {t('SignInPage.usernamelabel')}
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <FontAwesome5 name="mobile-alt" size={20} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}
                                    rules={{
                                     required: t('SignInPage.usernamevalidate.required'),
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (                                  
                                        <TextInput
                                            placeholderTextColor={Colors.grayColor}
                                            style={{ flex: 1, ...Fonts.blackColor14Regular }}                                            
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder={t('SignInPage.usernameplaceholder')}
                                            returnKeyType="next"
                                        />   
                                    )}
                                    name="seller_cnum"
                                />                                                  
                            </View>   
                            {errors.seller_cnum && <Text style={{ ...Fonts.redColor14Regular }}>{errors.seller_cnum.message}</Text>}                        
                        </View>
                    </View> 
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                            
                            <Text style={{ ...Fonts.blackColor14Regular }}>                         
                               {t('SignInPage.passwordlabel')}
                            </Text> 
                            <View style={styles.textInfoWrapStyle}>  
                                <MaterialIcons name="lock" size={20} color={Colors.orangeColor} style={styles.textIcon} />
                                <Controller
                                    control={control}
                                    rules={{
                                        required: t('SignInPage.passwordvalidate.required')
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextInput
                                        placeholderTextColor={Colors.grayColor}
                                        style={{ flex: 1, ...Fonts.blackColor14Regular }}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        secureTextEntry={!showPassword}
                                        placeholder={t('SignInPage.passwordplaceholder')}
                                      />
                                    )}
                                    name="password"
                                />   
                                <MaterialCommunityIcons 
                                    name={showPassword ? 'eye-off' : 'eye'} 
                                    size={20} color={Colors.orangeColor} style={styles.textIcon} 
                                    onPress={toggleShowPassword} 
                                />                                                
                            </View>
                            {errors.password && <Text style={{ ...Fonts.redColor14Regular }}>{errors.password.message}</Text>}                        
                        </View>
                    </View>          
                </View>               
                
                <Pressable                    
                    style={styles.krushiIDCheckMain}
                    disabled={isLoading}
                    onPress={handleSubmit(onSubmit)}>   
                        {isLoading && 
                            <ActivityIndicator size="small" color="#ffffff" />
                        }
                        {!isLoading && 
                            <Text style={{ ...Fonts.whiteColor16Medium }}>
                                {t('SignIn')}
                            </Text>
                        } 
                </Pressable>

                <View style={{ flex: 1 , marginTop: Sizes.fixPadding , flexDirection: 'row',}}>
                    <Text style={{ ...Fonts.blackColor16Regular }}>
                       Let’s go with
                    </Text>
                    <Pressable onPress={() => navigation.push('SellerSignupScreen')}>
                            <Text style={{ ...Fonts.blackColor16Bold, borderBottomWidth: 2.0, marginLeft: Sizes.fixPadding }}>
                                Sign Up
                            </Text>
                    </Pressable> 
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

export default SellerLoginScreen;
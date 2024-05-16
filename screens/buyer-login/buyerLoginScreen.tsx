import React, { useState, createRef, useEffect } from "react";
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

const BuyerLoginScreen = ({ route, navigation }) => {  

    const { product_id, is_login_from_product_detail} = route.params ? route.params : null;
    const { t, i18n } = useTranslation();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          buyer_mobile: '',
          password: ''
        }
    });    
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [showPassword, setShowPassword] = useState(false); 

    console.log(product_id);
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
                buyer_mobile: data.buyer_mobile,
                password: data.password
            };
            const response = await axios.post(
                'buyerlogin-form', 
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
                    AsyncStorage.setItem('role', 'buyer');
                    AsyncStorage.setItem('token', response.data.token);
                    if(is_login_from_product_detail != false){
                        navigation.navigate("ProductDetailScreen", { id: product_id })
                    }else{
                        navigation.push('BottomTabBar');
                    }
                   
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
                <Text style={styles.headerTextData}>Buyer {t('SignIn')}</Text>  
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
                                    name="buyer_mobile"
                                />                                                  
                            </View>   
                            {errors.buyer_mobile && <Text style={{ ...Fonts.redColor14Regular }}>{errors.buyer_mobile.message}</Text>}                        
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
                                        required: t('SignInPage.passwordvalidate.required'),
                                        minLength: {
                                            value: 7,
                                            message: t('SignInPage.passwordvalidate.lengthpassword'),
                                        }
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
                    <Pressable onPress={() => navigation.push('BuyerSignupScreen')}>
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

export default BuyerLoginScreen;
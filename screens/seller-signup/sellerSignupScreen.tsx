import React, { useState, createRef } from "react";
import { SafeAreaView, View, Image, ScrollView, StatusBar, TextInput, TouchableOpacity, StyleSheet, Text, ActivityIndicator, Pressable, Alert} from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, Feather, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import styles from './styles';
import { useForm, Controller } from "react-hook-form";
import * as EmailValidator from "email-validator";
import { useTranslation } from 'react-i18next';
import axios from "axios";

const SellerSignupScreen = ({ navigation }) => { 
    const { t, i18n } = useTranslation();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          seller_name: '',
          seller_last_name: '',
          seller_email: '',
          password: '',
          confirm_password: '',
          seller_cnum: '',
          seller_pan: ''
        }
    });     
    
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleShowConfirmPassword = () => { 
        setShowConfirmPassword(!showConfirmPassword); 
    };

    
    const [isChecked, setChecked] = useState(false);

    const onSubmit = async (data) => {
        console.log(data.seller_name);
        setLoading(true);      
        try { 
            const formData = new FormData();
            formData.append('seller_name', data.seller_name);
            formData.append('seller_last_name', data.seller_last_nam);
            formData.append('seller_cnum', data.seller_cnum);
            formData.append('seller_email', data.seller_email);
            formData.append('password', data.password);
            formData.append('seller_pan', data.seller_pan);

            const response = await axios.post(
                'sellersignup-form', 
                formData,
                {
                    headers: {
                        'Content-Type': "multipart/form-data",
                        'Accept': '*/*',
                    }   
                }   
            );
        
            if(response){ 
                setLoading(false);
                if(response.data.status){
                    Alert.alert("You've registred successfully. Please Login.");
                    navigation.navigate('SellerLoginScreen'); 
                }else{
                    Alert.alert(response.data.message);
                }                 
            } 
        } catch (e) {
          setLoading(false); 
          Alert.alert(e.response);
          console.log(e)       
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>            
                <StatusBar translucent={false} backgroundColor={Colors.bgGreyColor} />
                <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>                
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, }}
                    >
                        {header()}
                        {signUpForm()}
                    </ScrollView>                    
                </View>
        </SafeAreaView>
    )

    function signUpForm() {
        return (
             <View style={styles.krushiIDProfileData}>
                <View style={styles.logoHeader}>
                    <Image 
                        source={require('../../assets/logo-krushi-horizontal.png')} 
                        style={{ width: '50%', height: 60, }}
                    /> 
                </View>
                <Text style={styles.headerTextData}>Seller {t('SignUp')}</Text>  
                <View style={styles.sectionBorder}></View>    
                {error && ( 
                    <View style={styles.section}>                   
                        <Text style={{...Fonts.redColor14Regular}}>{error}</Text>
                    </View>  
                )}       
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                         
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               {t('SellerSignUpPage.firstnamelabel')}
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <FontAwesome5 name="user-alt" size={24} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}
                                    rules={{
                                     required: t('SellerSignUpPage.firstnamevalidate.required'),
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (                                  
                                        <TextInput
                                            placeholderTextColor={Colors.grayColor}
                                            style={{ flex: 1, ...Fonts.blackColor16Regular }}                                            
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder={t('SellerSignUpPage.firstnameplaceholder')}
                                        />   
                                    )}
                                    name="seller_name"
                                />                                                  
                            </View>   
                            {errors.seller_name && <Text style={{ ...Fonts.redColor14Regular }}>{errors.seller_name.message}</Text>}                        
                        </View>
                    </View> 
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                            
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               {t('SellerSignUpPage.lastnamelabel')}
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <FontAwesome5 name="user-alt" size={24} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}
                                    rules={{
                                     required: t('SellerSignUpPage.lastnamevalidate.required'),
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (                                  
                                        <TextInput
                                            placeholderTextColor={Colors.grayColor}
                                            style={{ flex: 1, ...Fonts.blackColor16Regular }}                                            
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder={t('SellerSignUpPage.lastnameplaceholder')}
                                        />   
                                    )}
                                    name="seller_last_name"
                                />                                                  
                            </View>   
                            {errors.seller_last_name && <Text style={{ ...Fonts.redColor14Regular }}>{errors.seller_last_name.message}</Text>}                        
                        </View>
                    </View> 
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                           
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               {t('SellerSignUpPage.emaillabel')}
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <MaterialCommunityIcons name="email-fast" size={24} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}
                                    rules={{
                                     required: t('SellerSignUpPage.emailvalidate.required'),
                                     validate: (value) =>
                                                EmailValidator.validate(value) ||
                                                t('SellerSignUpPage.emailvalidate.validemail'),
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (                                  
                                        <TextInput
                                            placeholderTextColor={Colors.grayColor}
                                            style={{ flex: 1, ...Fonts.blackColor16Regular }}                                            
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder={t('SellerSignUpPage.emailplaceholder')}
                                        />   
                                    )}
                                    name="seller_email"
                                />                                                  
                            </View>   
                            {errors.seller_email && <Text style={{ ...Fonts.redColor14Regular }}>{errors.seller_email.message}</Text>}                        
                        </View>
                    </View> 
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                            
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               {t('SellerSignUpPage.phonelabel')}
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <MaterialCommunityIcons name="cellphone" size={24} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}
                                    rules={{
                                     required: t('SellerSignUpPage.phonevalidate.required'),
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (                                  
                                        <TextInput
                                            placeholderTextColor={Colors.grayColor}
                                            style={{ flex: 1, ...Fonts.blackColor16Regular }}                                            
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder={t('SellerSignUpPage.phoneplaceholder')}
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
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               PAN Number
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <AntDesign name="idcard" size={24} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}
                                    rules={{
                                     required: 'Please enter PAN Number',
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (                                  
                                        <TextInput
                                            placeholderTextColor={Colors.grayColor}
                                            style={{ flex: 1, ...Fonts.blackColor16Regular }}                                            
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder={'PAN Number'}
                                        />   
                                    )}
                                    name="seller_pan"
                                />                                                  
                            </View>   
                            {errors.seller_pan && <Text style={{ ...Fonts.redColor14Regular }}>{errors.seller_pan.message}</Text>}                        
                        </View>
                    </View> 
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                            
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               {t('SellerSignUpPage.passwordlabel')}
                            </Text> 
                            <View style={styles.textInfoWrapStyle}>  
                                <MaterialIcons name="lock" size={24} color={Colors.orangeColor} style={styles.textIcon} />
                                <Controller
                                    control={control}
                                    rules={{
                                        required: t('SellerSignUpPage.passwordvalidate.required'),
                                        minLength: {
                                            value: 8,
                                            message: t('SellerSignUpPage.passwordvalidate.lengthpassword'),
                                        }
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextInput
                                        placeholderTextColor={Colors.grayColor}
                                        style={{ flex: 1, ...Fonts.blackColor16Regular }}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        secureTextEntry={!showPassword}
                                        placeholder={t('SellerSignUpPage.passwordplaceholder')}
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
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                            
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               {t('SellerSignUpPage.cpasswordlabel')}
                            </Text> 
                            <View style={styles.textInfoWrapStyle}>  
                                <MaterialIcons name="lock" size={24} color={Colors.orangeColor} style={styles.textIcon} />
                                <Controller
                                    control={control}
                                    rules={{
                                        required: t('SellerSignUpPage.cpasswordvalidate.required'),
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextInput
                                        placeholderTextColor={Colors.grayColor}
                                        style={{ flex: 1, ...Fonts.blackColor16Regular }}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        secureTextEntry={!showConfirmPassword}
                                        placeholder={t('SellerSignUpPage.passwordplaceholder')}
                                      />
                                    )}
                                    name="confirm_password"
                                />   
                                <MaterialCommunityIcons 
                                    name={showConfirmPassword ? 'eye-off' : 'eye'} 
                                    size={20} color={Colors.orangeColor} style={styles.textIcon} 
                                    onPress={toggleShowConfirmPassword} 
                                />                                                
                            </View>
                            {errors.confirm_password && <Text style={{ ...Fonts.redColor14Regular }}>{errors.confirm_password.message}</Text>}                        
                        </View>
                    </View>          
                </View>   

                <View style={{ flex: 1 , flexDirection: 'row',}}>
                    <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? Colors.orangeColor : Colors.orangeColor}
                    />
                    <View style={{ flex: 1 , marginTop: 5 , flexDirection: 'row',}}>
                        <Text style={styles.paragraph}>
                            I Agree To The 
                        </Text> 
                        <Pressable onPress={() => navigation.push('TermsScreen')}>
                            <Text style={{ ...Fonts.blackColor16Bold, borderBottomWidth: 0.5,marginLeft: 5 }}>
                                Terms Of Service
                            </Text> 
                        </Pressable>
                        <Text style={{ ...styles.paragraph, marginLeft: 5 }}>
                            & 
                        </Text> 
                        
                    </View> 
                    <Pressable onPress={() => navigation.push('PrivacyScreen')}>
                        <Text style={{ ...Fonts.blackColor16Bold, borderBottomWidth: 0.5, marginLeft: 5, marginTop: 40, flexShrink: 1}}>
                                Privacy Policy
                        </Text>
                    </Pressable> 
                </View>           
                
                <Pressable                    
                    style={styles.krushiIDCheckMain}
                    disabled={isLoading}
                    onPress={handleSubmit(onSubmit)}>   
                        {isLoading && 
                            <ActivityIndicator size="small" color="#ffffff" />
                        }
                        {!isLoading && 
                            <Text style={{ ...Fonts.whiteColor18Medium }}>
                                {t('SignUp')}
                            </Text>
                        } 
                </Pressable>

                <View style={{ flex: 1 , marginTop: Sizes.fixPadding , flexDirection: 'row',}}>
                    <Text style={{ ...Fonts.blackColor18Regular }}>
                       Existing Seller?
                    </Text>
                    <Pressable onPress={() => navigation.push('SellerLoginScreen')}>
                            <Text style={{ ...Fonts.blackColor18Bold, borderBottomWidth: 2.0, marginLeft: Sizes.fixPadding }}>
                                {t('SignIn')}
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

export default SellerSignupScreen;
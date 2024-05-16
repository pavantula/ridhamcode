import React, { useState, createRef } from "react";
import { SafeAreaView, View, Image, ScrollView, StatusBar, TextInput, TouchableOpacity, StyleSheet, Text, ActivityIndicator, Pressable} from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, Feather, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import styles from './styles';
import { useForm, Controller } from "react-hook-form";
import * as EmailValidator from "email-validator";
import { useTranslation } from 'react-i18next';

const SignupScreen = ({ navigation }) => { 
    const { t, i18n } = useTranslation();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          username: '',
          email: '',
          password: ''
        }
    });     
    
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const onSubmit = async (data) => {
        
    };

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>            
                <StatusBar translucent={false} backgroundColor={Colors.bgGreyColor} />
                <View style={{ flex: 1 }}>                
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
                <Text style={styles.headerTextData}>{t('SignUp')}</Text>  
                <View style={styles.sectionBorder}></View>    
                {error && ( 
                    <View style={styles.section}>                   
                        <Text style={{...Fonts.redColor14Regular}}>{error}</Text>
                    </View>  
                )}       
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginBottom: Sizes.fixPadding * 3.0 }}>                            
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               {t('SignupPage.usernamelabel')}
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <FontAwesome5 name="user-alt" size={24} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}
                                    rules={{
                                     required: t('SignupPage.usernamevalidate.required'),
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (                                  
                                        <TextInput
                                            placeholderTextColor={Colors.grayColor}
                                            style={{ flex: 1, ...Fonts.blackColor16Regular }}                                            
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder={t('SignupPage.usernameplaceholder')}
                                        />   
                                    )}
                                    name="username"
                                />                                                  
                            </View>   
                            {errors.username && <Text style={{ ...Fonts.redColor14Regular }}>{errors.username.message}</Text>}                        
                        </View>
                    </View> 
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginBottom: Sizes.fixPadding * 3.0 }}>                            
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               {t('SignupPage.emaillabel')}
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <MaterialCommunityIcons name="email-fast" size={24} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}
                                    rules={{
                                     required: t('SignupPage.emailvalidate.required'),
                                     validate: (value) =>
                                                EmailValidator.validate(value) ||
                                                t('SignupPage.emailvalidate.validemail'),
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (                                  
                                        <TextInput
                                            placeholderTextColor={Colors.grayColor}
                                            style={{ flex: 1, ...Fonts.blackColor16Regular }}                                            
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder={t('SignupPage.emailplaceholder')}
                                        />   
                                    )}
                                    name="email"
                                />                                                  
                            </View>   
                            {errors.email && <Text style={{ ...Fonts.redColor14Regular }}>{errors.email.message}</Text>}                        
                        </View>
                    </View> 
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 3.0 }}>                            
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               {t('SignupPage.passwordlabel')}
                            </Text> 
                            <View style={styles.textInfoWrapStyle}>  
                                <MaterialIcons name="lock" size={24} color={Colors.orangeColor} style={styles.textIcon} />
                                <Controller
                                    control={control}
                                    rules={{
                                        required: t('SignupPage.passwordvalidate.required'),
                                        minLength: {
                                            value: 7,
                                            message: t('SignupPage.passwordvalidate.lengthpassword'),
                                        }
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextInput
                                        placeholderTextColor={Colors.grayColor}
                                        style={{ flex: 1, ...Fonts.blackColor16Regular }}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        secureTextEntry={true}
                                        placeholder={t('SignupPage.passwordplaceholder')}
                                      />
                                    )}
                                    name="password"
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
                            <Text style={{ ...Fonts.whiteColor18Medium }}>
                                {t('SignUp')}
                            </Text>
                        } 
                </Pressable>

                <View style={{ flex: 1 , marginTop: Sizes.fixPadding , flexDirection: 'row',}}>
                    <Text style={{ ...Fonts.blackColor18Regular }}>
                       I have an already account.
                    </Text>
                    <Pressable onPress={() => navigation.push('LoginScreen')}>
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
                <Image
                    source={require('../../assets/images/krushi-logo.png')}
                    style={{ width: 132, height: 51, }}
                />                  
            </View>
        )
    }

}

const errorCodeToErrorMessageMap = {
  "auth/invalid-email": "It doesn't look like a valid email",
  "auth/email-already-in-use":
    'That user already exists. Try logging in instead?',
  "auth/weak-password":
    "Password was not secure enough. Try to make one that is a bit longer and consists of more words, for example.",
  fallback: "Something went wrong! Try again later.",
};

/** Maps error codes to a more readable error message */
export const mapErrorCodeToMessage = (
  errorCode: keyof typeof errorCodeToErrorMessageMap
) => {
  return (
    errorCodeToErrorMessageMap[errorCode] || errorCodeToErrorMessageMap.fallback
  );
};

export default SignupScreen;
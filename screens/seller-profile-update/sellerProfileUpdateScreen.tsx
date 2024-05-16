import React, { createRef, useState, useEffect, useRef } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, Pressable, FlatList, Image, Dimensions, StyleSheet, RefreshControl, ImageBackground, Text, TextInput, Alert, Animated, Platform, ActivityIndicator } from "react-native";
import { Colors, Fonts, Sizes, ElementsText, window } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { Menu } from 'react-native-material-menu';
import styles from './styles';
import { dummyProductsCategoryWise } from '../../data/productscategorywise'; 
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import axios from "axios";
import * as EmailValidator from "email-validator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'expo-linear-gradient';
import { DataTable } from 'react-native-paper'; 
import { Dropdown } from 'react-native-element-dropdown';
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';

import { useNavigation, draweractions } from "@react-navigation/native";

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const SellerProfileUpdateScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigation();
    const [user_data, setUserData] = useState({});
    const [state, setState] = useState({         
        showSnackBar: false,snackBarMsg: null,user_role: null
    });

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleShowConfirmPassword = () => { 
        setShowConfirmPassword(!showConfirmPassword); 
    };

    const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        defaultValues: {
          seller_name: '',
          seller_last_name: '',
          seller_email: '',
          password: '',
          confirm_password: '',
          seller_pan: '',
          seller_cnum: ''
        }
    });     
    
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
          getUserData();
        }, 2000);
    }, []);

    const getUserData = async () => {
        AsyncStorage.getItem('user').then( async (user) => {
            if(user){ 
                const user_array = JSON.parse(user);
                setUserData(user_array);
                try {
                    const formData = new FormData();
                    const token = await AsyncStorage.getItem('token');                   
                    formData.append('seller_id', user_array.seller_id);
                    const response = await axios.post(
                        'getsellerinfo', 
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `${token}`,
                            }  
                        }    
                    );
                    if(response){ 
                        setLoading(false);
                        if(!response.data.status){
                            setError(response.data.message);
                        }else{
                            setLoading(false);
                            console.log(response.data.result[0])
                            AsyncStorage.setItem('user', JSON.stringify(response.data.result[0]));
                            if(response.data.result[0]){
                                setValue('seller_name', response.data.result[0].seller_name); 
                                setValue('seller_last_name', response.data.result[0].seller_last_name); 
                                setValue('seller_email', response.data.result[0].seller_email); 
                                setValue('password', response.data.result[0].password); 
                                setValue('confirm_password', response.data.result[0].password); 
                                setValue('seller_pan', response.data.result[0].seller_pan); 
                                setValue('seller_cnum', response.data.result[0].seller_cnum);
                            }
                        }
                    } 
                } catch (e) {
                  setLoading(false); 
                  console.log(e)       
                }
                
            }
        });

        AsyncStorage.getItem('role').then((role) => {
            if(role){
                updateState({ user_role: role });
            }
        });
    }
    useEffect(() => { 
        AsyncStorage.getItem('token').then(async (token) => {
            if(!token){
                Alert.alert (
                    "Seller Profile",
                    "Please login again to get into this screen.",
                    [                              
                        {
                            text: 'OK',
                            onPress: () => {  
                                setTimeout(() => {
                                    navigation.navigate('SellerLoginScreen');
                                }, 2000);
                            },
                            style: 'OK',
                        },
                    ]
                );
            }else{
                getUserData();
            }
        });  
    },[]); 

    const onSubmit = async (data) => {
        setLoading(true);      
        try {        
            const formData = new FormData();
            const token = await AsyncStorage.getItem('token');                   
            formData.append('seller_id', user_data.seller_id);
            formData.append('seller_name', data.seller_name);
            formData.append('seller_last_name', data.seller_last_name);
            formData.append('seller_cnum', data.seller_cnum);
            formData.append('seller_email', data.seller_email);
            formData.append('password', data.password);
            formData.append('seller_pan', data.seller_adhar);
            
            const response = await axios.post(
                'updateseller-form', 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `${token}`,
                    }  
                }   
            );
        
            if(response){ 
                setLoading(false);
                if(response.data.status){
                    Alert.alert (
                        "Seller Profile Update",
                        "Profile has been updated successfully.",
                        [                              
                            {
                                text: 'OK',
                                onPress: () => {    
                                    setRefreshing(true);
                                    setTimeout(() => {
                                      setRefreshing(false);
                                      getUserData();
                                    }, 2000);
                                },
                                style: 'OK',
                            },
                        ],
                    );
                    navigation.navigate('BottomTabBar');
                }else{
                    setLoading(false);
                    Alert.alert(response.data.message)
                }      
            } 
        } catch (e) {
          setShowLoading(false); 
          console.log(e.response)       
        }
    };

    const signOutSeller = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Loader');
        }
        catch(exception) {
            return false;
        }
    }

    const {        
        showSnackBar,snackBarMsg,user_role
    } = state;
   
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGreyColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}> 
                {header()}
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                        <>                                    
                            {signUpForm()}
                        </>
                </ScrollView>  
            </View>
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => updateState({ showSnackBar: false })}
            >
                {snackBarMsg}
            </Snackbar>
        </SafeAreaView>
    )
    
    function signUpForm() {
        return (
             <View style={styles.krushiIDProfileData}>  
                {error && ( 
                    <View style={styles.section}>                   
                        <Text style={{...Fonts.redColor14Regular}}>{error}</Text>
                    </View>  
                )}       
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                         
                            <Text style={{ ...Fonts.blackColor14Medium }}>                         
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
                            <Text style={{ ...Fonts.blackColor14Medium }}>                         
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
                            <Text style={{ ...Fonts.blackColor14Medium }}>                         
                               {t('SellerSignUpPage.phonelabel')}
                            </Text> 
                            <View style={{...styles.textInfoWrapStyle, backgroundColor: Colors.borderLightColor}}> 
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
                                            readOnly
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
                            <Text style={{ ...Fonts.blackColor14Medium }}>                         
                               {t('SellerSignUpPage.emaillabel')}
                            </Text> 
                            <View style={{...styles.textInfoWrapStyle, backgroundColor: Colors.borderLightColor}}> 
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
                                            style={{ flex: 1, ...Fonts.blackColor16Regular,  }}                                            
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder={t('SellerSignUpPage.emailplaceholder')}
                                            readOnly
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
                            <Text style={{ ...Fonts.blackColor14Medium }}>                         
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
                            <Text style={{ ...Fonts.blackColor14Medium }}>                         
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
                            <Text style={{ ...Fonts.blackColor14Medium }}>                         
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
                
                <Pressable                    
                    style={styles.krushiIDCheckMain}
                    disabled={isLoading}
                    onPress={handleSubmit(onSubmit)}>   
                        {isLoading && 
                            <ActivityIndicator size="small" color="#ffffff" />
                        }
                        {!isLoading && 
                            <Text style={{ ...Fonts.whiteColor18Medium }}>
                                Update Profile
                            </Text>
                        } 
                </Pressable>                     
            </View>
        )
    }

    function header() {
        const input = createRef();
        return (
            <View style={styles.headerWrapStyle}>                            
                <Pressable onPress={() => navigation.pop()}> 
                    <Text style={{ ...Fonts.blackColor16Light,flexShrink: 1, textAlign: 'right', marginTop: Sizes.fixPadding  }}>
                        <Feather name="chevron-left" size={30} color="black" />   
                    </Text> 
                </Pressable>
                <View style={styles.headerKrushi}>
                    <Text style={styles.headerText}>Update Profile</Text>                   
                </View>                  
                <Pressable onPress={() => signOutSeller()}> 
                    <Text style={{ ...Fonts.blackColor16Light, marginLeft: Sizes.fixPadding,flexShrink: 1, textAlign: 'right', marginTop: Sizes.fixPadding  }}>
                        <AntDesign name="logout" size={24} color={Colors.greenColor} />
                    </Text> 
                </Pressable>
            </View>
        )
    }
}

export default SellerProfileUpdateScreen;
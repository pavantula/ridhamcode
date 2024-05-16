import React, { useState, createRef, useEffect } from "react";
import { SafeAreaView, View, Image, ScrollView, StatusBar, TextInput, TouchableOpacity, StyleSheet, Text, ActivityIndicator, Pressable, Alert, Dimensions} from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, Feather, AntDesign, FontAwesome5, Fontisto, Entypo} from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import styles from './styles';
import { useForm, Controller } from "react-hook-form";
import * as EmailValidator from "email-validator";
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-native-element-dropdown';
import {Picker} from '@react-native-picker/picker';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get('window');

const BuyerSignupScreen = ({ navigation }) => { 
    const { t, i18n } = useTranslation();

    const [state, setState] = useState({ 
        showSnackBar: false,snackBarMsg: null,
        user_data: null,user_role: null, 
        allCountries: [],selectedCountry: null,
        allStates: [],selectedState: null,
        allCities: [],selectedCities: null,
    });
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          first_name: '',
          last_name: '',
          buyer_short_address: '',
          buyer_address_1: '',
          buyer_address_2: '',
          buyer_email: '',
          buyer_password: '',
          buyer_signup_channel: '',
          buyer_mobile: '',
          buyer_pan: '',
          buyer_zip: '',
        }
    });     

    const [isChecked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const updateState = (data) => setState((state) => ({ ...state, ...data }))
    const [selectedGender, setSelectedGender] = useState('Select Gender');

     useEffect(() => { 
        AsyncStorage.getItem('token').then((token) => {
            if(token){
                Alert.alert (
                    "Buyer Profile",
                    "You are alreay loggedin. Please go to home screen.",
                    [                              
                        {
                            text: 'OK',
                            onPress: () => {  
                                setTimeout(() => {
                                    navigation.navigate('BottomTabBar');
                                }, 2000);
                            },
                            style: 'OK',
                        },
                    ]
                );
            }else{                
                getAllCountries();
            }
        }); 
    },[]); 

    const getAllCountries = async () => {
        try {         
            const response = await axios.post(
                'countrieslist',
                {
                    headers: {
                        'Content-Type': "application/json",
                        'Accept': 'application/json, text/plain, */*',
                    }  
                }   
            );
            if(response){               
                if(!response.data.status){
                    setError(response.data.message);
                }else{                                   
                    updateState({ allCountries: response.data.result });  
                }
            } 
        } catch (e) {          
            setError(e);    
        }
    }

    const getAllStates = async (item) => {
        updateState({ selectedCountry: item.id });   
        try {     
            const payload = {
                country_id: item.id
            };           
            const response = await axios.post(
                    'stateslist',
                    payload,
                    {
                        headers: {
                            'Content-Type': "application/json",
                            'Accept': 'application/json, text/plain, */*',
                        }  
                    }   
            );
            if(response){               
                if(!response.data.status){
                    setError(response.data.message);
                }else{                                   
                    updateState({ allStates: response.data.result });  
                }
            } 
        } catch (e) {          
            setError(e);    
        }
    }

    const updateCityData = async (item) => {
        try {            
            updateState({ selectedState: item.id });                          
            const payload = {
                state_id: item.id
            };
            const response = await axios.post(
                'citieslist',
                 payload,
                {
                    headers: {
                        'Content-Type': "application/json",
                        'Accept': 'application/json, text/plain, */*',
                    }  
                }   
            );
            if(response){               
                if(!response.data.status){
                    setError(response.data.message);
                }else{                                   
                    updateState({ allCities: response.data.result });  
                }
            } 
        } catch (e) {          
            setError(e);    
        }
    }

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    };

    const onSubmit = async (data) => {
        setLoading(true);      
        try { 
            const formData = new FormData();
            formData.append('first_name', data.first_name);           
            formData.append('last_name', data.last_name); 
            formData.append('buyer_gender', selectedGender); 
            formData.append('buyer_short_address', data.buyer_short_address);
            formData.append('buyer_address_1', data.buyer_address_1);
            formData.append('buyer_address_2', data.buyer_address_2);
            formData.append('buyer_mobile', data.buyer_mobile);
            formData.append('buyer_email', data.buyer_email);
            formData.append('buyer_city', selectedCities);
            formData.append('buyer_state', selectedState);
            formData.append('buyer_country', selectedCountry);
            formData.append('buyer_zip', data.buyer_zip);
            formData.append('buyer_pan', data.buyer_pan);
            formData.append('buyer_password', data.buyer_password);
            formData.append('buyer_signup_channel', '1');        
            
            const response = await axios.post(
                'buyersignup-form', 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': '*/*',
                    }   
                }   
            );
        
            if(response){ 
                setLoading(false);
                if(response.data.status){
                    Alert.alert("You have registred successfully. Please Login.");
                    navigation.navigate('BuyerLoginScreen'); 
                }else{
                    Alert.alert(response.data.message);
                }                 
            } 
        } catch (e) {
          setLoading(false); 
          Alert.alert(e.response);
          //console.log(e.response.data)       
        }
    };

    const {        
        showSnackBar,snackBarMsg,
        user_data,user_role,
        allCountries,selectedCountry,
        allStates,selectedState,
        allCities,selectedCities
    } = state;

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
                    {/*<Image
                        source={require('../../assets/images/krushi-logo.png')}
                        style={{ width: 132, height: 51,}}
                    /> */}
                </View>
                <Text style={styles.headerTextData}>Buyer {t('SignUp')}</Text>  
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
                               Gender
                            </Text> 
                            <View style={{ ...styles.textInfoWrapStyle, height: 65}}> 
                                <Fontisto name="persons" size={24} color={Colors.orangeColor} style={styles.textIcon} />
                                <Picker
                                  selectedValue={selectedGender}
                                  style={{width: width }} 
                                  mode={"dialog"} 
                                  onValueChange={(itemValue, itemIndex) =>
                                    setSelectedGender(itemValue)
                                  }>
                                  <Picker.Item label="Select Gender" value="" style={{ ...Fonts.blackColor16Regular }} />
                                  <Picker.Item label="Male" value="Male" style={{ ...Fonts.blackColor16Regular }} />
                                  <Picker.Item label="Female" value="Female" style={{ ...Fonts.blackColor16Regular }} />
                                </Picker> 
                            </View>               
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                         
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               Short Address
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <Entypo name="address" size={24} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}
                                    rules={{
                                     required: 'Please enter short address',
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (                                  
                                        <TextInput
                                            placeholderTextColor={Colors.grayColor}
                                            style={{ flex: 1, ...Fonts.blackColor16Regular }}                                            
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder={'Short address'}
                                        />   
                                    )}
                                    name="buyer_short_address"
                                />                                                  
                            </View>   
                            {errors.buyer_short_address && <Text style={{ ...Fonts.redColor14Regular }}>{errors.buyer_short_address.message}</Text>}                        
                        </View>
                    </View> 

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                         
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               Address Line 1
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <FontAwesome5 name="address-book" size={24} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}
                                    rules={{
                                     required: 'Please enter address line 1',
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (                                  
                                        <TextInput
                                            placeholderTextColor={Colors.grayColor}
                                            style={{ flex: 1, ...Fonts.blackColor16Regular }}                                            
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder={'Address Line 1'}
                                        />   
                                    )}
                                    name="buyer_address_1"
                                />                                                  
                            </View>   
                            {errors.buyer_address_1 && <Text style={{ ...Fonts.redColor14Regular }}>{errors.buyer_address_1.message}</Text>}                        
                        </View>
                    </View> 


                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                         
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               Address Line 2
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <FontAwesome5 name="address-book" size={24} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}                                    
                                    render={({ field: { onChange, onBlur, value } }) => (                                  
                                        <TextInput
                                            placeholderTextColor={Colors.grayColor}
                                            style={{ flex: 1, ...Fonts.blackColor16Regular }}                                            
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder={'Address Line 2'}
                                        />   
                                    )}
                                    name="buyer_address_2"
                                />                                                  
                            </View>   
                            {errors.buyer_address_2 && <Text style={{ ...Fonts.redColor14Regular }}>{errors.buyer_address_2.message}</Text>}                        
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                         
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               Country
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <FontAwesome5 name="globe-asia" size={24} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={allCountries}
                                        search
                                        maxHeight={300}
                                        labelField="name"
                                        valueField="id"
                                        placeholder="Select Country"
                                        searchPlaceholder="Search..."
                                        value={selectedCountry}
                                        onChange={item => {
                                          getAllStates(item);
                                        }}                        
                                        renderItem={item => {
                                            return (
                                                <View style={styles.itemStyle}>
                                                  <Text style={styles.textItem}>{item.name}</Text>
                                                </View>
                                            );
                                        }}
                                />                                                  
                            </View>                    
                        </View>
                    </View>  

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                         
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               State
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <FontAwesome5 name="place-of-worship" size={24} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={selectedCountry != null ? styles.placeholderStyle : styles.disablePlaceholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={allStates}
                                        search
                                        maxHeight={300}
                                        labelField="name"
                                        valueField="id"
                                        placeholder="Select State"
                                        searchPlaceholder="Search..."
                                        value={selectedState}
                                        onChange={item => {
                                          updateCityData(item);
                                        }}                        
                                        renderItem={item => {
                                            return (
                                                <View style={styles.itemStyle}>
                                                  <Text style={styles.textItem}>{item.name}</Text>
                                                </View>
                                            );
                                        }}
                                        disable={selectedCountry != null ? false : true}
                                />                                                  
                            </View>                    
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                         
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               City
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <FontAwesome5 name="location-arrow" size={24} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={selectedState != null ? styles.placeholderStyle : styles.disablePlaceholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={allCities}
                                    search
                                    maxHeight={300}
                                    labelField="name"
                                    valueField="id"
                                    placeholder="Select City"
                                    searchPlaceholder="Search..."
                                    value={selectedCities}
                                    onChange={item => {
                                      updateState({ selectedCities: item.id });
                                    }}                        
                                    renderItem={item => {
                                        return (
                                            <View style={styles.itemStyle}>
                                              <Text style={styles.textItem}>{item.name}</Text>
                                            </View>
                                        );
                                    }}
                                    disable={selectedState != null ? false : true}
                                  />                                                       
                            </View>                    
                        </View>
                    </View> 

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                         
                            <Text style={{ ...Fonts.blackColor16Regular }}>                         
                               Pincode
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <MaterialIcons name="place" size={24} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}     
                                    rules={{
                                     required: 'Please enter your pincode',
                                    }}                               
                                    render={({ field: { onChange, onBlur, value } }) => (                                  
                                        <TextInput
                                            placeholderTextColor={Colors.grayColor}
                                            style={{ flex: 1, ...Fonts.blackColor16Regular }}                                            
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder={'Your Pincode'}
                                        />   
                                    )}
                                    name="buyer_zip"
                                />                                                  
                            </View>   
                            {errors.buyer_zip && <Text style={{ ...Fonts.redColor14Regular }}>{errors.buyer_zip.message}</Text>}                        
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
                                    name="buyer_email"
                                />                                                  
                            </View>   
                            {errors.buyer_email && <Text style={{ ...Fonts.redColor14Regular }}>{errors.buyer_email.message}</Text>}                        
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
                                    name="buyer_mobile"
                                />                                                  
                            </View>   
                            {errors.buyer_mobile && <Text style={{ ...Fonts.redColor14Regular }}>{errors.buyer_mobile.message}</Text>}                        
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
                                     required: 'Please enter your PAN number',
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
                                    name="buyer_pan"
                                />                                                  
                            </View>   
                            {errors.buyer_pan && <Text style={{ ...Fonts.redColor14Regular }}>{errors.buyer_pan.message}</Text>}                        
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
                                    name="buyer_password"
                                />    
                                <MaterialCommunityIcons 
                                    name={showPassword ? 'eye-off' : 'eye'} 
                                    size={20} color={Colors.orangeColor} style={{ ...styles.textIcon, marginLeft: Sizes.fixPadding * 2.0, }} 
                                    onPress={toggleShowPassword} 
                                />                                               
                            </View>
                            {errors.buyer_password && <Text style={{ ...Fonts.redColor14Regular }}>{errors.buyer_password.message}</Text>}                        
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
                                        secureTextEntry={true}
                                        placeholder={t('SellerSignUpPage.passwordplaceholder')}
                                      />
                                    )}
                                    name="confirm_password"
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
                                Sign Up
                            </Text>
                        } 
                </Pressable>

                <View style={{ flex: 1 , marginTop: Sizes.fixPadding , flexDirection: 'row',}}>
                    <Text style={{ ...Fonts.blackColor18Regular }}>
                       I have an already account.
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

export default BuyerSignupScreen;
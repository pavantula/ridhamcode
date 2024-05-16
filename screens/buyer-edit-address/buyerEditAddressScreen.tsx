import React, { createRef, useState, useEffect, useRef } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, Pressable, FlatList, Image, Dimensions, RefreshControl, StyleSheet, ImageBackground, Text, TextInput, Alert, Animated, Platform, ActivityIndicator } from "react-native";
import { Colors, Fonts, Sizes, ElementsText, window } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { Menu } from 'react-native-material-menu';
import styles from './styles';
import { dummyProductsCategoryWise } from '../../data/productscategorywise'; 
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import axios from "axios";
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

const address_place = [
    {
        name: 'Home',
        value: 'Home'
    },
    {
        name: 'Office',
        value: 'Office'
    },
    {
        name: 'Other',
        value: 'Other'
    }
];

const BuyerEditAddressScreen = ({ route, navigation }) => {
    const { t, i18n } = useTranslation();
    const { shiping_info_id } = route.params;
    const navigate = useNavigation();
    const [token, setToken] = useState();
    const [state, setState] = useState({         
        showSnackBar: false,snackBarMsg: null,
        user_data: null,user_role: null, 
        allCountries: [],selectedCountry: null,
        allStates: [],selectedState: null,
        allCities: [],selectedCities: null,
        selectedAddressPlace: null,
    });
    const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        defaultValues: {
          buyer_short_address: '',
          buyer_address_1: '',
          buyer_address_2: '',
          buyer_zip: '',
        }
    });  
    
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            getUserData();
            generateAddresss();
            getAllCountry();
            getAllStates();
        }, 2000);
    }, []);

    const getUserData = async () => {
        AsyncStorage.getItem('user').then((user) => {
            if(user){                
                updateState({ user_data: JSON.parse(user) });
            }
        });

        AsyncStorage.getItem('role').then((role) => {
            if(role){
                updateState({ user_role: role });
            }
        });  
    }   

    const generateAddresss = () => {
        AsyncStorage.getItem('token').then(async (token) => {
            if(!token){
                navigation.navigate('BuyerLoginScreen');
            }
        });
        AsyncStorage.getItem('user').then(async (user) => {
            if(user){
                const user_array = JSON.parse(user);
                const token = await AsyncStorage.getItem('token');
                try {
                    const payload = {
                        buyer_id: user_array.buyer_id
                    };
                    const response = await axios.post(
                        'buyeraddress', 
                        payload,
                        {
                            headers: {
                                'Authorization': `${token}`,
                            }  
                        }
                    );
                    if(response){
                        if(!response.data.status){
                            setError(response.data.message);
                        }else{
                            const processedData = response.data.result.filter(item => item.shiping_info_id === shiping_info_id);
                            updateState({ 
                                selectedAddressPlace: processedData[0].address_label, 
                                selectedCountry: processedData[0].buyer_country !== undefined ? parseInt(processedData[0].buyer_country, 10) : '',
                                selectedState: processedData[0].buyer_state !== undefined ? processedData[0].buyer_state : '',                                
                                selectedCities: processedData[0].buyer_city !== undefined ? parseInt(processedData[0].buyer_city, 10) : '',
                            });  
                            updateCityData(processedData[0].buyer_state !== undefined ? parseInt(processedData[0].buyer_state, 10) : '');
                            setValue('buyer_short_address', processedData[0].buyer_short_address);
                            setValue('buyer_zip', processedData[0].buyer_zip);
                            setValue('buyer_address_1', processedData[0].buyer_address_1);
                            setValue('buyer_address_2', processedData[0].buyer_address_2);
                        }
                    } 
                } catch (e) {                   
                    console.log(e);
                }
            }
        }); 
    };

    useEffect(() => { 
        AsyncStorage.getItem('token').then((token) => {
            if(!token){
                Alert.alert (
                    "Buyer Add Address",
                    "Please login again to get into this screen.",
                    [                              
                        {
                            text: 'OK',
                            onPress: () => {  
                                setTimeout(() => {
                                    navigation.navigate('BuyerLoginScreen');
                                }, 2000);
                            },
                            style: 'OK',
                        },
                    ]
                );
            }else{
                setToken(token);
                getUserData();
                generateAddresss();
                getAllCountry();
                getAllStates();
            }
        }); 

    },[]); 

    const getAllCountry = async () => {
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


    const getAllStates = async () => {
        try {     
            const payload = {
                country_id: '101'
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


    const onSubmit = async (data) => {
        setLoading(true);      
        try {  
            const formData = new FormData();
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user');
            const user_data = JSON.parse(user);
            formData.append('buyer_id', user_data.buyer_id);           
            formData.append('buyer_name', user_data.first_name+" "+user_data.last_name);                      
            formData.append('address_label', selectedAddressPlace);
            formData.append('buyer_short_address', data.buyer_short_address);
            formData.append('buyer_address_1', data.buyer_address_1);
            formData.append('buyer_address_2', data.buyer_address_2);
            formData.append('buyer_mobile', user_data.buyer_mobile);
            formData.append('buyer_email', user_data.buyer_email);
            formData.append('buyer_city', selectedCities);
            formData.append('buyer_state', selectedState);
            formData.append('buyer_country', selectedCountry);
            formData.append('buyer_zip', data.buyer_zip);
            formData.append('shiping_info_id', shiping_info_id);
            
            const response = await axios.post(
                'editbuyeraddress', 
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
                    Alert.alert(response.data.message);
                    navigation.pop(); 
                }else{
                    Alert.alert(response.data.message);
                }                 
            } 
        } catch (e) {
          setLoading(false); 
          console.log(e.response)       
        }
    };
    
    const {        
        showSnackBar,snackBarMsg,
        user_data,user_role,
        allCountries,selectedCountry,
        allStates,selectedState,
        allCities,selectedCities,
        selectedAddressPlace
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
                            {homescreensections()}
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
    
    function homescreensections() {        
        return (            
            <>    
                <View style={styles.categorySlides}>
                    <Text style={styles.fieldLabel}>Address Location</Text>
                    <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={address_place}
                            search
                            maxHeight={300}
                            labelField="name"
                            valueField="value"
                            placeholder="Select Address Place"
                            searchPlaceholder="Search..."
                            value={selectedAddressPlace}
                            onChange={item => {
                              updateState({ selectedAddressPlace: item.value });
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
                <View style={styles.categorySlides}>                          
                    <Text style={styles.fieldLabel}>                         
                        Short Address
                    </Text> 
                    <View style={styles.textInfoWrapStyle}>
                        <Controller
                            control={control}
                            rules={{
                                required: 'Short Address is required',
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (                                  
                                <TextInput
                                    placeholderTextColor={Colors.grayColor}
                                    style={{ flex: 1, ...Fonts.blackColor14Regular }}                                            
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder={'Your Short Address'}
                                />   
                            )}
                            name="buyer_short_address"
                        />                                                  
                    </View>   
                    {errors.buyer_short_address && <Text style={{ ...Fonts.redColor14Regular, marginHorizontal: Sizes.fixPadding, }}>{errors.buyer_short_address.message}</Text>}                        
                </View>  
                <View style={styles.categorySlides}>                          
                    <Text style={styles.fieldLabel}>                         
                        Address Line 1
                    </Text> 
                    <View style={styles.textInfoWrapStyle}>
                        <Controller
                            control={control}
                            rules={{
                                required: 'Address Line 1 is required',
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (                                  
                                <TextInput
                                    placeholderTextColor={Colors.grayColor}
                                    style={{ flex: 1, ...Fonts.blackColor14Regular }}                                            
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder={'Your Address Line 1'}
                                />   
                            )}
                            name="buyer_address_1"
                        />                                                  
                    </View>   
                    {errors.buyer_address_1 && <Text style={{ ...Fonts.redColor14Regular, marginHorizontal: Sizes.fixPadding, }}>{errors.buyer_address_1.message}</Text>}                        
                </View>           
                <View style={styles.categorySlides}>                          
                    <Text style={styles.fieldLabel}>                         
                        Address Line 2
                    </Text> 
                    <View style={styles.textInfoWrapStyle}>
                        <Controller
                            control={control}
                            rules={{
                                required: 'Address Line 2 is required',
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (                                  
                                <TextInput
                                    placeholderTextColor={Colors.grayColor}
                                    style={{ flex: 1, ...Fonts.blackColor14Regular }}                                            
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder={'Your Address Line 2'}
                                />   
                            )}
                            name="buyer_address_2"
                        />                                                  
                    </View>   
                    {errors.buyer_address_2 && <Text style={{ ...Fonts.redColor14Regular, marginHorizontal: Sizes.fixPadding, }}>{errors.buyer_address_2.message}</Text>}                        
                </View>
                <View style={styles.categorySlides}>
                    <Text style={styles.fieldLabel}>Your Country</Text>
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
                              updateState({ selectedCountry: item.id });
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
                
                <View style={styles.categorySlides}>
                    <Text style={styles.fieldLabel}>Your State</Text>
                    <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
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
                    />              
                </View>
                <View style={styles.categorySlides}>
                        <Text style={styles.fieldLabel}>Your City</Text>
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
                            placeholder="Select State"
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
                
                <View style={styles.categorySlides}>                          
                    <Text style={styles.fieldLabel}>                         
                        Your Pincode
                    </Text> 
                    <View style={styles.textInfoWrapStyle}>
                        <Controller
                            control={control}
                            rules={{
                                required: 'Pincode is required',
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (                                  
                                <TextInput
                                    placeholderTextColor={Colors.grayColor}
                                    style={{ flex: 1, ...Fonts.blackColor14Regular }}                                            
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder={'Your Pincode Name'}
                                />   
                            )}
                            name="buyer_zip"
                        />                                                  
                    </View>   
                    {errors.buyer_zip && <Text style={{ ...Fonts.redColor14Regular, marginHorizontal: Sizes.fixPadding, }}>{errors.buyer_zip.message}</Text>}                        
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
                            Update Address
                        </Text>
                    } 
                </Pressable>
            </>
        )
    }

    function divider() {
        return (
            <View style={{
                backgroundColor: Colors.borderLightColor,
                height: 2.0,
                margin: Sizes.fixPadding * 2.0,
            }} />
        )
    }

    function header() {
        const input = createRef();
        return (
            <View style={styles.headerWrapStyle}>                            
                <Pressable onPress={() => navigation.pop()}> 
                    <Text style={{ ...Fonts.blackColor16Light, marginTop: Sizes.fixPadding  }}>
                        <Feather name="chevron-left" size={30} color="black" />   
                    </Text> 
                </Pressable>
                <View style={styles.headerKrushi}>
                    <Text style={styles.headerText}>Edit Delivery Address</Text>                   
                </View>  
            </View>
        )
    }
}

export default BuyerEditAddressScreen;
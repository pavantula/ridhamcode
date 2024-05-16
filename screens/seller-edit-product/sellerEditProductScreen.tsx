import React, { createRef, useState, useEffect, useRef } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, Pressable, FlatList, Image, Dimensions, StyleSheet, ImageBackground, Text, TextInput, Alert, Animated, RefreshControl, Platform, ActivityIndicator } from "react-native";
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

import { useNavigation, draweractions, useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const SellerEditProductScreen = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const { t, i18n } = useTranslation();
    const { product_id } = route.params;
    const navigate = useNavigation();
    const [token, setToken] = useState();
    const [state, setState] = useState({ 
        allCategories: [],selectedCategory: null,
        allProductNames: [],selectedProduct: null,
        allProductQualities: [],selectedQuality: null,
        allProductTypes: [],selectedType: null,
        allProductVariety: [],selectedVariety: null,
        allProductAvailableIn: [],selectedAvailableIn: null,
        showSnackBar: false,snackBarMsg: null,
        user_data: null,user_role: null, 
        allStates: [],selectedState: null,
        allCities: [],selectedCities: null,
    });
    const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm();  
    const [date, setDate] = useState(new Date());
    const [cropYear, setCropYear] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [modeCropYear, setCropYearMode] = useState('date');
    const [showCropYear, setCropYeraShow] = useState(false);
    const [textAvailableDate, setTextAvailableDate] = useState('Select Available Date');
    const [textCropYear, setTextCropYear] = useState('Select Crop Year');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
          getProductData();
        }, 2000);
    }, []);

    const getProductData = () => {
        AsyncStorage.getItem('role').then((role) => {
            if(role){
                updateState({ user_role: role });
            }
        });
        AsyncStorage.getItem('user').then(async (user) => {
            if(user){                
                updateState({ user_data: JSON.parse(user) });
                const user_array = JSON.parse(user);
                const payload = {
                    seller_id: user_array.seller_id,
                    product_id: product_id
                };
                try {                
                    const response = await axios.post(
                        'getsellerproductinfo',
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
                            //console.log(response.data.result);
                            updateCategory(response.data.result);
                            updateState({ 
                                selectedCategory: response.data.result.category_id, 
                                selectedProduct: parseInt(response.data.result.product_name, 10),
                                selectedQuality: response.data.result.product_quality,
                                selectedType: response.data.result.product_type,
                                selectedVariety: parseInt(response.data.result.product_variety, 10),
                                selectedAvailableIn: response.data.result.product_available,
                                selectedState: response.data.result.product_state !== undefined ? parseInt(response.data.result.product_state) : '',
                                selectedCities: response.data.result.product_city !== undefined ? parseInt(response.data.result.product_city) : '',
                            });  
                            updateCityData(response.data.result.product_state !== undefined ? parseInt(response.data.result.product_state) : '');
                            setValue('district', response.data.result.product_district);
                            setValue('pincode', response.data.result.product_pincode);
                            setDate(response.data.result.product_available_from);
                            let product_available_from = new Date(response.data.result.product_available_from);
                            let strDate = product_available_from.getDate() + '/' + (product_available_from.getMonth() + 1) + '/' + product_available_from.getFullYear();
                            setTextAvailableDate(strDate); 
                            setCropYear(response.data.result.product_model);
                            let product_model = new Date(response.data.result.product_model);
                            let strModelDate = product_model.getDate() + '/' + (product_model.getMonth() + 1) + '/' + product_model.getFullYear();
                            setTextCropYear(strModelDate); 
                        }
                    } 
                } catch (e) {          
                    setError(e);    
                }
            }
        });
    };

    const fetchCategoryData = async () => {
        try {                
            const response = await axios.post(
                'categorys',
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
                    updateState({ allCategories: response.data.result });  
                }
            } 
        } catch (e) {          
                setError(e);    
        }
    }  

    useEffect(() => { 
        AsyncStorage.getItem('token').then((token) => {
            if(token){
                setToken(token);
                getAllStates();
                getProductData();
                fetchCategoryData();
                updateQuality();  
                updateTypes();
                updateVariety();
                updateAvailableIn();
            }
        });  
        if (isFocused) {    
            getAllStates();        
            getProductData();
            fetchCategoryData();
            updateQuality();  
            updateTypes();
            updateVariety();
            updateAvailableIn();
        }
    },[isFocused]); 

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

    const updateCityData = async (state_id) => {
        try {            
            updateState({ selectedState: state_id });                          
            const payload = {
                state_id: state_id
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

    const updateCategory = async (item) => {
        try {            
            updateState({ selectedCategory: item.category_id });                          
            const payload = {
                category_id: item.category_id
            };
            const response = await axios.post(
                'productsvalues',
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
                    updateState({ allProductNames: response.data.result });  
                }
            } 
        } catch (e) {          
            setError(e);    
        }
    }

    const updateQuality = async (item) => {
        try {  
            const response = await axios.post(
                'getproductquality',
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
                    updateState({ allProductQualities: response.data.result });  
                }
            } 
        } catch (e) {          
            setError(e);    
        }
    }

    const updateTypes = async (item) => {
        try {
            const response = await axios.post(
                'getproducttype',
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
                    updateState({ allProductTypes: response.data.result });  
                }
            } 
        } catch (e) {          
            setError(e);    
        }
    }

    const updateVariety = async (item) => {
        try {
            const response = await axios.post(
                'getproductvariety',
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
                    updateState({ allProductVariety: response.data.result });  
                }
            } 
        } catch (e) {          
            setError(e);    
        }
    }

    const updateAvailableIn = async (item) => {
        try {
            const response = await axios.post(
                'getproductavailable',
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
                    updateState({ allProductAvailableIn: response.data.result });  
                }
            } 
        } catch (e) {          
            setError(e);    
        }
    }

    const signOutSeller = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Loader');
        }
        catch(exception) {
            return false;
        }
    }

    const onSubmit = async (data) => {
        setLoading(true); 
        try {
            const payload = {
                product_name: selectedProduct,
                category_id: selectedCategory,
                product_quality: selectedQuality,
                product_type: selectedType,
                product_available: selectedAvailableIn,
                product_variety: selectedVariety,
                product_available_from: Moment(date).format('YYYY-MM-d'),
                product_model: Moment(cropYear).format('YYYY'),
                product_city: selectedCities,
                product_district: data.district,
                product_state: selectedState,
                product_pincode: data.pincode
            };
            //console.log(payload);
            AsyncStorage.setItem('step_one', JSON.stringify(payload));
            setLoading(false);
            navigation.push('SellerEditProductLocation', { step_one: payload, product_id: product_id });
        } catch (e) {
          setLoading(false); 
          console.log(e)       
        }
    };

    const onChang = (event, selectDate) => {
        const currentDate = selectDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setTextAvailableDate(fDate);
    }

    const onChangeCropYear = (event, selectDate) => {
        const currentDate = selectDate || date;
        setCropYeraShow(Platform.OS === 'ios');
        setCropYear(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setTextCropYear(fDate);
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const showCropYearMode = (currentMode) => {
        setCropYeraShow(true);
        setCropYearMode(currentMode);
    }

    const {        
        allCategories,selectedCategory,
        allProductNames,selectedProduct,
        allProductQualities,selectedQuality,
        allProductTypes,selectedType,
        allProductVariety,selectedVariety,
        allProductAvailableIn,selectedAvailableIn,
        showSnackBar,snackBarMsg,
        user_data,user_role,
        allStates,selectedState,
        allCities,selectedCities
    } = state;
    // console.log(selectedState)
    // console.log(selectedCities)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGreyColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>     
                <ScrollView
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                        {header()}
                        {homescreensections()}
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
                    <Text style={styles.sectionTitle}>Basic Configuration</Text>
                </View>
                <View style={styles.categorySlides}>
                    <Text style={styles.fieldLabel}> Procuct Category</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={allCategories}
                        search
                        maxHeight={300}
                        labelField="category_name"
                        valueField="category_id"
                        placeholder="Select Product Category"
                        searchPlaceholder="Search..."
                        value={selectedCategory}
                        onChange={item => {
                          updateCategory(item);
                        }}                        
                        renderItem={item => {
                            return (
                                <View style={styles.itemStyle}>
                                  <Text style={styles.textItem}>{item.category_name}</Text>
                                </View>
                            );
                        }}
                      />
                </View>
                {divider()}
                <View style={styles.categorySlides}>
                    <Text style={styles.fieldLabel}>Procuct Name</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={selectedCategory != null ? styles.placeholderStyle : styles.disablePlaceholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={allProductNames}
                        search
                        maxHeight={300}
                        labelField="product_name"
                        valueField="product_settings_id"
                        placeholder="Select Product Name"
                        searchPlaceholder="Search..."
                        value={selectedProduct}
                        onChange={item => {
                          updateState({ selectedProduct: item.product_settings_id });
                        }}                        
                        renderItem={item => {
                            return (
                                <View style={styles.itemStyle}>
                                  <Text style={styles.textItem}>{item.product_name}</Text>
                                </View>
                            );
                        }}
                        disable={selectedCategory != null ? false : true}
                      />
                </View>
                {divider()}
                <View style={styles.categorySlides}>
                    <Text style={styles.fieldLabel}>Product Quality</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={selectedProduct != null ? styles.placeholderStyle : styles.disablePlaceholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={allProductQualities}
                        search
                        maxHeight={300}
                        labelField="product_quality_name"
                        valueField="product_quality_id"
                        placeholder="Select Product Quality"
                        searchPlaceholder="Search..."
                        value={selectedQuality}
                        onChange={item => {
                          updateState({ selectedQuality: item.product_quality_id });
                        }}                        
                        renderItem={item => {
                            return (
                                <View style={styles.itemStyle}>
                                  <Text style={styles.textItem}>{item.product_quality_name}</Text>
                                </View>
                            );
                        }}
                        disable={selectedProduct != null ? false : true}
                      />
                </View>
                {divider()}
                <View style={styles.categorySlides}>
                    <Text style={styles.fieldLabel}>Product Type</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={selectedProduct != null ? styles.placeholderStyle : styles.disablePlaceholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={allProductTypes}
                        search
                        maxHeight={300}
                        labelField="product_type_name"
                        valueField="product_type_id"
                        placeholder="Select Product Type"
                        searchPlaceholder="Search..."
                        value={selectedType}
                        onChange={item => {
                          updateState({ selectedType: item.product_type_id });
                        }}                        
                        renderItem={item => {
                            return (
                                <View style={styles.itemStyle}>
                                  <Text style={styles.textItem}>{item.product_type_name}</Text>
                                </View>
                            );
                        }}
                        disable={selectedProduct != null ? false : true}
                      />
                </View>
                {divider()}
                <View style={styles.categorySlides}>
                    <Text style={styles.fieldLabel}>Product Variety</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={selectedProduct != null ? styles.placeholderStyle : styles.disablePlaceholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={allProductVariety}
                        search
                        maxHeight={300}
                        labelField="product_variety_name"
                        valueField="product_variety_id"
                        placeholder="Select Product Variety"
                        searchPlaceholder="Search..."
                        value={selectedVariety}
                        onChange={item => {
                          updateState({ selectedVariety: item.product_variety_id });
                        }}                        
                        renderItem={item => {
                            return (
                                <View style={styles.itemStyle}>
                                  <Text style={styles.textItem}>{item.product_variety_name}</Text>
                                </View>
                            );
                        }}
                        disable={selectedProduct != null ? false : true}
                      />
                </View>
                {divider()}
                <View style={styles.categorySlides}>
                    <Text style={styles.fieldLabel}>Available In</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={selectedProduct != null ? styles.placeholderStyle : styles.disablePlaceholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={allProductAvailableIn}
                        search
                        maxHeight={300}
                        labelField="product_available_name"
                        valueField="product_available_id"
                        placeholder="Select Product Available In"
                        searchPlaceholder="Search..."
                        value={selectedAvailableIn}
                        onChange={item => {
                          updateState({ selectedAvailableIn: item.product_available_id });
                        }}                        
                        renderItem={item => {
                            return (
                                <View style={styles.itemStyle}>
                                  <Text style={styles.textItem}>{item.product_available_name}</Text>
                                </View>
                            );
                        }}
                        disable={selectedProduct != null ? false : true}
                      />
                </View>
                {divider()}
                <View style={styles.categorySlides}>                          
                    <Text style={styles.fieldLabel}>                         
                        Available From
                    </Text> 
                    <View style={styles.textInfoWrapStyle}>
                        <Controller
                            control={control}                            
                            render={({ field: { onChange, onBlur, value } }) => (                                  
                                <TextInput
                                    placeholderTextColor={Colors.grayColor}
                                    style={{ flex: 1, ...Fonts.blackColor14Regular }}                                            
                                    onBlur={onBlur}
                                    onChangeText={() => setDate()}
                                    value={textAvailableDate}
                                    placeholder={'Select Available From'}
                                    editable={false}
                                />   
                            )}
                            name="product_available_from"
                        />  
                        <MaterialIcons name="date-range" size={30} color={Colors.orangeColor} style={styles.textIcon} onPress={() => showMode('date')}/>
                        {show &&
                            <DateTimePicker
                                testID='dateTimePicker'
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display='default'
                                onChange={onChang}
                                accentColor={Colors.orangeColor}
                                style={styles.dateTimePicker}
                            />
                        }
                    </View>   
                    {errors.product_available_from && <Text style={{ ...Fonts.redColor14Regular, marginHorizontal: Sizes.fixPadding, }}>{errors.product_available_from.message}</Text>}                        
                </View>

                <View style={styles.categorySlides}>                          
                    <Text style={styles.fieldLabel}>                         
                        Crop Year
                    </Text> 
                    <View style={styles.textInfoWrapStyle}>
                        <Controller
                            control={control}                           
                            render={({ field: { onChange, onBlur, value } }) => (                                  
                                <TextInput
                                    placeholderTextColor={Colors.grayColor}
                                    style={{ flex: 1, ...Fonts.blackColor14Regular }}                                            
                                    onBlur={onBlur}
                                    onChangeText={() => setCropYear()}
                                    value={textCropYear}
                                    placeholder={'Select Crop Year'}
                                    editable={false}
                                />   
                            )}
                            name="product_model"
                        />  
                        <MaterialIcons name="date-range" size={30} color={Colors.orangeColor} style={styles.textIcon} onPress={() => showCropYearMode('date')}/>
                        {showCropYear &&
                            <DateTimePicker
                                testID='dateTimePickerProductModel'
                                value={cropYear}
                                mode={modeCropYear}
                                is24Hour={true}
                                display='default'
                                onChange={onChangeCropYear}
                                accentColor={Colors.orangeColor}
                                style={styles.dateTimePicker}
                            />
                        }
                    </View>   
                    {errors.product_model && <Text style={{ ...Fonts.redColor14Regular, marginHorizontal: Sizes.fixPadding, }}>{errors.product_model.message}</Text>}                        
                </View>
                {divider()}
                <View style={styles.categorySlides}>
                    <Text style={styles.fieldLabel}>State</Text>
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
                              updateCityData(item.id);
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
                        <Text style={styles.fieldLabel}>City</Text>
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
                <View style={styles.categorySlides}>                          
                    <Text style={styles.fieldLabel}>                         
                        District
                    </Text> 
                    <View style={styles.textInfoWrapStyle}>
                        <Controller
                            control={control}
                            rules={{
                                required: 'District is required',
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (                                  
                                <TextInput
                                    placeholderTextColor={Colors.grayColor}
                                    style={{ flex: 1, ...Fonts.blackColor14Regular }}                                            
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder={'Your District Name'}
                                />   
                            )}
                            name="district"
                        />                                                  
                    </View>   
                    {errors.district && <Text style={{ ...Fonts.redColor14Regular, marginHorizontal: Sizes.fixPadding, }}>{errors.district.message}</Text>}                        
                </View>
                <View style={styles.categorySlides}>                          
                    <Text style={styles.fieldLabel}>                         
                        Pincode
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
                            name="pincode"
                        />                                                  
                    </View>   
                    {errors.pincode && <Text style={{ ...Fonts.redColor14Regular, marginHorizontal: Sizes.fixPadding, }}>{errors.pincode.message}</Text>}                        
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
                            Next
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
                <Pressable onPress={() => signOutSeller()}> 
                    <Text style={{ ...Fonts.blackColor16Light,flexShrink: 1, textAlign: 'right', marginTop: Sizes.fixPadding  }}>
                        <Feather name="chevron-left" size={30} color="black" onPress={() => navigation.pop()}/>   
                    </Text> 
                </Pressable>
                <View style={styles.headerKrushi}>
                    <Text style={styles.headerText}>Edit Product</Text>                   
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

export default SellerEditProductScreen;
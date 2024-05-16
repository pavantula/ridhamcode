import React, { createRef, useState, useEffect, useRef } from "react";
import { SafeAreaView, View, Button, StatusBar, ScrollView, Pressable, Alert, FlatList, Image, Dimensions, StyleSheet, ImageBackground, Text, TextInput, Animated, PermissionsAndroid, Platform, ActivityIndicator, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, ElementsText, window } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { Menu } from 'react-native-material-menu';
import styles from './styles';
import { dummyProductsCategoryWise } from '../../data/productscategorywise'; 
import { useTranslation } from 'react-i18next';
import moment from "moment";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'expo-linear-gradient';
import { DataTable } from 'react-native-paper'; 
import { Dropdown } from 'react-native-element-dropdown';
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper'; 
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

import { useNavigation, draweractions } from "@react-navigation/native";

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const SellerEditProductScreenImages = ({ route, navigation, props }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigation();
    const [user_data, setUserData] = useState();
    const { step_one, step_two, step_three, product_id, totalQuantity } = route.params;
    const [state, setState] = useState({ 
        showSnackBar: false,snackBarMsg: null,user_role: null, 
    });

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const updateState = (data) => setState((state) => ({ ...state, ...data }))
    useEffect(() => { 
        const getUser = async () => {
            try {
                await AsyncStorage.getItem('user').then(async(user) => {
                    if(user){
                        setUserData(JSON.parse(user));
                        const payload = {
                            seller_id: user.seller_id,
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
                                    if(response.data.result.product_gallery.length > 0){
                                        let product_gallery = response.data.result.product_gallery;
                                        const gallery = [];                                                            
                                        for(let i = 0; i < product_gallery.length; i++){ 
                                            const file =  {                            
                                                id: generateRandomNumber(),
                                                itemPhoto: product_gallery[i],
                                                itemDescription: 'Picture '+ i,
                                            };
                                            gallery.push(file);
                                        }
                                        setDisplayPhotos(gallery);
                                    }else{
                                        setDisplayPhotos('')
                                    }
                                }
                            } 
                        } catch (e) {          
                            setError(e);    
                        }
                    }
                });

                await AsyncStorage.getItem('role').then((role) => {
                    if(role){
                        updateState({ user_role: role });
                    }
                });  
            } catch (err) {
              console.log(err);
            }
        };
        getUser();         
    },[]); 

    const [image, setImage] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState('');
    let [askedPermissionOnLoad, setAskedPermissionOnLoad] = useState(false);
    const [photos, setAddPhotos] = useState();
    const [itemPhotosList, setDisplayPhotos] = useState();
    const [count, setCounter] = useState(1);
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => {
        if (!askedPermissionOnLoad && Platform.OS === 'android') {
            setAskedPermissionOnLoad(true);
            setTimeout(() => {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            }, 500);
        }       
    }, [props]);

    const generateRandomNumber = () => {
        var RandomNumber = Math.floor(Math.random() * 100) + 1;
        return RandomNumber;
    }

    const verifyAndroidPermissions = async () => {
        if (Platform.OS === 'android') {
            const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            if (result !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Insufficient Permission', 'You need to allow storage permissions in order to use this app', [{ text: 'OK' }]);
            }
        }
        return true;
    };

    const verifyCameraPermissions = async () => {
        const result = await Camera.requestCameraPermissionsAsync();
        if (result.status !== 'granted') {
            Alert.alert('Insufficient Permission', 'You need to allow camera permissions in order to use this app', [{ text: 'OK' }]);
            return false;
        }
        return true;
    };
   
    const pickImages = async () => {
        const hasPermissions = await verifyAndroidPermissions();
        if (!hasPermissions) {
            Alert.alert('Insufficient Permission', 'You need to allow storage permissions in order to use this app');
            return;
        }

        try {
            const image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
            });

            if (!image.canceled) {
                const files = image.assets;
                
                const all_files = files.map((file) => {
                    return {
                        id: generateRandomNumber(),
                        uri: file.uri,
                        width: file.width,
                        height: file.height,
                        type: file.type,
                    };
                });

                const all_display_files = files.map((file,index) => {
                    setCounter(count+1);
                    return {                            
                        id: generateRandomNumber(),
                        itemPhoto: file.uri,
                        itemDescription: 'Picture '+ index,
                    };
                                      
                });                                  

                useEffect(                    
                  setAddPhotos(all_files),
                  setDisplayPhotos(all_display_files),
                  [itemPhotosList,photos]
                );
            } else {
                console.log('image selection cancelled');
            }
        } catch (err) {
            // if (err.message.indexOf('Can not save result to the file', 0) > -1) {
            //     Alert.alert(
            //         'Image Not Exists',
            //         'The image you have selected does not exists on your phone & showing its reference only\n\n' +
            //         'Select image from specific storage instead from Downloads App / Recent Files');
            // } else {
            //Alert.alert("Invalid Image", "This image can't be selected, There seems some issue with this image.");
            //}
            return;
        }

    };

    const deleteImage = (id) => {
        const updated_array = photos.filter(item => item.id !== id);
        setAddPhotos(updated_array);

        const updated_display_array = itemPhotosList.filter(item => item.id !== id);
        setDisplayPhotos(updated_display_array);

        if (photos !== undefined && photos.length <= 5) {
            setInputError('');
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

     const onSubmit = async () => { 
        setLoading(true);      
        try {        
            const formData = new FormData();
            const token = await AsyncStorage.getItem('token');
            formData.append('product_name', step_one.product_name);           
            formData.append('category_id', step_one.category_id);                      
            formData.append('seller_id', user_data.seller_id);
            formData.append('product_quality', step_one.product_quality);
            formData.append('product_type', step_one.product_type);
            formData.append('product_available', step_one.product_available);
            formData.append('product_variety', step_one.product_variety);
            formData.append('prod_units', step_three.prod_units);
            formData.append('product_available_from', step_one.product_available_from);
            formData.append('product_model', step_one.product_model);
            formData.append('product_city', step_one.product_city);
            formData.append('product_district', step_one.product_district);
            formData.append('product_state', step_one.product_state);
            formData.append('product_pincode', step_one.product_pincode);
            formData.append('price_type', step_three.price_type);
            formData.append('unit', step_three.unit);
            formData.append('onsale_price', step_three.onsale_price);
            formData.append('status', '1');
            formData.append('varible_prices', JSON.stringify(step_three.varible_prices));
            formData.append('product_gallery', []);
            formData.append('location', JSON.stringify(step_two.locations));
            formData.append('new_product_gallery', photos);
            formData.append('product_id', product_id);
            
            const response = await axios.post(
                'updateproduct-form', 
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
                    Alert.alert("Product Updated Successfully");
                    navigation.navigate('BottomTabBar');
                }else{
                    Alert.alert(response.data.message)
                }      
            } 
        } catch (e) {
          setLoading(false); 
          console.log(e.response)       
        }
    };


    const {  
        showSnackBar,snackBarMsg,user_role,
    } = state;
   
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGreyColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>     

                <FlatList
                    ListHeaderComponent={
                        <>                                    
                            {homescreensections()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding + 20.0, }}
                />
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
                {header()}
                <View style={styles.categorySlides}>
                    <Text style={styles.sectionTitle}>Image Configuration</Text>
                </View>
                {stuffPhotosSection()}
                <Pressable                    
                    style={styles.krushiIDCheckMain}
                    disabled={isLoading}
                    onPress={() => onSubmit()}
                    >   
                    {isLoading && 
                        <ActivityIndicator size="small" color="#ffffff" />
                    }
                    {!isLoading && 
                        <Text style={{ ...Fonts.whiteColor18Medium }}>
                            Update Product
                        </Text>
                    } 
                </Pressable>
            </>
        )
    }

    function stuffPhotosSection(){
        return (
            <View style={styles.categorySlides}>
                <View style={styles.itemPhotosTitleWrapStyle}>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        Product Images
                    </Text>
                </View>
                <FlatList
                    data={itemPhotosList}
                    keyExtractor={(item) => `${item.id}`}                
                    renderItem={({item, index}) => {
                        return (
                        <View style={{ alignItems: 'center', marginRight: Sizes.fixPadding, }} key={index}> 
                            <TouchableOpacity activeOpacity={0.9} onPress={() => deleteImage(item.id)}>               
                                <Ionicons 
                                    name="close-circle-sharp" 
                                    size={22} 
                                    color={Colors.blackColor} 
                                    style={styles.removeIcon}/>
                            </TouchableOpacity>
                            <Image
                                source={{ uri: item.itemPhoto }}
                                style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding - 5.0, }}
                            />
                            <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor10SemiBold }}>
                                {item.itemDescription}
                            </Text>
                        </View> 
                        )}
                    }
                    contentContainerStyle={{ marginHorizontal: Sizes.fixPadding * 2.0, }} 
                    numColumns={4}                  
                />                
                {selectPhotoesBlade()}
            </View>
        );
    }

    function selectPhotoesBlade() {
        return (
            <>
            <TouchableOpacity activeOpacity={0.9} onPress={pickImages}>
                <View style={{ ...styles.cameraBlade }}>   
                    <View style={styles.addPhotoIconWrapStyle}>
                        <MaterialIcons
                            name="image"
                            color={'#B4B4B4'}
                            size={24}
                        />
                    </View>
                    <View style={{ ...styles.viewTextRadioButton, marginTop: 0, }}>
                        <Text style={{ ...styles.subHeadingText, marginTop: 0, }}>Upload Product Images</Text>
                    </View> 
                </View>
            </TouchableOpacity>
            {inputError && inputError !== "" &&
                <Text style={{ flex: 1, marginLeft: Sizes.fixPadding + 10.0,fontSize: 14, color: '#D10000', fontFamily: 'Poppins_Medium' }}>{inputError}</Text>
            } 
            </>
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

export default SellerEditProductScreenImages;
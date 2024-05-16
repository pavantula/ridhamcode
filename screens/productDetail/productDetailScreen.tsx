import React, { useState, useEffect, useRef } from "react";
import type { PropsWithChildren } from 'react';
import { SafeAreaView, View, Image, Dimensions, StatusBar, FlatList, StyleSheet, Text, ImageBackground,TouchableOpacity, Pressable, Alert, TextInput, RefreshControl, ScrollView, ActivityIndicator} from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, Feather, AntDesign, EvilIcons, Ionicons} from '@expo/vector-icons';
import CollapsingToolbar from "../../components/sliverAppBarScreen";
import CollapsibleView from '../../components/CollapsibleView';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';
import { Snackbar } from "react-native-paper";
import styles from './styles';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from 'moment';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetRefProps } from '../../components/BottomSheet';
import {useIsFocused} from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";

type AccordionItemPros = PropsWithChildren<{
  title: string;
}>;

const { width } = Dimensions.get('window');

const productImagesList = [
    require('../../assets/images/mobiles/mobile6.png'),
];

const ProductDetailScreen = ({ navigation, route }) => {

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
          pincode: ''
        }
    }); 
    const isFocused = useIsFocused();

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
    }, []);

    const textInputRef = useRef();

    const [state, setState] = useState({
        inFavorite: false,
        showSnackBar: false,
        addresses: [],
        productImages: [],
        productData: [],
        productSellersData: [],
        activeSlide: 0,
        user_data: null,user_role: null,
        selected_addresss: null, selected_zip_code: null, 
    })

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(); 

    const [isLoggedIn, setUserIsLoggedIn] = useState(false);
    
    const [cartValues, setCartValues] = useState([]);

    const ref = useRef<BottomSheetRefProps>(null); 

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    function AccordionItem({ children, title }: AccordionItemPros): JSX.Element {
      const [ expanded, setExpanded ] = useState(false);

      function toggleItem() {
        setExpanded(!expanded);
      }

      const body = <View style={styles.accordBody}>{ children }</View>;

      return (
        <View style={styles.accordContainer}>
          <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }>
            <Text style={styles.accordTitle}>{ title }</Text>
            <Feather
                    name={ expanded ? 'chevron-up' : 'chevron-down' }
                    color={Colors.blackColor}
                    size={20}
                />
          </TouchableOpacity>
          { expanded && body }
        </View>
      );
    }

    const getUserData = async () => {
        AsyncStorage.getItem('user').then((user) => {
            if(user){                
                const user_array = JSON.parse(user);
                // if(user_array.buyer_zip !== ''){
                //     setBuyerZipCode(user_array.buyer_zip);
                // }
                updateState({ user_data: JSON.parse(user) });
            }
        });

        AsyncStorage.getItem('role').then((role) => {
            if(role){
                updateState({ user_role: role });
            }
        });

        AsyncStorage.getItem('selected_address').then((address) => {
            console.log("address:", address)
            if(address != null){
                updateState({ selected_addresss: address });
            }else{
                updateState({ selected_addresss: null });
            }
        });

        AsyncStorage.getItem('zip_code').then((zip) => {
            console.log("zip:", zip)
            if(zip != null){
                updateState({ selected_zip_code: zip });
            }else{
                updateState({ selected_zip_code: null });
            }
        });  
    }

    const onPressOpenBottomSheet = () => {
        const isActive = ref?.current?.isActive();
        if (isActive) {
            ref?.current?.scrollTo(0);
        } else {
            ref?.current?.scrollTo(-600);
        } 
    };

    const generateAddresss = () => {
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
                            const processedData = Object.values(response.data.result);
                            updateState({ addresses: processedData }); 
                        }
                    } 
                } catch (e) { 
                    console.log(e); 
                }
            }
        }); 
    };

    const unsetBuyerZipCode = async () => {        
        try {
            setRefreshing(true);    
            await AsyncStorage.setItem('zip_code', '');
            await AsyncStorage.setItem('selected_address', '');             
            getUserData();
            setTimeout(() => {               
                fetchProductData();
                setRefreshing(false);
            }, 2000);             
        } catch (e) {
            console.log(e);
        }              
    }

    const changeZipCode = async (zip_code, shiping_info_id) => {
        try {
            setRefreshing(true);
            await AsyncStorage.setItem('zip_code', zip_code.toString());
            await AsyncStorage.setItem('selected_address', shiping_info_id.toString());       
            getUserData();     
            setTimeout(() => {                
              fetchProductData();
              setRefreshing(false);
            }, 2000); 
            ref?.current?.scrollTo(0);
        } catch (e) {
            console.log(e);
        }        
    }

    const onSubmit = async (data) => {
        try {
            setRefreshing(true);
            await AsyncStorage.setItem('zip_code', data.pincode);
            await AsyncStorage.setItem('selected_address', '');            
            setTimeout(() => {
                updateState({ selected_zip_code: data.pincode});
                updateState({ selected_addresss: null});
                fetchProductData();
                setRefreshing(false);
            }, 2000); 
            ref?.current?.scrollTo(0);
        } catch (e) {
            console.log(e);
        }  
    };
    

    const onChangeQuantity = (location_id, product_id, qty, seller_id) => {
        // console.log(selected_addresss)
        console.log(qty);
        if(selected_addresss == null){
            Alert.alert (
                "Check Pincode Availability",
                "Please check if products are delivered in your Pincode First!",
                [                              
                    {
                        text: 'OK',
                        onPress: () => {    
                            
                        },
                        style: 'OK',
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () => {    
                        setRefreshing(true);
                        setTimeout(() => {
                            setRefreshing(false);
                        }, 2000);
                    },
                },
            );
        }else{
            if(cartValues.length > 0){
                const i = cartValues.findIndex(e => e.location_id === location_id);
                if (i > -1) {
                    if(qty == ""){
                        const _inputs = [...cartValues];
                        _inputs.splice(i, 1);
                        setCartValues(_inputs);
                    }else{
                        const _inputs = [...cartValues];
                        _inputs[i].product_qty = qty;
                        _inputs[i].product_id = route.params.id;
                        _inputs[i].seller_id = seller_id;                    
                        _inputs[i].buyer_id = user_data.buyer_id;
                        setCartValues(_inputs);
                    }                    
                }else{
                    setCartValues([...cartValues, {
                        location_id: location_id,
                        product_qty: qty,
                        product_id: route.params.id,
                        seller_id: seller_id,
                        buyer_id: user_data.buyer_id
                   }])
                }  
            }else{
                setCartValues([{
                    location_id: location_id,
                    product_qty: qty,
                    product_id: route.params.id,
                    seller_id: seller_id,
                    buyer_id: user_data.buyer_id
                }])
            }
        }
    }

    const fetchProductData = async () => {        
        AsyncStorage.getItem('user').then(async (user) => {
            if(user){
                const user_array = JSON.parse(user);                
                const token = await AsyncStorage.getItem('token');
                const zip = await AsyncStorage.getItem('zip_code');
                console.log("selected_zip_code:", zip);
                try {                          
                    const formData = new FormData();
                    formData.append('product_id', route.params.id);
                    if(zip != null){
                        formData.append('buyer_zip', zip);
                    }                    
                    const response = await axios.post(
                            'product',
                            formData,
                            {
                                headers: {
                                    'Content-Type': "multipart/form-data",
                                    'Accept': '*/*',
                                }  
                            }   
                    );
                    if(response){               
                        if(!response.data.status){
                                setError(response.data.message);
                            }else{                                                  
                                updateState({ productData: response.data.result[0] });
                                const array = [
                                    response.data.result[0].image_thumb
                                ];  
                                const imageList = response.data.result[0].product_images ? response.data.result[0].product_images.split(",") : array;
                                
                                updateState({ productImages: imageList });  
                                const sellers = response.data.sellers;
                                updateState({ productSellersData: sellers });
                            }
                        } 
                } catch (e) {          
                    setError(e);    
                }
            }else{
                try {                                    
                    const formData = new FormData();
                    formData.append('product_id', route.params.id);
                    const response = await axios.post(
                            'product',
                            formData,
                            {
                                headers: {
                                    'Content-Type': "multipart/form-data",
                                    'Accept': '*/*',
                                }  
                            }   
                    );
                    if(response){               
                        if(!response.data.status){
                                setError(response.data.message);
                            }else{                                                  
                                updateState({ productData: response.data.result[0] });
                                const array = [
                                    response.data.result[0].image_thumb
                                ];  
                                const imageList = response.data.result[0].product_images ? response.data.result[0].product_images.split(",") : array;
                                
                                updateState({ productImages: imageList });  
                                const sellers = response.data.sellers;
                                updateState({ productSellersData: sellers });
                            }
                        } 
                } catch (e) {          
                        setError(e);    
                }
            }
        }); 
    };

    const onCartSubmit = async () => {
        try {
            if(cartValues.length > 0){
                const token = await AsyncStorage.getItem('token');
                for(var i = 0; i < cartValues.length; i++){
                    const formData = new FormData();
                    formData.append('product_id', cartValues[i].product_id);
                    formData.append('seller_id', cartValues[i].seller_id);
                    formData.append('location_id', cartValues[i].location_id);
                    formData.append('product_qty', cartValues[i].product_qty);
                    formData.append('buyer_id', cartValues[i].buyer_id);
                    const response = await axios.post(
                        'addtocart',
                        formData,
                        {
                            headers: {
                                'Content-Type': "multipart/form-data",
                                'Authorization': `${token}`,
                            }  
                        }   
                    );
                }
                Alert.alert(
                    "Add To Cart",
                    "Products Added to cart successfully!",
                    [                              
                        {
                            text: 'OK',
                            onPress: () => {    
                                navigation.navigate('BuyerCheckout');
                            },
                            style: 'OK',
                        },
                    ],
                    {
                        cancelable: true,
                        onDismiss: () => {    
                            setRefreshing(true);
                            setTimeout(() => {
                                setRefreshing(false);
                            }, 2000);
                        },
                    },
                );
            }
        } catch (e) {
            Alert.alert(
                "Add To Cart Error",
                "There is some problem for adding products in cart. Please try again later after some time!",
                [                              
                    {
                        text: 'OK',
                        onPress: () => {    
                            
                        },
                        style: 'OK',
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () => {    
                        setRefreshing(true);
                        setTimeout(() => {
                            setRefreshing(false);
                        }, 2000);
                    },
                },
            );
        }
    } 
    
    useEffect(() => {       
        AsyncStorage.getItem('user').then((user) => {
            if(user){
                setUserIsLoggedIn(true);
            }else{
                setUserIsLoggedIn(false);
            }
        });
        if (isFocused) {            
            getUserData();
            fetchProductData();
            generateAddresss();
        }         
    },[isFocused]);

    const {
        inFavorite,
        showSnackBar,
        addresses,
        productImages,
        productData,
        productSellersData,
        activeSlide,
        user_data,user_role,
        selected_addresss, selected_zip_code
    } = state;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <CollapsingToolbar
                leftItem={
                    <MaterialIcons
                        name="arrow-back-ios"
                        size={20}
                        color={Colors.whiteColor}
                        onPress={() => navigation.pop()}
                    />
                }
                // rightItem={
                //     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>                        
                //         <MaterialIcons
                //             name="share"
                //             size={20}
                //             color={Colors.whiteColor}
                //             style={{ marginLeft: Sizes.fixPadding }}
                //         />
                //     </View>
                // }
                element={productImagesSlider()}
                borderBottomRadius={15}
                toolbarColor={Colors.primaryColor}
                toolbarMinHeight={StatusBar.currentHeight + 40.0}
                toolbarMaxHeight={350}
                src={{ uri: productData.image_thumb }}
            >
                <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['transparent']}
          style={{backgroundColor: 'transparent'}}
          progressBackgroundColor='transparent'/>
                }>
                    <View style={{ paddingBottom: Sizes.fixPadding * 7.0 }}>
                        {productDetail()}
                        {divider()}
                        {productDescription()}
                        {productDailyValues()}
                        {divider()}
                        {isLoggedIn && checkAvailability()}                    
                        {divider()}
                        {isLoggedIn && productSellers()}
                        {!isLoggedIn && productAfterLoggedInTag()}
                    </View>
                </ScrollView>
                
            </CollapsingToolbar>
            {isLoggedIn && cartValues.length > 0 && (
                <Pressable disabled={cartValues.length > 0 ? false : true} onPress={() => onCartSubmit()}>
                    <View style={cartValues.length > 0 ? styles.buttonAddToCartEnabled : styles.buttonAddToCartDisabled}>
                        <Text style={styles.addToCartText}>Add To Cart</Text>                
                        <AntDesign name="shoppingcart" size={30} color={Colors.whiteColor} />
                    </View>
                </Pressable>
            )}
            {isLoggedIn && cartValues.length <= 0 && (
                <Pressable disabled={cartValues.length > 0 ? false : true} onPress={() => onCartSubmit()}>
                    <View style={cartValues.length > 0 ? styles.buttonAddToCartEnabled : styles.buttonAddToCartDisabled}>
                        <Text style={styles.addToCartText}>Add To Cart</Text>                
                        <AntDesign name="shoppingcart" size={30} color={Colors.whiteColor} />
                    </View>
                </Pressable>
            )}
            <Snackbar
                visible={showSnackBar}
                style={styles.snackBarStyle}
                onDismiss={() => updateState({ showSnackBar: false })}
            >
                {inFavorite ? 'Added To favorite' : 'Removed From Favorite'}
            </Snackbar>
            {refreshing && (
                <View style={styles.loading}>
                  <ActivityIndicator size='large' color={Colors.greenColor}/>
                </View>
            )}
        </SafeAreaView>
        {filterModal()}
        </GestureHandlerRootView>
    )

    
    function productDescription() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding}}>
                <AccordionItem title="Description">
                    <Text style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 0.0, ...Fonts.blackColor14Regular }}>
                        {productData != null ? productData.description : 'Product Name'}
                    </Text>
                </AccordionItem>
            </View>
        )
    }

    function productDailyValues() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding }}>
                {productData != null && 
                productData.carbohydrates != null && 
                productData.cholesterol != null && 
                productData.energy != null && 
                productData.fat != null && 
                productData.fiber != null && 
                productData.monosaturated_fats != null && 
                productData.polyunsaturated_fats != null && 
                productData.potassium != null && 
                productData.saturated_fats != null && 
                productData.sodium != null && 
                productData.sugar != null && (
                <AccordionItem title={productData != null ? productData.product_name+' (100g serving)' : 'Product Values'}>
                    <View style={styles.nutritionStyle}>
                        <Text style={styles.nutritionTitle}>
                            Carbohydrates
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.carbohydrates+' '+productData.carbohydrates_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle2}>
                        <Text style={styles.nutritionTitle}>
                            Cholesterol
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.cholesterol+' '+productData.cholesterol_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle}>
                        <Text style={styles.nutritionTitle}>
                            Energy
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.energy+' '+productData.energy_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle2}>
                        <Text style={styles.nutritionTitle}>
                            Fat
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.fat+' '+productData.fat_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle}>
                        <Text style={styles.nutritionTitle}>
                            Fiber
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.fiber+' '+productData.fiber_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle2}>
                        <Text style={styles.nutritionTitle}>
                            Monosaturated Fats
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.monosaturated_fats+' '+productData.monosaturated_fats_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle}>
                        <Text style={styles.nutritionTitle}>
                            Polyunsaturated Fats
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.polyunsaturated_fats+' '+productData.polyunsaturated_fats_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle2}>
                        <Text style={styles.nutritionTitle}>
                            Potassium
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.potassium+' '+productData.potassium_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle}>
                        <Text style={styles.nutritionTitle}>
                            Saturated Fats
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.saturated_fats+' '+productData.saturated_fats_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle2}>
                        <Text style={styles.nutritionTitle}>
                            Sodium
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.sodium+' '+productData.sodium_fats_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle}>
                        <Text style={styles.nutritionTitle}>
                            Sugar
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.sugar+' '+productData.sugar_fats_qty : 'Product Name'}
                        </Text>
                    </View>
                </AccordionItem>
                )}
                {productData != null && 
                productData.carbohydrates != null || 
                productData.cholesterol != null || 
                productData.energy != null || 
                productData.fat != null && 
                productData.fiber != null || 
                productData.monosaturated_fats != null || 
                productData.polyunsaturated_fats != null || 
                productData.potassium != null || 
                productData.saturated_fats != null || 
                productData.sodium != null || 
                productData.sugar != null && (
                <AccordionItem title={productData != null ? productData.product_name+' (100g serving)' : 'Product Values'}>
                    <View style={styles.nutritionStyle}>
                        <Text style={styles.nutritionTitle}>
                            Carbohydrates
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.carbohydrates+' '+productData.carbohydrates_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle2}>
                        <Text style={styles.nutritionTitle}>
                            Cholesterol
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.cholesterol+' '+productData.cholesterol_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle}>
                        <Text style={styles.nutritionTitle}>
                            Energy
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.energy+' '+productData.energy_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle2}>
                        <Text style={styles.nutritionTitle}>
                            Fat
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.fat+' '+productData.fat_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle}>
                        <Text style={styles.nutritionTitle}>
                            Fiber
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.fiber+' '+productData.fiber_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle2}>
                        <Text style={styles.nutritionTitle}>
                            Monosaturated Fats
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.monosaturated_fats+' '+productData.monosaturated_fats_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle}>
                        <Text style={styles.nutritionTitle}>
                            Polyunsaturated Fats
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.polyunsaturated_fats+' '+productData.polyunsaturated_fats_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle2}>
                        <Text style={styles.nutritionTitle}>
                            Potassium
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.potassium+' '+productData.potassium_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle}>
                        <Text style={styles.nutritionTitle}>
                            Saturated Fats
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.saturated_fats+' '+productData.saturated_fats_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle2}>
                        <Text style={styles.nutritionTitle}>
                            Sodium
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.sodium+' '+productData.sodium_fats_qty : 'Product Name'}
                        </Text>
                    </View>
                    <View style={styles.nutritionStyle}>
                        <Text style={styles.nutritionTitle}>
                            Sugar
                        </Text>
                        <Text style={styles.nutritionValue}>
                            {productData != null ? productData.sugar+' '+productData.sugar_fats_qty : 'Product Name'}
                        </Text>
                    </View>
                </AccordionItem>
                )}
            </View>
        )
    }

    function divider() {
        return (
            <View style={{
                backgroundColor: Colors.borderLightColor,
                height: 2.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
            }} />
        )
    }

    function productDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0, }}>               
                <Text style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 0.0, ...Fonts.blackColor16Bold }}>
                    {productData != null ? productData.product_name+' / '+productData.product_type_name+' / '+ productData.product_variety_name +' / '+productData.product_available_name+' / '+productData.product_quality_name : 'Product Name'}
                </Text>
            </View>
        )
    }

    function productImagesSlider() {

        const renderItem = ({ item }) => {
            return (
                <Image
                    source={{ uri: item }}
                    style={{ width: '100%', height: 350.0, }}
                />
            )
        }
        return (
            <>
                <Carousel
                    data={productImages}
                    sliderWidth={width}
                    autoplay={false}
                    loop={false}
                    autoplayInterval={5000}
                    itemWidth={width}
                    renderItem={renderItem}
                    onSnapToItem={(index) => updateState({ activeSlide: index })}
                />
                {pagination()}
            </>
        )
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={productImages.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.sliderPaginationWrapStyle}
                dotElement={<View style={styles.activeDotStyle} />}
                inactiveDotElement={<View style={styles.inActiveDotStyle} />}
            />
        );
    }

    function productSellers(){
        console.log("Seller:", productSellersData);
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding }}>
                <Text style={styles.sectionTitle}>Sellers</Text>
                <View style={styles.allSellersData}>
                    {productSellersData && productSellersData.length > 0 && (
                        <FlatList
                            data={productSellersData}
                            renderItem={({item, index}) => {
                                const locations = item.locations.length > 0 ? item.locations.map((i)=>{
                                    return i;
                                }) : [];
                                const prices = item.prices.length > 0 ? item.prices.map((i)=>{
                                    return i;
                                }) : [];
                                return (
                                    <Pressable>
                                        <View style={styles.sellerCard}>
                                            <View style={{ ...styles.sellerCardColumn, ...styles.sellerCardColumnSeparate, backgroundColor: Colors.greenColor, padding: Sizes.fixPadding, }}>                                            
                                                <Text style={{ ...styles.sellerNameColumn, ...Fonts.whiteColor18Regular }}>
                                                    {item.seller_name+" "+item.seller_last_name}
                                                </Text>
                                                <Pressable>
                                                    <Text style={{ ...styles.sellerLabelColumn, backgroundColor: Colors.orangeColor, ...Fonts.whiteColor14Bold, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5}}>View Images</Text>
                                                </Pressable>
                                            </View> 
                                            
                                            <View style={{ ...styles.sellerCardColumn, padding: Sizes.fixPadding,}}>
                                                <Text style={styles.sellerLabelColumn}>Available From:</Text>
                                                <View>
                                                    <Text style={{...styles.sellerNameColumn, textAlign: 'right' }}>{Moment(item.product_available_from.toString()).format('D MMM YYYY')}</Text>
                                                    <Text style={{...styles.sellerNameColumn, ...Fonts.blackColor14Bold, textAlign: 'right' }}>{Moment(item.product_model.toString()).format('MMMM - YYYY')}</Text>
                                                </View>
                                            </View> 
                                            <View style={{ ...styles.sellerCardColumn, padding: Sizes.fixPadding,}}>
                                                <Text style={styles.sellerLabelColumn}>Unit Price:</Text>
                                                <View>
                                                    {prices.length > 0 && prices.map((p) => { 
                                                        return (
                                                        <Text style={{...styles.sellerNameColumn, ...Fonts.blackColor14Bold, textAlign: 'right' }}>{p.minimum} - {p.maximum} {item.unit} (₹ {p.price})</Text>
                                                    )})}
                                                    {prices.length <= 0 && (
                                                        <Text style={{...styles.sellerNameColumn, ...Fonts.blackColor14Bold, textAlign: 'right' }}>₹ {item.onsale_price}</Text>
                                                    )}
                                                </View>
                                            </View>
                                            <View style={{ ...styles.sellerCardColumn, padding: Sizes.fixPadding,}}>
                                                <Text style={styles.sellerLabelColumn}></Text>
                                                <View>
                                                    {prices.length > 0 && prices.map((p) => { 
                                                        return (
                                                        <Text style={{...styles.sellerNameColumn, ...Fonts.blackColor14Bold, textAlign: 'right' }}>{p.minimum} - {p.maximum} {item.unit} (₹ {p.price})</Text>
                                                    )})}
                                                    {prices.length <= 0 && (
                                                        <Text style={{...styles.sellerNameColumn, ...Fonts.blackColor14Bold, textAlign: 'right' }}>₹ {item.onsale_price}</Text>
                                                    )}
                                                </View>
                                            </View>
                                            {selected_addresss == null && (
                                                <View style={styles.sellerCardColumn}>
                                                    <Text style={{ ...styles.sellerLabelColumn, ...Fonts.redColor14Regular,padding: Sizes.fixPadding,}}>Please check if products are delivered at your Pincode first!</Text>
                                                </View>
                                            )} 
                                            <View style={styles.sellerCardColumn}>
                                                <Text style={{ ...styles.sellerLabelColumn, ...Fonts.blackColor16Bold,padding: Sizes.fixPadding,}}>:: Locations ::</Text>
                                            </View> 
                                            <View style={{ ...styles.sellerCardColumnSeparate, padding: Sizes.fixPadding, }}>
                                                {locations.length > 0 && locations.map((loc) => {
                                                    return (
                                                        <View style={{...styles.sellersSubCard }}>
                                                            <Text style={{...styles.sellerNameColumn, ...Fonts.blackColor14Medium, textAlign: 'left', backgroundColor: Colors.borderLightColor, padding: Sizes.fixPadding - 5.0, }}>{loc.location_name}, {loc.location_code}</Text>
                                                            <Text style={{...styles.sellerNameColumn, ...Fonts.blackColor14Bold, textAlign: 'left', backgroundColor: Colors.borderLightColor, padding: Sizes.fixPadding - 5.0, }}>Available Qty: {loc.quantity} ({item.unit == "Quintals" ? "Q" : item.unit == "Ltrs" ? "L" : item.unit == "Bags" ? "Bags" : item.unit == "Bales" ? "Bales" : ""})</Text>
                                                            
                                                            <TextInput
                                                                style={styles.input}
                                                                onChangeText={(text) => onChangeQuantity(loc.location_id, item.product_id, text, item.seller_id)}
                                                                //value={cartValues !== '' && cartValues.location_id == loc.location_id ? cartValues.product_qty : 0}
                                                                placeholder={"Req Qty in "+item.unit}
                                                                keyboardType="numeric"
                                                                editable={selected_addresss == null ? false : true}
                                                                onTouchStart={(e) => {
                                                                    if(selected_zip_code == ''){
                                                                        Alert.alert (
                                                                            "Check Pincode Availability",
                                                                            "Please check if products are delivered in your Pincode First!",
                                                                            [                              
                                                                                {
                                                                                    text: 'OK',
                                                                                    onPress: () => {    
                                                                                       
                                                                                    },
                                                                                    style: 'OK',
                                                                                },
                                                                            ],
                                                                            {
                                                                                cancelable: true,
                                                                                onDismiss: () => {    
                                                                                    
                                                                                },
                                                                            },
                                                                        );
                                                                    }
                                                                }}
                                                                onSubmitEditing={(e) => e.target.value}
                                                                enablesReturnKeyAutomatically={true}
                                                                enterKeyHint={'done'}
                                                              />                                                       
                                                        </View>
                                                    )}
                                                )}
                                            </View> 
                                        </View> 
                                    </Pressable>

                                )
                            }}
                            keyExtractor={item => item.seller_id}
                        />

                    )}
                    {productSellersData && productSellersData.length == 0 && (
                        <View style={{ marginVertical: Sizes.fixPadding }}>
                            <View style={{ ...styles.allSellersData}}>                                
                                <View style={{...styles.sellerCard, backgroundColor: '#edededf8', borderRadius: 2, borderWidth: 0, padding: Sizes.fixPadding}}>
                                    <View style={styles.sellerCardColumn}>
                                        <Text style={styles.sellerLabelColumn}>
                                            No Seller Found At This Location.
                                        </Text>
                                    </View>     
                                </View> 
                            </View>
                        </View>
                    )}
                    
                </View>
            </View>
        )
    }

    function checkAvailability(){
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding }}>
                <View style={{ ...styles.allSellersData}}>
                        <View style={{...styles.sellerCard, backgroundColor: '#edededf8', borderRadius: 2, borderWidth: 0, padding: Sizes.fixPadding}}>
                            <View style={styles.sellerCardColumn}>
                                <Text style={{ ...styles.sellerLabelColumn, ...Fonts.blackColor16Bold }}>
                                    Check Available Products At Your Location:
                                </Text>
                            </View> 

                            <View style={styles.sellerCardColumn}>
                                <Pressable onPress={() => onPressOpenBottomSheet()}>
                                    {user_data !== null && selected_zip_code != undefined && (
                                        <Text style={{ ...styles.sellerLabelColumn, ...Fonts.blackColor16Bold , color: Colors.orangeColor}}>
                                            <Ionicons name="location-outline" size={20} color={Colors.orangeColor} /> Deliver to - {user_data !== null ? user_data.first_name+' '+user_data.last_name : ''}, {selected_zip_code}
                                        </Text>
                                    )}
                                    {user_data !== null && selected_zip_code == undefined && (
                                        <Text style={{ ...styles.sellerLabelColumn, ...Fonts.blackColor16Bold , color: Colors.orangeColor}}>
                                            <Ionicons name="location-outline" size={20} color={Colors.orangeColor} /> Add A Delivery Location
                                        </Text>
                                    )}
                                </Pressable>
                                <Pressable onPress={() => unsetBuyerZipCode()}>
                                    {user_data !== null && selected_zip_code != undefined && (
                                        <AntDesign name="closecircleo" size={24} color={Colors.orangeColor} />
                                    )}                                
                                </Pressable>
                            </View>     
                        </View> 
                </View>
            </View>
        );
    }

    function productAfterLoggedInTag(){
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding }}>
                <View style={{ ...styles.allSellersData}}>
                    <Pressable onPress={() => navigation.navigate('BuyerLoginScreen',{ product_id: route.params.id, is_login_from_product_detail: true })}>
                        <View style={{...styles.sellerCard, backgroundColor: '#edededf8', borderRadius: 2, borderWidth: 0, padding: Sizes.fixPadding}}>
                            <View style={styles.sellerCardColumn}>
                                <Text style={styles.sellerLabelColumn}>
                                    Multiple sellers sell this product. Please <Text style={{ ...Fonts.blackColor16Bold, borderBottomWidth: 2, borderBottomColor: Colors.orangeColor }}>LOGIN AS BUYER</Text> to explore the available sellers
                                </Text>
                            </View>     
                        </View> 
                    </Pressable>
                </View>
            </View>
        )
    }

    function filterModal(){
        //let selected_address = await AsyncStorage.getItem('selected_address');
        return (
            <BottomSheet ref={ref}>
                <View style={styles.categorySlides2}>
                    <Text style={styles.sectionTitle}>Choose Your Location</Text>
                </View>
                <View style={styles.categorySlides2}>
                    <Text style={styles.sellerLabelColumn}>
                        Select a delivery location to see product availability and delivery options.
                    </Text>
                </View>  
                <View style={styles.categorySlides2}>
                    <FlatList
                        data={Object.keys(addresses)}
                        renderItem={({ item, index }) => {
                                return (
                                <Pressable onPress={() => changeZipCode(addresses[item].buyer_zip, addresses[item].shiping_info_id)}>
                                    <View style={styles.mainCardView} key={index}>
                                        <View
                                            style={{                                                
                                                width: '100%',
                                            }}>
                                            <Text
                                                style={{                                                                        
                                                    ...Fonts.blackColor16Bold,
                                                    color: Colors.greenColor,     
                                                }}>
                                                Location
                                            </Text>
                                        </View>
                                        <View
                                            style={{                                                
                                                width: '100%',
                                            }}>
                                            <Text
                                                style={{
                                                    color: Colors.blackColor,                         
                                                    ...Fonts.blackColor16Bold,
                                                }}>
                                                {addresses[item].buyer_name}
                                            </Text>
                                        </View>    
                                        <View
                                            style={{
                                               borderWidth: 0,
                                                width: '100%',
                                                justifyContent: 'space-between',                                               
                                                flexDirection:'row',
                                                alignItems:'center'
                                            }}>
                                            <Text
                                                style={{
                                                    color: Colors.blackColor,                         
                                                    ...Fonts.blackColor14Medium,
                                                }}>
                                                {addresses[item].buyer_mobile}
                                            </Text>
                                        </View>                                          
                                        <View
                                            style={{
                                                borderWidth: 0,
                                                width: '100%',
                                                justifyContent: 'space-between',                                               
                                                flexDirection:'row',
                                                alignItems:'center'
                                            }}>                                           
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                               {addresses[item].buyer_short_address}  
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                borderWidth: 0,
                                                width: '100%',
                                                justifyContent: 'space-between',                                               
                                                flexDirection:'row',
                                                alignItems:'center'
                                            }}>                                            
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                               {addresses[item].buyer_address_1}, {addresses[item].buyer_address_2}
                                            </Text>                                            
                                        </View>
                                        
                                        <View
                                            style={{
                                              borderWidth: 0,
                                              width: '100%',
                                              justifyContent: 'space-between',                                               
                                              flexDirection:'row',
                                              alignItems:'center'
                                            }}>                                            
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                               {addresses[item].country_name}, {addresses[item].state_name},  {addresses[item].city_name}, {addresses[item].buyer_zip}
                                            </Text>  
                                        </View>
                                        
                                       
                                        <View
                                            style={{
                                              height: 38,
                                              backgroundColor: selected_zip_code != undefined && selected_addresss != null && selected_addresss == addresses[item].shiping_info_id ? Colors.greenColor : Colors.whiteColor,
                                              borderWidth: 0,
                                              width: 38,
                                              marginLeft: -26,
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              position: 'absolute',
                                              right: 10,
                                              top: 10,
                                              borderRadius: 50,
                                            }}>
                                            {selected_zip_code != undefined && selected_addresss != null && selected_addresss == addresses[item].shiping_info_id && (                                                
                                                <Text style={{color: Colors.whiteColor}}>
                                                  <AntDesign name="checkcircle" size={24} color={Colors.whiteColor} />
                                                </Text>
                                            )} 
                                            {selected_zip_code != undefined && selected_addresss != null && selected_addresss != addresses[item].shiping_info_id && (                                                
                                                <Text style={{color: Colors.whiteColor}}>
                                                    <Feather name="circle" size={24} color={Colors.blackColor} />
                                                </Text>
                                            )}                                            
                                      </View>
                                    </View>
                                  </Pressable>
                        )}}
                        keyExtractor={item => addresses[item].shiping_info_id}
                        numColumns={1}
                    />

                </View> 
                <View style={styles.categorySlides2}>
                    <Text style={styles.sellerLabelColumn}>
                        OR
                    </Text>
                </View>                
                <View style={styles.categorySlides2}>                          
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
                                    placeholder={'Pincode'}
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
                            Check Availability
                        </Text>
                    } 
                </Pressable>              
            </BottomSheet>

        );
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.whiteColor}
                    size={22}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, flex: 1, ...Fonts.whiteColor18SemiBold }}>
                    Mobile
                </Text>
            </View>
        )
    }

}

export default ProductDetailScreen;
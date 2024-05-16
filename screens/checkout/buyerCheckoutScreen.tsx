import React, { useCallback,createRef, useState, useEffect, useRef, useMemo, useContext } from "react";
import { SafeAreaView, View, StatusBar, Button, Modal, ScrollView, Pressable, FlatList, Image, ActivityIndicator, Dimensions, RefreshControl, StyleSheet, ImageBackground, Text, TextInput, Alert, Animated, Platform,useWindowDimensions, TouchableOpacity  } from "react-native";
import { Colors, Fonts, Sizes, ElementsText, window } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { Menu } from 'react-native-material-menu';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'expo-linear-gradient';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation, draweractions } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetRefProps } from '../../components/BottomSheet';
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-root-toast';
import {useIsFocused} from '@react-navigation/native';

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const BuyerCheckoutScreen = ({ route, navigation }) => {
    const { t, i18n } = useTranslation();   
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false); 
    // const { order_id } = route.params;
    const [user_data, setUserData] = useState();
    const navigate = useNavigation();
    const [state, setState] = useState({ 
        showSnackBar: false,
        snackBarMsg: null,
        orderDetail: null,
        statusId: null,
        productId: null,
        locationId: null,
        orderDetailsId: null,
        addresses: [],
        selected_addresss: null,
        selected_zip_code: null
    });
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
          shipping_name: '',
          shipping_no: '',
        }
    }); 
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [textAvailableDate, setTextAvailableDate] = useState('Select Expected Deliver Date');

    const [cartTotal, setCartTotal] = useState();
    const [cartSubTotal, setCartSubTotal] = useState();
    const [platFormFee, setPlatFormFee] = useState();
    const [deliveryCharge, setDeliveryCharges] = useState();

    const [cartValues, setCartValues] = useState([]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            generateCartDetails();
            generateAddresss();
            setRefreshing(false);
        }, 2000);
    }, []);

    const ref = useRef<BottomSheetRefProps>(null);

    const refAddress = useRef<BottomSheetRefProps>(null);

    const onPressOpenBottomSheet = () => {
        const isActive = refAddress?.current?.isActive();
        if (isActive) {
            refAddress?.current?.scrollTo(0);
        } else {
            refAddress?.current?.scrollTo(-600);
        } 
    };

    const getUserData = async () => {
        AsyncStorage.getItem('user').then((user) => {
            if(user){                
                const user_array = JSON.parse(user);                
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

    // const generateCartvalues = (result, user_array, selected_address) => {
    //     try {
    //         result.map(async (item) => {                                    
    //             if(cartValues.length > 0){
    //                 const i = cartValues.findIndex(e => e.location_id === item.location_id);
    //                 console.log("Location_id:", item.location_id);
    //                 console.log(i)
    //                 if (i == -1) {                                        
    //                     setCartValues([...cartValues,{
    //                         location_id: item.location_id,
    //                         product_qty: item.product_qty,
    //                         product_id: item.product_id,
    //                         seller_id: item.seller_id,
    //                         buyer_id: user_array.buyer_id,
    //                         shiping_info_id: selected_address,
    //                         unit_cost: item.unit_cost,
    //                         item_total: item.item_total,
    //                     }]) 
    //                 }else{
    //                     const _is = [...cartValues];
    //                     _is[i].product_qty = item.product_qty;
    //                     _is[i].product_id = item.product_id;
    //                     _is[i].seller_id = item.seller_id;
    //                     _is[i].buyer_id = user_array.buyer_id;
    //                     _is[i].shiping_info_id = selected_address;
    //                     _is[i].unit_cost = item.unit_cost;
    //                     _is[i].item_total = item.item_total;
    //                     setCartValues(_is);
    //                 }
    //             }else{
    //                 setCartValues([{
    //                     location_id: item.location_id,
    //                     product_qty: item.product_qty,
    //                     product_id: item.product_id,
    //                     seller_id: item.seller_id,
    //                     buyer_id: user_array.buyer_id,
    //                     shiping_info_id: selected_address,
    //                     unit_cost: item.unit_cost,
    //                     item_total: item.item_total,
    //                 }])
    //             } 
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    const generateCartDetails = () => {
        AsyncStorage.getItem('token').then(async (token) => {
            if(!token){
                navigation.navigate('BuyerLoginScreen');
            }
        });
        AsyncStorage.getItem('user').then(async (user) => {
            if(user){
                const user_array = JSON.parse(user);
                setUserData(JSON.parse(user));
                const token = await AsyncStorage.getItem('token');
                const selected_address = await AsyncStorage.getItem('selected_address');
                try {              
                    const formData = new FormData();
                    formData.append('buyer_id', user_array.buyer_id);
                    if(selected_address != null){
                        formData.append('shiping_info_id', selected_address);
                    } 
                    const response = await axios.post(
                        'viewcart', 
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `${token}`,
                            }   
                        }   
                    );
                    if(response){                         
                        if(!response.data.status){
                            setError(response.data.message);
                        }else{
                            let expected_data = response.data.result.map((item, index) => {
                                if (!cartValues.includes((cart) => cart.location_id === item.location_id)) {
                                    return { 
                                        location_id: item.location_id,
                                        product_qty: item.product_qty,
                                        product_id: item.product_id,
                                        seller_id: item.seller_id,
                                        buyer_id: user_array.buyer_id,
                                        shiping_info_id: selected_address,
                                        unit_cost: item.unit_cost,
                                        item_total: item.item_total,
                                    }
                                }
                            });
                            setCartValues(expected_data);
                            updateState({ orderDetail: response.data.result }); 
                            setCartTotal(response.data.cart_total);
                            setCartSubTotal(response.data.sub_total);
                            setPlatFormFee(response.data.platform_fee);
                            setDeliveryCharges(response.data.delivery_charge);
                        }
                    } 
                } catch (e) { 
                  console.log(e)
                }
            }
        }); 
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
                            AsyncStorage.getItem('selected_address').then(async (address) => {
                                console.log("address:", address)
                                if(address != null){
                                    updateState({ selected_addresss: address });
                                }else{
                                    await AsyncStorage.setItem('selected_address', response.data.result[0].shiping_info_id.toString()); 
                                    updateState({ selected_addresss: response.data.result[0].shiping_info_id.toString() });
                                }
                            });

                            AsyncStorage.getItem('zip_code').then(async (zip) => {
                                console.log("zip:", zip)
                                if(zip != null){
                                    updateState({ selected_zip_code: zip });
                                }else{
                                    await AsyncStorage.setItem('zip_code', response.data.result[0].buyer_zip.toString());
                                    updateState({ selected_zip_code: response.data.result[0].buyer_zip.toString() });
                                }
                            });  
                            
                            
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

    useEffect(() => { 
        AsyncStorage.getItem('token').then(async (token) => {
            if(!token){
                Alert.alert (
                    "Checkout Page",
                    "Please login again to get into this screen.",
                    [                              
                        {
                            text: 'OK',
                            onPress: () => {  
                                setTimeout(() => {
                                    navigation.navigate('Onboarding');
                                }, 2000);
                            },
                            style: 'OK',
                        },
                    ]
                );
            }else{
                generateCartDetails();
                generateAddresss();
            }
        });
        if (isFocused) { 
            // setInterval(() => {  
            //     console.log(orderDetail);
            // }, 5000);
            // setInterval(() => {
            //     if(orderDetail == null) {
            //         Alert.alert (
            //             "Checkout Page",
            //             "Your cart is empty.Please shop first and add products to your cart.",
            //             [                              
            //                 {
            //                     text: 'OK',
            //                     onPress: () => {  
            //                         setTimeout(() => {
            //                             navigation.navigate('BottomTabBar');
            //                         }, 2000);
            //                     },
            //                     style: 'OK',
            //                 },
            //             ]
            //         );
            //     } 
            // }, 5000);
        } 
    },[isFocused]); 

    const deleteProductFromCheckout = async (cart_id, buyer_id) => {
        const token = await AsyncStorage.getItem('token');
        try {              
            const formData = new FormData();
            formData.append('buyer_id', buyer_id);   
            formData.append('cart_id', cart_id);
            const response = await axios.post(
                'deletefromcart', 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `${token}`,
                    }   
                }   
            );
            if(response){                         
                    if(!response.data.status){
                        setLoading(false);
                        setError(response.data.message);
                    }else{
                        setLoading(false);  
                        Alert.alert (
                            "Checkout - Deleted Product",
                            "Product deleted from cart successfully.",
                            [                              
                              {
                                text: 'OK',
                                onPress: () => {    
                                    setRefreshing(true);
                                    setTimeout(() => {
                                      generateCartDetails();
                                      setRefreshing(false);
                                    }, 2000);
                                },
                                style: 'OK',
                              },
                            ],
                            {
                              cancelable: true,
                              onDismiss: () => {    
                                    setRefreshing(true);
                                    setTimeout(() => {
                                      generateCartDetails();
                                      setRefreshing(false);
                                    }, 2000);
                                },
                            },
                        );
                    }
            } 
        } catch (e) {
            setLoading(false); 
            console.log(e)
        }
    }

    const onPressDeleteProduct = async (cart_id, buyer_id) => {
        Alert.alert (
            "Checkout - Delete The Product",
            "Are you sure you want to delete this product from cart?",
            [                              
                {
                    text: 'OK',
                    onPress: () => {  
                        setTimeout(() => {
                            deleteProductFromCheckout(cart_id, buyer_id);
                        }, 2000);
                    },
                    style: 'OK',
                },
            ],
            {
                cancelable: true,
                onDismiss: () => {    
                    setRefreshing(true);
                    setTimeout(() => {
                        generateCartDetails();
                        setRefreshing(false);
                    }, 2000);
                },                
            },
        );
    }

    // const onChangeQuantity = (location_id, product_id, qty, seller_id) => {
    //     // console.log(selected_addresss)
    //     console.log(qty);
    //     if(selected_addresss == null){
    //         Alert.alert (
    //             "Check Pincode Availability",
    //             "Please check if products are delivered in your Pincode First!",
    //             [                              
    //                 {
    //                     text: 'OK',
    //                     onPress: () => {    
                            
    //                     },
    //                     style: 'OK',
    //                 },
    //             ],
    //             {
    //                 cancelable: true,
    //                 onDismiss: () => {    
    //                     setRefreshing(true);
    //                     setTimeout(() => {
    //                         setRefreshing(false);
    //                     }, 2000);
    //                 },
    //             },
    //         );
    //     }else{
    //         if(cartValues.length > 0){
    //             const i = cartValues.findIndex(e => e.location_id === location_id);
    //             if (i > -1) {
    //                 if(qty == ""){
    //                     const _inputs = [...cartValues];
    //                     _inputs.splice(i, 1);
    //                     setCartValues(_inputs);
    //                 }else{
    //                     const _inputs = [...cartValues];
    //                     _inputs[i].product_qty = qty;
    //                     _inputs[i].product_id = route.params.id;
    //                     _inputs[i].seller_id = seller_id;                    
    //                     _inputs[i].buyer_id = user_data.buyer_id;
    //                     setCartValues(_inputs);
    //                 }                    
    //             }else{
    //                 setCartValues([...cartValues, {
    //                     location_id: location_id,
    //                     product_qty: qty,
    //                     product_id: route.params.id,
    //                     seller_id: seller_id,
    //                     buyer_id: user_data.buyer_id
    //                }])
    //             }  
    //         }else{
    //             setCartValues([{
    //                 location_id: location_id,
    //                 product_qty: qty,
    //                 product_id: route.params.id,
    //                 seller_id: seller_id,
    //                 buyer_id: user_data.buyer_id
    //             }])
    //         }
    //     }
    // }

    // const onPressEditProduct = async (cart_id, buyer_id) => {
    //     const token = await AsyncStorage.getItem('token');
    //     try {              
    //         const formData = new FormData();
    //         formData.append('product_id', cartValues[i].product_id);
    //         formData.append('seller_id', cartValues[i].seller_id);
    //         formData.append('location_id', cartValues[i].location_id);
    //         formData.append('product_qty', cartValues[i].product_qty);
    //         formData.append('buyer_id', cartValues[i].buyer_id);
    //         const response = await axios.post(
    //             'addtocart',
    //             formData,
    //             {
    //                 headers: {
    //                     'Content-Type': "multipart/form-data",
    //                     'Authorization': `${token}`,
    //                 }  
    //             }   
    //         );
            
    //         if(response){                         
    //                 if(!response.data.status){
    //                     setLoading(false);
    //                     setError(response.data.message);
    //                 }else{
    //                     setLoading(false);  
    //                     Alert.alert (
    //                         "Delete From Cart",
    //                         "Product deleted from cart successfully.",
    //                         [                              
    //                           {
    //                             text: 'OK',
    //                             onPress: () => {    
    //                                 setRefreshing(true);
    //                                 setTimeout(() => {
    //                                   generateCartDetails();
    //                                   setRefreshing(false);
    //                                 }, 2000);
    //                             },
    //                             style: 'OK',
    //                           },
    //                         ],
    //                         {
    //                           cancelable: true,
    //                           onDismiss: () => {    
    //                                 setRefreshing(true);
    //                                 setTimeout(() => {
    //                                   generateCartDetails();
    //                                   setRefreshing(false);
    //                                 }, 2000);
    //                             },
    //                         },
    //                     );
    //                 }
    //         } 
    //     } catch (e) {
    //         setLoading(false); 
    //         console.log(e)
    //     }
    // }

    

    const changeZipCode = async (zip_code, shiping_info_id) => {
        try {
            setRefreshing(true);
            await AsyncStorage.setItem('zip_code', zip_code.toString());
            await AsyncStorage.setItem('selected_address', shiping_info_id.toString());       
            getUserData();     
            setTimeout(() => {                
              generateCartDetails();
              generateAddresss()
              setRefreshing(false);
            }, 2000); 
            refAddress?.current?.scrollTo(0);
        } catch (e) {
            console.log(e);
        }        
    }

    const {    
        showSnackBar,
        snackBarMsg,
        orderDetail,
        statusId,
        productId,
        locationId,
        orderDetailsId,
        addresses,
        selected_addresss,selected_zip_code
    } = state;


    console.log(orderDetail);
    const onCheckoutPlaceOrder = async () => {
        if(cartSubTotal > 25000){
            Alert.alert (
                "Checkout - Cart Total",
                "Cart total value can't exceed ₹ 25,000! Please check items in your cart.",
                [                              
                    {
                        text: 'OK',
                        onPress: () => {    
                            setRefreshing(true);
                            setTimeout(() => {
                                generateCartDetails();
                                setRefreshing(false);
                            }, 2000);
                        },
                        style: 'OK',
                    },
                ],
                {
                cancelable: true,
                    onDismiss: () => {    
                        setRefreshing(true);
                        setTimeout(() => {
                            generateCartDetails();
                            setRefreshing(false);
                        }, 2000);
                    },
                },
            );
        }else if(cartValues.length > 0){
            try {
                const token = await AsyncStorage.getItem('token');
                const dataArray = [];
                for(var i = 0; i < cartValues.length; i++){
                    const formData = new FormData();
                    formData.append('product_id', cartValues[i].product_id);
                    formData.append('seller_id', cartValues[i].seller_id);
                    formData.append('location_id', cartValues[i].location_id);
                    formData.append('shiping_info_id', cartValues[i].shiping_info_id);
                    formData.append('buyer_id', cartValues[i].buyer_id);
                    const response = await axios.post(
                        'checkoutaddress',
                        formData,
                        {
                            headers: {
                                'Content-Type': "multipart/form-data",
                                'Authorization': `${token}`,
                            }  
                        }   
                    );
                    
                    if(response.data.status == false){
                        Toast.show(response.data.message);                       
                    }  
                    dataArray.push({
                        "distance": response.data.result.distance,
                        "message": response.data.message
                    });                  
                }

                const index = dataArray.findIndex((item) => item.distance === 0);
                // console.log(cartValues)
                let orderItemsArray = cartValues.map((cartValue) => {
                    return {
                        location_id: cartValue.location_id,
                        quantity: cartValue.product_qty,
                        product_id: cartValue.product_id,
                        seller_id: cartValue.seller_id,
                        price: cartValue.unit_cost,
                        total: cartValue.item_total,
                    }
                })
                // console.log(orderItemsArray);
                if (index !== -1) {
                    // Toast.show(dataArray[index].message, {
                    //   duration: Toast.durations.SHORT,
                    // });
                }else{
                    AsyncStorage.getItem('user').then(async (user) => {
                        if(user){
                            const user_array = JSON.parse(user);
                            const token = await AsyncStorage.getItem('token');
                            const selected_address = await AsyncStorage.getItem('selected_address');
                            try{
                                console.log(user_array);
                                const formData = new FormData();
                                formData.append('buyer_id', user_array.buyer_id);
                                formData.append('total_amount', cartSubTotal);
                                formData.append('platform_fee', platFormFee);
                                formData.append('paid_amount', cartSubTotal);
                                formData.append('delivery_charge', deliveryCharge);
                                formData.append('delivery_time', '');
                                formData.append('order_discount', '');
                                formData.append('due_amount',cartSubTotal);
                                formData.append('order_from', 3);
                                formData.append('order_option', 1);
                                formData.append('order_status', 1);
                                formData.append('payment_mode', 'razorpay');
                                formData.append('shipping_id', selected_address);
                                formData.append('order_items', JSON.stringify(orderItemsArray));
                                const response = await axios.post(
                                    'generateorder',
                                    formData,
                                    {
                                        headers: {
                                            'Content-Type': "multipart/form-data",
                                            'Authorization': `${token}`,
                                        }  
                                    }   
                                );
                                var options = {
                                        key: response.data?.keyid, 
                                        amount: response.data?.amount,
                                        currency: 'INR',
                                        name: 'Krushi', 
                                        description: 'Test Transaction',
                                        order_id: response?.data?.orderid,                                        
                                        prefill: {
                                          name: user_array.first_name+" "+user_array.last_name, //your customer's name
                                          email: user_array.buyer_email,
                                          contact: user_array.buyer_mobile, // the customer's phone number for better conversion rates
                                        },
                                        notes: {
                                          address: 'Razorpay Corporate Office',
                                        },
                                        theme: {
                                          color: '#f7991f',
                                        },
                                };
                                RazorpayCheckout.open(options).then(async(data) => {
                                        console.log(data)
                                        let paymentDetails = new FormData();
                                        paymentDetails.append(
                                            'razorpay_payment_id',
                                            data.razorpay_payment_id
                                        );
                                        paymentDetails.append('orderid', response.data.orderid);
                                        paymentDetails.append('payment_mode', 'razorpay');
                                        paymentDetails.append('buyer_id', user_array.buyer_id);
                                        paymentDetails.append('order_id', response.data.order_id);

                                        const paymentCallbackCheck = await axios.post(
                                            'paymentcallback',
                                            paymentDetails,
                                            {
                                                headers: {
                                                    'Content-Type': "multipart/form-data",
                                                    'Authorization': `${token}`,
                                                }  
                                            }   
                                        );

                                        if(paymentCallbackCheck.data.status){
                                            Alert.alert (
                                                "Checkout - Payment Success!",
                                                "You have done payment successfully. We are generating your order please click okey to see your order details.",
                                                [                              
                                                    {
                                                        text: 'Okey',
                                                        onPress: () => {    
                                                            setRefreshing(true);
                                                            setTimeout(() => {
                                                                navigation.navigate('OrderSuccess', { order_id: response.data?.order_id });
                                                                setRefreshing(false);
                                                            }, 2000);
                                                        },
                                                        style: 'OK',
                                                    },
                                                ],
                                                {
                                                cancelable: true,
                                                    onDismiss: () => {    
                                                        setRefreshing(true);
                                                        setTimeout(() => {
                                                            generateCartDetails();
                                                            setRefreshing(false);
                                                        }, 2000);
                                                    },
                                                },
                                            );
                                        }else{
                                            Alert.alert (
                                                "Checkout - Payment Error!",
                                                "Something went wrong. Please try again later!",
                                                [                              
                                                    {
                                                        text: 'Okey',
                                                        onPress: () => {    
                                                            setRefreshing(true);
                                                            setTimeout(() => {                                                                
                                                                setRefreshing(false);
                                                            }, 2000);
                                                        },
                                                        style: 'OK',
                                                    },
                                                ],
                                                {
                                                cancelable: true,
                                                    onDismiss: () => {    
                                                        setRefreshing(true);
                                                        setTimeout(() => {
                                                            generateCartDetails();
                                                            setRefreshing(false);
                                                        }, 2000);
                                                    },
                                                },
                                            );
                                        }
                                }).catch((error) => {
                                    console.log(error)
                                    alert(`Error: ${error.code} | ${error.description}`);
                                }); 
                               
                            } catch (e){
                                console.log(e.response);
                            }    
                            
                        }
                    });
                }
                
            } catch (e) {
                console.log(e);
            }
        }
    };
    
   
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGreyColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, marginBottom: 80,}}> 
                    <ScrollView
                        refreshControl={
                          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }>
                            <>                                    
                                {orderDetail != null && homescreensections()}
                                {orderDetail == null && checkoutScreenSections()}
                            </>
                    </ScrollView>
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                      setModalVisible(!modalVisible);
                    }}>
                        <View style={styles.centeredView}>
                              <View style={styles.modalView}>
                                <Text style={styles.sectionTitle}>Update The Required Quantity</Text>
                                <View style={styles.categorySlides2}>                          
                                    <Text style={styles.fieldLabel}>                         
                                        Required Quantity
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
                                                placeholder={'Quantity'}
                                            />   
                                        )}
                                        name="quantity"
                                    />                                                  
                                </View>   
                            {errors.pincode && <Text style={{ ...Fonts.redColor14Regular, marginHorizontal: Sizes.fixPadding, }}>{errors.pincode.message}</Text>}                        
                        </View>                
                        <Pressable                    
                            style={styles.krushiIDCheckMain}
                            disabled={isLoading}>   
                            {isLoading && 
                                <ActivityIndicator size="small" color="#ffffff" />
                            }
                            {!isLoading && 
                                <Text style={{ ...Fonts.whiteColor18Medium }}>
                                    Update
                                </Text>
                            } 
                        </Pressable>
                        <View style={{height: 38,backgroundColor: Colors.orangeColor,borderWidth: 0,width: 38,marginLeft: -26,alignItems: 'center',justifyContent: 'center',position: 'absolute',right: 10,top: 10, borderRadius: 50,}}>
                            <Pressable onPress={() => setModalVisible(false)}> 
                                <Text style={{color: Colors.whiteColor}}>
                                    <AntDesign name="closecircleo" size={24} color={Colors.blackColor} />
                                </Text> 
                            </Pressable>                                 
                        </View>
                      </View>
                    </View>
                </Modal>
                {orderDetail != null && 
                    <Pressable onPress={() => onCheckoutPlaceOrder()}>
                        <View style={styles.buttonAddToCartEnabled}>
                            <Text style={styles.addToCartText}>Place Order</Text>                
                            <AntDesign name="shoppingcart" size={30} color={Colors.whiteColor} />
                        </View>
                    </Pressable>
                }
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={showSnackBar}
                    onDismiss={() => updateState({ showSnackBar: false })}
                >
                    {snackBarMsg}
                </Snackbar>
            </SafeAreaView>
            {filterModal()}
        </GestureHandlerRootView>
    )
    
    function checkoutScreenSections(){
        return (
            <>
                {header()}   
                <View style={styles.categorySlides}>
                    <Pressable onPress={() => navigation.navigate('BottomTabBar')}> 
                        <View style={styles.titleSlide}> 
                            <Text style={styles.buttonStartShopping}>
                                Start Shopping
                            </Text> 
                        </View>
                    </Pressable>
                    <View style={styles.textExmptyBag}>                         
                        <Text style={styles.emptyMainText}>
                                            Your Bag is Empty
                        </Text> 
                        <Text style={styles.emptySubText}>
                            It seems like you haven't added any item to your bag yet. Start Shopping to fill your bag.
                        </Text>                         
                    </View>
                             
                </View> 
            </>
        )
    }
    
    function homescreensections() { 
        return (
            <>
                {header()}                
                <View style={styles.categorySlides}>
                    <Text style={styles.sectionTitle}>Delivery Address</Text>
                    <View style={styles.mainCardViewStstus}> 
                        <Pressable                    
                            style={styles.krushiIDEditAddress}
                            onPress={() => onPressOpenBottomSheet()}> 
                                <Text style={{ ...Fonts.whiteColor18Medium }}>
                                    Edit your address
                                </Text>
                        </Pressable> 
                        {addresses !== null && addresses.length != 0 && 
                            addresses.map((item, index) => {
                                if(item.shiping_info_id == selected_addresss){
                                    return (
                                        <>
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
                                                        {item.buyer_name}
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
                                                        {item.buyer_mobile}
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
                                                       {item.buyer_short_address}  
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
                                                       {item.buyer_address_1}, {item.buyer_address_2}
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
                                                       {item.country_name}, {item.state_name},  {item.city_name}, {item.buyer_zip}
                                                    </Text>  
                                                </View>
                                            </View>
                                        </>
                                    )
                                }else if(selected_addresss == null && index == 0){
                                    return (
                                        <>
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
                                                        {item.buyer_name}
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
                                                        {item.buyer_mobile}
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
                                                       {item.buyer_short_address}  
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
                                                       {item.buyer_address_1}, {item.buyer_address_2}
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
                                                       {item.country_name}, {item.state_name},  {item.city_name}, {item.buyer_zip}
                                                    </Text>  
                                                </View>
                                            </View>
                                        </>
                                    )
                                }
                            })
                        
                        }
                    </View>
                    <Text style={styles.sectionTitle}>Ordered Products</Text>
                    <View style={styles.mainCardView}>
                        {orderDetail !== null && orderDetail.length != 0 && 
                            orderDetail.map((product, index) => {
                                return (
                                    <>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}} key={index}>
                                        <View style={styles.subCardView}>
                                            <Image
                                                source={{ uri: product.product_info.image_thumb}}
                                                //source={require('../../assets/krushi-icon.png')}
                                                resizeMode="cover"
                                                style={styles.productImage}
                                            />
                                        </View>
                                        <View style={{marginLeft: 12,flexShrink: 1}}>
                                          <Text
                                            style={{
                                              color: Colors.blackColor,                         
                                              ...Fonts.orangeColor14Bold,
                                              
                                            }}>
                                            {product.product_info.product_name}
                                          </Text> 
                                          <View
                                            style={{
                                                borderWidth: 0,
                                                width: '100%',
                                                justifyContent: 'space-between',                                               
                                                flexDirection:'row',
                                                alignItems:'center',
                                                flexShrink: 1
                                            }}>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Bold,
                                              }}>
                                              Seller Name: 
                                            </Text>                                            
                                          </View>   
                                          <View
                                            style={{
                                                borderWidth: 0,
                                                width: '100%',
                                                justifyContent: 'space-between',                                               
                                                flexDirection:'row',
                                                alignItems:'center',
                                                flexShrink: 1
                                            }}>                                            
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Bold,
                                                textTransform: 'capitalize',
                                                flexShrink: 1,
                                                textAlign:'right'
                                              }}>
                                               { product.product_info.seller_name} { product.product_info.seller_last_name}  ({product.sellers[0].product_district}) 
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
                                              Type:  
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                               {product.product_info.product_type_name} 
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
                                              Quality: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                               {product.product_info.product_quality_name} 
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
                                              Unit Price:
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                                ₹ { product.product_info.onsale_price} 
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
                                              Quantity: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                               {product.product_qty} {product.product_info.unit}  
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
                                              Total: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                               ₹ { product.item_total} 
                                            </Text>
                                          </View>
                                        </View>
                                    </View>
                                    {product.is_delivered == 1 && (
                                        <>
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
                                                ...Fonts.blackColor14Bold,
                                              }}>
                                              DELIVERY DISTANCE: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Bold,
                                                textTransform: 'capitalize'
                                              }}>
                                               { product.delivered_distance} KMS
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
                                                ...Fonts.blackColor14Bold,
                                              }}>
                                              DELIVERY CHARGE:
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Bold,
                                                textTransform: 'capitalize'
                                              }}>
                                                ₹ { product.delivered_distance}  
                                            </Text>
                                          </View> 
                                        </>
                                    )}
                                    {product.is_delivered == 0 && (
                                        <>
                                        <View
                                            style={{
                                            borderWidth: 0,
                                            width: '100%',
                                            justifyContent: 'space-between',                                               
                                            flexDirection:'row',
                                            alignItems:'center',
                                            marginBottom: Sizes.fixPadding * 2.0,
                                            borderBottomWidth: 1.5, borderBottomColor: Colors.borderLightColor
                                            }}>                                            
                                            <Text
                                                style={{
                                                    color: Colors.blackColor,
                                                    ...Fonts.blackColor14Bold,
                                                    paddingVertical: Sizes.fixPadding
                                                }}>
                                                (THIS PRODUCT WILL NOT DELIVER AT SELECTED LOCATION)
                                            </Text>                                            
                                        </View>
                                        </>
                                    )}
                                    <View
                                        style={{
                                        borderWidth: 0,
                                        width: '100%',
                                        justifyContent: 'space-between',                                               
                                        flexDirection:'row',
                                        alignItems:'center',
                                        marginBottom: Sizes.fixPadding * 2.0,
                                        borderBottomWidth: 1.5, borderBottomColor: Colors.borderLightColor
                                        }}>
                                        {/*<Pressable 
                                                style={{ color: Colors.blackColor, backgroundColor: product.is_delivered == 1 ? Colors.greenColor : Colors.greyColor, padding: Sizes.fixPadding, marginVertical: Sizes.fixPadding }}
                                                disabled={product.is_delivered == 1 ? false : true}
                                                onPress={() => setModalVisible(true)}>
                                                {isLoading && 
                                                    <ActivityIndicator size="small" color="#ffffff" />
                                                }
                                                {!isLoading && 
                                                    <Text style={{...Fonts.whiteColor14Regular}}>
                                                        Edit Product
                                                    </Text>
                                                } 
                                        </Pressable> */}                                    
                                        <Pressable 
                                                style={{ color: Colors.blackColor, backgroundColor: Colors.redColor, padding: Sizes.fixPadding, marginVertical: Sizes.fixPadding }}
                                                disabled={isLoading}
                                                onPress={() => onPressDeleteProduct(product.cart_id,product.buyer_id)}>
                                                {isLoading && 
                                                    <ActivityIndicator size="small" color="#ffffff" />
                                                }
                                                {!isLoading && 
                                                    <Text style={{...Fonts.whiteColor14Regular}}>
                                                        Delete Product
                                                    </Text>
                                                } 
                                        </Pressable>
                                        
                                    </View>

                                    </>
                                )
                            })
                        
                        }
                        
                    </View>
                    
                    
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.mainCardViewStstus}> 
                        <View
                            style={{
                            borderWidth: 0,
                            width: '100%',
                            justifyContent: 'space-between',                                               
                            flexDirection:'row',
                            alignItems:'center',
                            marginVertical: Sizes.fixPadding,
                            borderBottomWidth: 1.5,
                            borderBottomColor: Colors.borderLightColor
                            }}>
                            <Text
                                style={{
                                    color: Colors.blackColor,
                                    ...Fonts.blackColor16Bold,
                                }}>
                                Cart Subtotal:
                            </Text>
                            <Text
                                style={{
                                    color: Colors.blackColor,
                                    ...Fonts.greenColor16Bold,
                                }}>
                                ₹ {cartTotal !== null ? cartTotal : 0} 
                            </Text>
                        </View>
                       <View
                            style={{
                            borderWidth: 0,
                            width: '100%',
                            justifyContent: 'space-between',                                               
                            flexDirection:'row',
                            alignItems:'center',
                            marginVertical: Sizes.fixPadding,
                            borderBottomWidth: 1.5,
                            borderBottomColor: Colors.borderLightColor
                            }}>
                            <Text
                                style={{
                                    color: Colors.blackColor,
                                    ...Fonts.blackColor16Bold,
                                }}>
                                Platform Fee :
                            </Text>
                            <Text
                                style={{
                                    color: Colors.blackColor,
                                    ...Fonts.greenColor16Bold,
                                }}>
                                ₹ {platFormFee !== null ? platFormFee : 0} 
                            </Text>
                        </View>
                        <View
                            style={{
                            borderWidth: 0,
                            width: '100%',
                            justifyContent: 'space-between',                                               
                            flexDirection:'row',
                            alignItems:'center',
                            marginVertical: Sizes.fixPadding,
                            borderBottomWidth: 1.5,
                            borderBottomColor: Colors.borderLightColor
                            }}>
                            <Text
                                style={{
                                    color: Colors.blackColor,
                                    ...Fonts.blackColor16Bold,
                                }}>
                                Shipping and Handling:
                            </Text>
                            <Text
                                style={{
                                    color: Colors.blackColor,
                                    ...Fonts.greenColor16Bold,
                                }}>
                                ₹ {deliveryCharge !== null ? deliveryCharge : 0} 
                            </Text>
                        </View>

                        <View
                            style={{
                            borderWidth: 0,
                            width: '100%',
                            justifyContent: 'space-between',                                               
                            flexDirection:'row',
                            alignItems:'center',
                            marginVertical: Sizes.fixPadding
                            }}>
                            <Text
                                style={{
                                    color: Colors.blackColor,
                                    ...Fonts.blackColor16Bold,
                                }}>
                                Grand Total:
                            </Text>
                            <Text
                                style={{
                                    color: Colors.blackColor,
                                    ...Fonts.greenColor16Bold,
                                }}>
                                ₹ {cartSubTotal !== null ? cartSubTotal : 0} 
                            </Text>
                        </View>    
                    </View>
                </View>
                
            </>
        )
    }

    function filterModal(){
        //let selected_address = await AsyncStorage.getItem('selected_address');
        return (
            <BottomSheet ref={refAddress}>
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
            </BottomSheet>
        );
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
                    <Text style={styles.headerText}>Your Cart Detail</Text>                   
                </View>  
            </View>
        )
    }
}

export default BuyerCheckoutScreen;
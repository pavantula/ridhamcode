import React, { useCallback,createRef, useState, useEffect, useRef, useMemo, useContext } from "react";
import { SafeAreaView, View, StatusBar, Button, ScrollView, Pressable, FlatList, Image, ActivityIndicator, Dimensions, RefreshControl, StyleSheet, ImageBackground, Text, TextInput, Alert, Animated, Platform,useWindowDimensions, TouchableOpacity  } from "react-native";
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

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const BuyerOrderDetailScreen = ({ route, navigation }) => {
    const { t, i18n } = useTranslation();     
    const { order_id } = route.params;
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

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            generateOrderDetails();
            setRefreshing(false);
        }, 2000);
    }, []);

    const ref = useRef<BottomSheetRefProps>(null);

    const generateOrderDetails = () => {
        AsyncStorage.getItem('token').then(async (token) => {
            if(!token){
                navigation.navigate('SellerLoginScreen');
            }
        });
        AsyncStorage.getItem('user').then(async (user) => {
            if(user){
                const user_array = JSON.parse(user);
                setUserData(JSON.parse(user));
                const token = await AsyncStorage.getItem('token');
                try {              
                    const formData = new FormData();
                    formData.append('buyer_id', user_array.buyer_id);   
                    formData.append('order_id', order_id);  
                    const response = await axios.post(
                        'buyerorderdetails', 
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
                            updateState({ orderDetail: response.data.result }); 
                        }
                    } 
                } catch (e) { 
                  console.log(e)
                }
            }
        }); 
    };

    const updateOrderStatus = async (status_id, product_id, location_id) => {
        const token = await AsyncStorage.getItem('token');
        try {              
            const formData = new FormData();
            formData.append('location_id', location_id);   
            formData.append('product_id', product_id);
            formData.append('order_id', order_id);
            formData.append('order_status', status_id);  
            formData.append('reason', '');
            const response = await axios.post(
                'updateorderstatus', 
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
                        generateOrderDetails(); 
                        Alert.alert (
                            "Status Update",
                            "Order status has been updated successfully.",
                            [                              
                              {
                                text: 'OK',
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
    const onPress = async (status_id, product_id, location_id, order_details_id) => {
        setLoading(true);
        if(status_id == 2){
            updateOrderStatus(status_id, product_id, location_id);
        }else if(status_id == 3){
            setLoading(false); 
            updateState({ statusId: status_id, productId: product_id, locationId: location_id, orderDetailsId: order_details_id });
            const isActive = ref?.current?.isActive();
            if (isActive) {
              ref?.current?.scrollTo(0);
            } else {
              ref?.current?.scrollTo(-600);
            } 
        }else{
            setLoading(false);
        }
         
    };

    useEffect(() => { 
        AsyncStorage.getItem('token').then(async (token) => {
            if(!token){
                Alert.alert (
                    "Order Details",
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
                generateOrderDetails();
            }
        });
    },[]); 

    const onChang = (event, selectDate) => {
        const currentDate = selectDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setTextAvailableDate(fDate);
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const {    
        showSnackBar,
        snackBarMsg,
        orderDetail,
        statusId,
        productId,
        locationId,
        orderDetailsId
    } = state;

    const onSubmit = async (data) => {
        let bdate = Moment(date).format('YYYY-MM-DD');
        setLoading(true); 
        const token = await AsyncStorage.getItem('token');            
            try {              
                const formData = new FormData();
                formData.append('order_details_id', orderDetailsId);   
                formData.append('shipping_name', data.shipping_name);
                formData.append('order_id', order_id);
                formData.append('shipping_no', data.shipping_no);  
                formData.append('seller_id', user_data.seller_id);
                formData.append('exp_delivery_date', bdate);  
                const response = await axios.post(
                    'saveprodtracking', 
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `${token}`,
                        }   
                    }   
                );
                if(response){                         
                    if(!response.status){
                        setLoading(false);
                        setError("Error in adding info");
                    }else{
                        setLoading(false); 
                        ref?.current?.scrollTo(0);
                        updateOrderStatus(statusId, productId, locationId); 
                    }
                } 
            } catch (e) {
                  setLoading(false); 
                  console.log(e.response)
            }
    };
    
   
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGreyColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}> 
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
            <BottomSheet ref={ref}>
                <View style={styles.categorySlides}>
                    <Text style={styles.sectionTitle}>Add Shipping Details</Text>
                </View>
                <View style={styles.categorySlides}>                          
                    <Text style={styles.fieldLabel}>                         
                        Shipping Name
                    </Text> 
                    <View style={styles.textInfoWrapStyle}>
                        <Controller
                            control={control}
                            rules={{
                                required: 'Shipping Name is required',
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (                                  
                                <TextInput
                                    placeholderTextColor={Colors.grayColor}
                                    style={{ flex: 1, ...Fonts.blackColor14Regular }}                                            
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder={'Shipping Name'}
                                />   
                            )}
                            name="shipping_name"
                        />                                                  
                    </View>   
                    {errors.shipping_name && <Text style={{ ...Fonts.redColor14Regular, marginHorizontal: Sizes.fixPadding, }}>{errors.shipping_name.message}</Text>}                        
                </View>
                <View style={styles.categorySlides}>                          
                    <Text style={styles.fieldLabel}>                         
                        Tracking Number
                    </Text> 
                    <View style={styles.textInfoWrapStyle}>
                        <Controller
                            control={control}
                            rules={{
                                required: 'Tracking Number is required',
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (                                  
                                <TextInput
                                    placeholderTextColor={Colors.grayColor}
                                    style={{ flex: 1, ...Fonts.blackColor14Regular }}                                            
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder={'Tracking Number'}
                                />   
                            )}
                            name="shipping_no"
                        />                                                  
                    </View>   
                    {errors.shipping_no && <Text style={{ ...Fonts.redColor14Regular, marginHorizontal: Sizes.fixPadding, }}>{errors.shipping_no.message}</Text>}                        
                </View> 
                <View style={styles.categorySlides}>                          
                    <Text style={styles.fieldLabel}>                         
                        Expected Deliver Date
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
                                    placeholder={'Select Expected Deliver Date'}
                                    editable={false}
                                />   
                            )}
                            name="exp_delivery_date"
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
                <Pressable                    
                    style={styles.krushiIDCheckMain}
                    disabled={isLoading}
                    onPress={handleSubmit(onSubmit)}>   
                    {isLoading && 
                        <ActivityIndicator size="small" color="#ffffff" />
                    }
                    {!isLoading && 
                        <Text style={{ ...Fonts.whiteColor18Medium }}>
                            Add Shipping Info
                        </Text>
                    } 
                </Pressable>
            </BottomSheet>
        </GestureHandlerRootView>
    )
    
    function homescreensections() {     
        return (
            <>
                {header()}                
                <View style={styles.categorySlides}>
                    <Text style={styles.sectionTitle}>Ordered Products</Text>
                    <View style={styles.mainCardView}>
                        {orderDetail !== null && orderDetail.product_ino.length != 0 && 
                            orderDetail.product_ino.map((product, index) => {
                                return (
                                    <>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}} key={index}>
                                        <View style={styles.subCardView}>
                                            <Image
                                                source={{ uri: product.image_thumb}}
                                                //source={require('../../assets/krushi-icon.png')}
                                                resizeMode="cover"
                                                style={styles.productImage}
                                            />
                                        </View>
                                        <View style={{marginLeft: 12,flexShrink: 1}}>
                                          <Text
                                            style={{
                                              color: Colors.blackColor,                         
                                              ...Fonts.orangeColor14Medium,
                                              
                                            }}>
                                            {product.product_name}
                                          </Text>                                          
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
                                               {product.product_type_name} 
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
                                               {product.product_quality_name} 
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
                                                ₹ {product.onsale_price} 
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
                                               {product.order_qty} {product.unit}  
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
                                              Location: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                               {product.location_name} / {product.location_code}  
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
                                              Seller Name: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                                textTransform: 'capitalize'
                                              }}>
                                               {product.seller_name} {product.seller_last_name}  
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
                                               ₹ {product.order_total} 
                                            </Text>
                                          </View>
                                        </View>
                                    </View>
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
                                                ...Fonts.blackColor14Medium,
                                            }}>
                                            Status:
                                        </Text>
                                        <Text
                                            style={{
                                                color: Colors.blackColor,
                                                ...Fonts.orangeColor14Medium,
                                                paddingVertical: Sizes.fixPadding
                                            }}>
                                            {product.order_status_label}
                                        </Text>
                                        {product.next_order_status_value && (
                                            <Pressable 
                                                style={{ color: Colors.blackColor, backgroundColor: Colors.greenColor, padding: Sizes.fixPadding, marginVertical: Sizes.fixPadding }}
                                                disabled={isLoading}
                                                onPress={() => onPress(product.next_order_status_value,product.product_id,product.location_id,product.order_details_id)}>
                                                {isLoading && 
                                                    <ActivityIndicator size="small" color="#ffffff" />
                                                }
                                                {!isLoading && 
                                                    <Text style={{...Fonts.whiteColor14Regular}}>
                                                        {product.next_order_status_label}
                                                    </Text>
                                                } 
                                            </Pressable>
                                        )}
                                        
                                    </View>

                                    </>
                                )
                            })
                        
                        }
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
                                ₹ {orderDetail !== null ? orderDetail.sub_total : 0} 
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
                                ₹ {orderDetail !== null ? orderDetail.platform_fee : 0} 
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
                                ₹ {orderDetail !== null ? orderDetail.delivery_charge : 0} 
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
                                ₹ {orderDetail !== null ? orderDetail.order_total : 0} 
                            </Text>
                        </View>            
                    </View>
                    
                    <Text style={styles.sectionTitle}>Order Status History</Text>
                    <View style={styles.mainCardViewStstus}> 
                        {orderDetail !== null && orderDetail.status_histort.length != 0 && 
                            orderDetail.status_histort.map((product, index) => {
                                return (
                                    <>
                                         <View
                                            style={{
                                              borderWidth: 0,
                                              width: '100%',
                                              borderBottomWidth: 1.5,
                                              borderBottomColor: Colors.borderLightColor,
                                              marginVertical: Sizes.fixPadding,
                                              borderTopColor: Colors.borderLightColor,
                                              borderTopWidth: 1.5,
                                              paddingVertical: Sizes.fixPadding,
                                              paddingHorizontal: 5,
                                            }}>
                                            <Text
                                                style={{
                                                  color: Colors.blackColor,                         
                                                  ...Fonts.greenColor16Bold,
                                                }}>
                                                Order ID: {product.order_id}
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
                                              Order Status: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                                {product.order_status_label}
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
                                              Ordered Date: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                                {product.created_at}
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
                                              }}>
                                              Message:
                                            </Text>
                                            <Text
                                              style={{                                               
                                                ...Fonts.orangeColor14Medium,
                                                flexShrink: 1,
                                                textAlign:'right'
                                              }}>
                                                {product.statusMessage}
                                            </Text>
                                          </View>
                                        </>
                          )
                            })
                        
                        }
                    </View>
                    <Text style={styles.sectionTitle}>Shipping Address</Text>
                    <View style={styles.mainCardViewStstus}> 
                        {orderDetail !== null && orderDetail.shipping_info.length != 0 && 
                            orderDetail.shipping_info.map((product, index) => {
                                return (
                                    <View style={{ padding: Sizes.fixPadding}}>
                                        
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
                                              Buyer name: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                                {product.buyer_name}
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
                                              Email Address: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                                {product.buyer_email}
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
                                              Phone Number:
                                            </Text>
                                            <Text
                                              style={{                                               
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                                {product.buyer_mobile}
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
                                              Short Address:
                                            </Text>
                                            <Text
                                              style={{                                               
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                                {product.buyer_short_address}
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
                                              Address line 1:
                                            </Text>
                                            <Text
                                              style={{                                               
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                                {product.buyer_address_1}
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
                                              Country:
                                            </Text>
                                            <Text
                                              style={{                                               
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                                {product.country_name}
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
                                              State:
                                            </Text>
                                            <Text
                                              style={{                                               
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                                {product.state_name}
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
                                              City:
                                            </Text>
                                            <Text
                                              style={{                                               
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                                {product.city_name}
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
                                              Zipcode:
                                            </Text>
                                            <Text
                                              style={{                                               
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                                {product.buyer_zip}
                                            </Text>
                                          </View>
                                        </View>
                          )
                            })
                        
                        }
                    </View>
                </View>
                
            </>
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
                    <Text style={styles.headerText}>Your Order Detail</Text>                   
                </View>  
            </View>
        )
    }
}

export default BuyerOrderDetailScreen;
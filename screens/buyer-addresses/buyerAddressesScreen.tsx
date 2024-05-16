import React, { createRef, useState, useEffect, useRef } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, Pressable, FlatList, Image, Dimensions, StyleSheet, ImageBackground, RefreshControl, Text, TextInput, Alert, Animated, Platform } from "react-native";
import { Colors, Fonts, Sizes, ElementsText, window } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { Menu } from 'react-native-material-menu';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import moment from "moment";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'expo-linear-gradient';
import { DataTable } from 'react-native-paper'; 
import {useIsFocused} from '@react-navigation/native';

import { useNavigation, draweractions } from "@react-navigation/native";

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const BuyerAddressesScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { t, i18n } = useTranslation();
    const navigate = useNavigation();
    const [state, setState] = useState({        
        addresses: [],
        showSnackBar: false,
        snackBarMsg: null,
    });
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          generateAddresss();
          setRefreshing(false);
        }, 2000);
    }, []);

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
                setLoading(true);
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
                    setLoading(false); 
                }
            }
        }); 
    };

    useEffect(() => { 
        AsyncStorage.getItem('token').then(async (token) => {
            if(!token){
                Alert.alert (
                    "My Addresses",
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
                generateAddresss();
            }
        }); 
        if (isFocused) {            
            generateAddresss();
        } 
    },[isFocused]);  

    const signOutBuyer = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Loader');
        }
        catch(exception) {
            return false;
        }
    }

    // Initial states of slide index and slides
    const [currentIndex, setCurrentIndex] = useState(0),
          [value, setValue] = useState(0);

    const {        
        addresses,
        showSnackBar,
        snackBarMsg,
    } = state;
   
    return (
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
    )
    
    function homescreensections() {        
        return (
            <>
                {header()}
                <View style={styles.categorySlides}>
                    <Pressable onPress={() => navigation.navigate('BuyerAddAddress')}> 
                        <View style={styles.titleSlide}> 
                            <Text style={styles.buttonStartShopping}>
                                Add Delivery Address
                            </Text> 
                        </View>
                    </Pressable>
                    <Text style={styles.titleText}>
                        View All Addresses
                    </Text> 
                    <FlatList
                        data={Object.keys(addresses)}
                        renderItem={({ item, index }) => 
                            <ShimmerPlaceHolder visible={isLoading}>                  
                                <Pressable onPress={() => navigation.navigate('BuyerEditAddress', { shiping_info_id: addresses[item].shiping_info_id })}>
                                    <View style={styles.mainCardView}>
                                        <View
                                            style={{
                                                borderBottomWidth: 1.5,
                                                borderColor: Colors.borderLightColor,
                                                width: '100%',
                                            }}>
                                            <Text
                                                style={{
                                                    color: Colors.blackColor,                         
                                                    ...Fonts.blackColor14Bold,
                                                }}>
                                                {addresses[item].buyer_name +", "+addresses[item].buyer_mobile}
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
                                              Short Address: 
                                            </Text>
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
                                                ...Fonts.blackColor14Medium,
                                              }}>
                                              Address Line1: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                               {addresses[item].buyer_address_1}
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
                                              Address Line2: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                               {addresses[item].buyer_address_2}
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
                                              Country: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                               {addresses[item].country_name}
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
                                              State:
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                               {addresses[item].state_name}
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
                                              City:  
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                               {addresses[item].city_name}
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
                                              Zipcode: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                               {addresses[item].buyer_zip}
                                            </Text> 
                                        </View>
                                        <View
                                            style={{
                                              height: 38,
                                              backgroundColor: Colors.greenColor,
                                              borderWidth: 0,
                                              width: 38,
                                              marginLeft: -26,
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              position: 'absolute',
                                              right: 0,
                                              top: 0,
                                              borderRadius: 5,
                                            }}>
                                            <Text style={{color: Colors.whiteColor}}>
                                              <AntDesign name="edit" size={24} color={Colors.whiteColor} />
                                            </Text>
                                      </View>
                                    </View>
                                  </Pressable>
                            </ShimmerPlaceHolder>
                        }
                        keyExtractor={item => addresses[item].shiping_info_id}
                        numColumns={1}
                    />

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
                    <Text style={styles.headerText}>My Delivery Addresses</Text>                   
                </View>  
            </View>
        )
    }
}

export default BuyerAddressesScreen;
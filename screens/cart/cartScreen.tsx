import React, { createRef, useState, useEffect, useRef } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, Pressable, FlatList, Image, Dimensions, StyleSheet, ImageBackground, Text, TextInput, Alert, Animated, Platform } from "react-native";
import { Colors, Fonts, Sizes, ElementsText, window } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { Menu } from 'react-native-material-menu';
import styles from './styles';
import { dummyDataForAffairs } from '../../data/currentAffairs';
import { dummyDataForCategories } from '../../data/categories'; 
import { dummyDataForProducts } from '../../data/products';
import { dummyBanners } from '../../data/banners';
import Carousel from 'react-native-reanimated-carousel';
//import Carousel from 'react-native-snap-carousel';
import { useTranslation } from 'react-i18next';
import moment from "moment";
// Components
import Slider from "../../components/Slider/Slider";
import ScrollButton from "../../components/ScrollButton/ScrollButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaginationItem } from "../../components/paginationItem";
import {
  useSharedValue,
} from "react-native-reanimated";
// StyleSheets
import globalStyles from "../../components/styles/globalStyles";
import sliderStyles from "../../components/styles/SliderStyles";

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const CartScreen = ({ navigation }) => {

    const [user_data, setUserData] = useState();

    const [state, setState] = useState({ 
        showSnackBar: false,
        snackBarMsg: null,
        orderDetail: [],
    });
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const [isLoggedIn, setUserIsLoggedIn] = useState(false);

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
                try {              
                    const formData = new FormData();
                    formData.append('buyer_id', user_array.buyer_id);
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
                        //console.log(response)

                        if(!response.data.status){                               
                            setError(response.data.message);
                            updateState({ orderDetail: [] }); 
                        }else{ 
                            setError('');
                            updateState({ orderDetail: response.data.result.length > 0 ? response.data.result : [] }); 
                        }
                    } 
                } catch (e) { 
                  console.log(e)
                }
            }
        }); 
    };

    useEffect(() => { 
        AsyncStorage.getItem('token').then(async (token) => {
            if(!token){
                setUserIsLoggedIn(false);
            }else{
                setUserIsLoggedIn(true);
                generateCartDetails();
            }
        });
    },[]); 

    const {    
        showSnackBar,
        snackBarMsg,
        orderDetail,
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
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 5.0, }}
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
                <View style={styles.productsSlides}>
                    {isLoggedIn && error == "" && orderDetail.length > 0 && 
                                <View style={styles.textExmptyBag}>                         
                                    <Text style={styles.emptyMainText}>
                                        You already have added products in cart. 
                                    </Text> 
                                    <Pressable onPress={() => navigation.navigate('BuyerCheckout')}> 
                                        <View style={styles.titleSlide}> 
                                            <Text style={styles.buttonStartShopping}>
                                                Go To Cart Details
                                            </Text> 
                                        </View>
                                    </Pressable>                        
                                </View>
                    }
                    {isLoggedIn && error != "" && orderDetail.length == 0 && 
                                <>
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
                                </>
                    }

                    {!isLoggedIn && (
                        <>
                            <Pressable onPress={() => navigation.navigate('BuyerLoginScreen')}> 
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
                        </>
                    )}                    
                </View>
            </>
        )
    }
}

export default CartScreen;
import React, { createRef, useState, useEffect, useRef } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, Pressable, FlatList, Image, Dimensions, StyleSheet, ImageBackground, Text, TextInput, Alert, Animated, Platform } from "react-native";
import { Colors, Fonts, Sizes, ElementsText, window } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { Badge } from 'react-native-paper';
import { IconButton, MD3Colors } from 'react-native-paper';
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserAvatar from 'react-native-user-avatar';
import { PaginationItem } from "../../components/paginationItem";
import {
  useSharedValue,
} from "react-native-reanimated";
// StyleSheets
import globalStyles from "../../components/styles/globalStyles";
import sliderStyles from "../../components/styles/SliderStyles";
import axios from "axios";

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const AccountScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();

    const [state, setState] = useState({
        categories: dummyDataForCategories,
        products: dummyDataForProducts,
        showSnackBar: false,
        snackBarMsg: null,
        user_data: null,
        user_role: null,
    });

    const [cartBadge, setCartBadge] = useState(0); 

    const updateState = (data) => setState((state) => ({ ...state, ...data }))
    useEffect(() => {  
        AsyncStorage.getItem('token').then(async (token) => {
            if(!token){
               
            }else{
                // AsyncStorage.getItem('user').then((user) => {
                //     if(user){
                //         updateState({ user_data: JSON.parse(user) });
                //     }
                // });

                // AsyncStorage.getItem('role').then((role) => {
                //     if(role){
                //         updateState({ user_role: role });
                //         if(role == 'buyer'){
                //             generateCartDetails(); 
                //         }
                //     }
                // });
            }
        });
        
    },[]);  
    const generateCartDetails = () => {
        // AsyncStorage.getItem('user').then(async (user) => {
        //     if(user){
        //         const user_array = JSON.parse(user);
        //         const token = await AsyncStorage.getItem('token');
        //         const selected_address = await AsyncStorage.getItem('selected_address');
        //         try {              
        //             const formData = new FormData();
        //             formData.append('buyer_id', user_array.buyer_id);
        //             if(selected_address != null){
        //                 formData.append('shiping_info_id', selected_address);
        //             } 
        //             const response = await axios.post(
        //                 'viewcart', 
        //                 formData,
        //                 {
        //                     headers: {
        //                         'Content-Type': 'multipart/form-data',
        //                         'Authorization': `${token}`,
        //                     }   
        //                 }   
        //             );
        //             if(response){                         
        //                 if(!response.data.status){
        //                     setError(response.data.message);
        //                 }else{    
        //                     setCartBadge(response.data.result ? response.data.result.length : 0);
        //                 }
        //             } 
        //         } catch (e) { 
        //           console.log(e)
        //         }
        //     }else{
        //         setCartBadge(0);
        //     }
        // }); 
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

    const signOutBuyer = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Loader');
        }
        catch(exception) {
            console.log(exception);
            return false;
        }
    }

    const {
        categories,
        products,
        showSnackBar,
        snackBarMsg,
        user_data,
        user_role,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGreyColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>     

                <FlatList
                    ListHeaderComponent={
                        <>                                    
                            {profileInfo()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}
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

    function profileInfo() {
        return (
            <>
            {header()}               
                <View style={styles.productsSlides}>
                    {user_data && user_role && user_role == 'seller' && (
                        <View style={styles.userProfileData}>
                            <UserAvatar size={100} name={user_data.seller_name+ " " + user_data.seller_last_name} />
                            <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                {user_data.seller_name+ " " + user_data.seller_last_name}
                            </Text> 

                            <Text style={{ ...Fonts.blackColor14Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                {user_data.seller_email}
                            </Text> 
                        </View>
                         
                    )}
                    {user_data && user_role && user_role == 'buyer' && (
                        <View style={styles.userProfileData}>
                            <UserAvatar size={100} name={user_data.first_name+ " " + user_data.last_name} />
                            <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                {user_data.first_name+ " " + user_data.last_name}
                            </Text> 

                            <Text style={{ ...Fonts.blackColor14Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                {user_data.buyer_email}
                            </Text> 
                        </View>
                         
                    )}
                    {user_data == null && (
                        <Pressable onPress={() => navigation.navigate('Onboarding')}>                         
                            <View style={styles.titleSlide}> 
                                <View style={{ flex: 1, flexDirection: 'row'}}>
                                    <Text style={{ ...Fonts.blackColor16Light, }}>
                                        <AntDesign name="search1" size={24} color={Colors.greenColor} />
                                    </Text>                         
                                    <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                        Login
                                    </Text>  
                                </View>
                                <View>
                                    <Text style={{ ...Fonts.blackColor16Light, textAlign: 'right' }}>
                                        <Feather name="chevron-right" size={24} color={Colors.orangeColor} />
                                    </Text> 
                                </View>                        
                            </View>
                        </Pressable>
                    )}

                    {user_role && user_role == 'seller' && (
                        <Pressable onPress={() => navigation.navigate('SellerProfileUpdate')}>                         
                            <View style={styles.titleSlide}> 
                                <View style={{ flex: 1, flexDirection: 'row'}}>
                                    <Text style={{ ...Fonts.blackColor16Light, }}>
                                        <AntDesign name="edit" size={24} color={Colors.greenColor} />
                                    </Text>                         
                                    <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                        Update Profile
                                    </Text>  
                                </View>
                                <View>
                                    <Text style={{ ...Fonts.blackColor16Light, textAlign: 'right' }}>
                                        <Feather name="chevron-right" size={24} color={Colors.orangeColor} />
                                    </Text> 
                                </View>                        
                            </View>
                        </Pressable>
                    )}
                    {user_role && user_role == 'buyer' && (
                        <>
                            <Pressable>                         
                                <View style={styles.titleSlide}> 
                                    <View style={{ flex: 1, flexDirection: 'row'}}>
                                        <Text style={{ ...Fonts.blackColor16Light, }}>
                                            <MaterialCommunityIcons name="account-circle-outline" size={24} color={Colors.greenColor} />
                                        </Text>                         
                                        <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                            My Account
                                        </Text>  
                                    </View>
                                    <View>
                                        <Text style={{ ...Fonts.blackColor16Light, textAlign: 'right' }}>
                                            <Feather name="chevron-right" size={24} color={Colors.orangeColor} />
                                        </Text> 
                                    </View>                        
                                </View>
                            </Pressable>
                            <Pressable onPress={() => navigation.navigate('BuyerAddresses')}>                         
                                <View style={styles.titleSlide}> 
                                    <View style={{ flex: 1, flexDirection: 'row'}}>
                                        <Text style={{ ...Fonts.blackColor16Light, }}>
                                            <FontAwesome5 name="address-card" size={24} color={Colors.greenColor} />
                                        </Text>                         
                                        <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                            My Addresses
                                        </Text>  
                                    </View>
                                    <View>
                                        <Text style={{ ...Fonts.blackColor16Light, textAlign: 'right' }}>
                                            <Feather name="chevron-right" size={24} color={Colors.orangeColor} />
                                        </Text> 
                                    </View>                        
                                </View>
                            </Pressable>
                            <Pressable onPress={() => navigation.navigate('BuyerOrders')}>                         
                                <View style={styles.titleSlide}> 
                                    <View style={{ flex: 1, flexDirection: 'row'}}>
                                        <Text style={{ ...Fonts.blackColor16Light, }}>
                                            <MaterialIcons name="add-shopping-cart" size={24} color={Colors.greenColor} />
                                        </Text>                         
                                        <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                            My Orders
                                        </Text>  
                                    </View>
                                    <View>
                                        <Text style={{ ...Fonts.blackColor16Light, textAlign: 'right' }}>
                                            <Feather name="chevron-right" size={24} color={Colors.orangeColor} />
                                        </Text> 
                                    </View>                        
                                </View>
                            </Pressable>
                            <Pressable onPress={() => navigation.navigate('BuyerPurchasedOrders')}>                         
                                <View style={styles.titleSlide}> 
                                    <View style={{ flex: 1, flexDirection: 'row'}}>
                                        <Text style={{ ...Fonts.blackColor16Light, }}>
                                            <MaterialCommunityIcons name="truck" size={24} color={Colors.greenColor} />
                                        </Text>                         
                                        <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                            Purchased Orders
                                        </Text>  
                                    </View>
                                    <View>
                                        <Text style={{ ...Fonts.blackColor16Light, textAlign: 'right' }}>
                                            <Feather name="chevron-right" size={24} color={Colors.orangeColor} />
                                        </Text> 
                                    </View>                        
                                </View>
                            </Pressable>
                            <Pressable onPress={() => signOutBuyer()}>                         
                                <View style={styles.titleSlide}> 
                                    <View style={{ flex: 1, flexDirection: 'row'}}>
                                        <Text style={{ ...Fonts.blackColor16Light, }}>
                                            <AntDesign name="logout" size={24} color={Colors.greenColor} />
                                        </Text>                         
                                        <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                            Logout
                                        </Text>  
                                    </View>
                                    <View>
                                        <Text style={{ ...Fonts.blackColor16Light, textAlign: 'right' }}>
                                            <Feather name="chevron-right" size={24} color={Colors.orangeColor} />
                                        </Text> 
                                    </View>                        
                                </View>
                            </Pressable>
                        </>
                    )}
                    
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: Sizes.fixPadding}}>
                        <Text style={{ ...Fonts.blackColor16Bold, paddingTop: 10,paddingLeft: 20,textAlign: 'left',}}>General Settings</Text>
                    </View>               
                    <Pressable onPress={() => navigation.navigate('AboutUsScreen')}>                         
                        <View style={styles.titleSlide}> 
                            <View style={{ flex: 1, flexDirection: 'row'}}>
                                <Text style={{ ...Fonts.blackColor16Light, }}>
                                    <FontAwesome name="building-o" size={24} color={Colors.greenColor} />
                                </Text>                         
                                <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                    About Us
                                </Text>  
                            </View>
                            <View>
                                <Text style={{ ...Fonts.blackColor16Light, textAlign: 'right' }}>
                                    <Feather name="chevron-right" size={24} color={Colors.orangeColor} />
                                </Text> 
                            </View>                        
                        </View>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('ContactUsScreen')}>                         
                        <View style={styles.titleSlide}> 
                            <View style={{ flex: 1, flexDirection: 'row'}}>
                                <Text style={{ ...Fonts.blackColor16Light, }}>
                                    <Feather name="phone-call" size={24} color={Colors.greenColor} />
                                </Text>                         
                                <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                    Contact Us
                                </Text>  
                            </View>
                            <View>
                                <Text style={{ ...Fonts.blackColor16Light, textAlign: 'right' }}>
                                    <Feather name="chevron-right" size={24} color={Colors.orangeColor} />
                                </Text> 
                            </View>                        
                        </View>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('AboutUsScreen')}>                         
                        <View style={styles.titleSlide}> 
                            <View style={{ flex: 1, flexDirection: 'row'}}>
                                <Text style={{ ...Fonts.blackColor16Light, }}>
                                    <AntDesign name="questioncircleo" size={24} color={Colors.greenColor} />
                                </Text>                         
                                <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                    FAQs
                                </Text>  
                            </View>
                            <View>
                                <Text style={{ ...Fonts.blackColor16Light, textAlign: 'right' }}>
                                    <Feather name="chevron-right" size={24} color={Colors.orangeColor} />
                                </Text> 
                            </View>                        
                        </View>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('PrivacyScreen')}>                         
                        <View style={styles.titleSlide}> 
                            <View style={{ flex: 1, flexDirection: 'row'}}>
                                <Text style={{ ...Fonts.blackColor16Light, }}>
                                    <AntDesign name="filetext1" size={24} color={Colors.greenColor} />
                                </Text>                         
                                <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                    Privacy Policy
                                </Text>  
                            </View>
                            <View>
                                <Text style={{ ...Fonts.blackColor16Light, textAlign: 'right' }}>
                                    <Feather name="chevron-right" size={24} color={Colors.orangeColor} />
                                </Text> 
                            </View>                        
                        </View>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('TermsScreen')}>                         
                        <View style={styles.titleSlide}> 
                            <View style={{ flex: 1, flexDirection: 'row'}}>
                                <Text style={{ ...Fonts.blackColor16Light, }}>
                                    <AntDesign name="infocirlceo" size={24} color={Colors.greenColor} />
                                </Text>                         
                                <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'left', paddingLeft: Sizes.fixPadding }}>
                                    Terms Of Service
                                </Text>  
                            </View>
                            <View>
                                <Text style={{ ...Fonts.blackColor16Light, textAlign: 'right' }}>
                                    <Feather name="chevron-right" size={24} color={Colors.orangeColor} />
                                </Text> 
                            </View>                        
                        </View>
                    </Pressable>
                </View>
            </>
        )
    }

    function header() {
        return (
           <View style={styles.headerWrapStyle}>
                {user_role && user_role == 'seller' ? (
                    <View style={styles.headerKrushi}>
                        <Image 
                            source={require('../../assets/logo-vertical.png')} 
                            style={{ width: 50, height: 50, }}
                        />                    
                    </View>
                ) : (                    
                    <View style={styles.headerKrushi}>
                        <Image 
                            source={require('../../assets/logo-vertical.png')} 
                            style={{ width: 50, height: 50, }}
                        />                    
                    </View>  
                )}                
                <View style={styles.headerKrushi}>
                    <Text style={styles.headerText}>Settings</Text>                      
                </View>  

                {user_role && user_role == 'seller' ? (
                    <Pressable onPress={() => signOutSeller()}> 
                        <Text style={{ ...Fonts.blackColor16Light, marginLeft: Sizes.fixPadding,flexShrink: 1, textAlign: 'right', marginTop: Sizes.fixPadding  }}>
                            <AntDesign name="logout" size={24} color={Colors.greenColor} />
                        </Text> 
                    </Pressable>
                ) : (        
                    <>
                        <Pressable onPress={() => navigation.navigate('BuyerCheckout')}>  
                        <View style={{ ...Fonts.blackColor16Light, marginLeft: Sizes.fixPadding,flexShrink: 1, textAlign: 'right', marginTop: Sizes.fixPadding  }}>
                                <IconButton icon="cart-outline" size={35} style={styles.button} color={Colors.greenColor}/>
                                <Badge
                                  visible={true}
                                  style={[styles.badge, { backgroundColor: Colors.orangeColor }]}
                                >
                                  {cartBadge}
                                </Badge>                        
                            </View> 
                        </Pressable>             
                        <Pressable onPress={() => navigation.navigate('SearchScreen')}> 
                            <Text style={{ ...Fonts.blackColor16Light, marginLeft: Sizes.fixPadding,flexShrink: 1, textAlign: 'right', marginTop: Sizes.fixPadding  }}>
                                <AntDesign name="search1" size={24} color={Colors.greenColor} />
                            </Text> 
                        </Pressable>
                    </>
                )}
            </View>
        )
    }
}

export default AccountScreen;
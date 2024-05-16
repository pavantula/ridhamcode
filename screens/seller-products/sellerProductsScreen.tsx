import React, { createRef, useState, useEffect, useRef } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, Pressable, FlatList, Image, Dimensions, StyleSheet, ImageBackground, Text, TextInput, Alert, Animated, Platform } from "react-native";
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

import { useNavigation, draweractions } from "@react-navigation/native";

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const SellerProductsScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigation();
    const [state, setState] = useState({        
        products: [],
        showSnackBar: false,
        snackBarMsg: null,
    });
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const updateState = (data) => setState((state) => ({ ...state, ...data }))
    useEffect(() => { 
        AsyncStorage.getItem('token').then(async (token) => {
            if(!token){
                navigation.navigate('SellerLoginScreen');
            }
        });
        AsyncStorage.getItem('user').then(async (user) => {
            if(user){
                const user_array = JSON.parse(user);
                const token = await AsyncStorage.getItem('token');
                setLoading(true);
                try {
                    const formData = new FormData();
                    formData.append('seller_id', user_array.seller_id); 

                    const response = await axios.post(
                        'getsellerproducts', 
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `${token}`,
                            }  
                        }   
                    );
                    if(response){ 
                        console.log(response.data)
                        if(!response.data.status){
                            setError(response.data.message);
                        }else{
                            const processedData = Object.values(response.data.result);
                            updateState({ products: processedData }); 
                        }
                    } 
                } catch (e) {
                  setLoading(false); 
                }
            }
        });  
    },[]);  

    const signOutSeller = async () => {
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
        products,
        showSnackBar,
        snackBarMsg,
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
                    <Pressable onPress={() => navigation.navigate('SellerAddProduct')}> 
                        <View style={styles.titleSlide}> 
                            <Text style={styles.buttonStartShopping}>
                                Config Product
                            </Text> 
                        </View>
                    </Pressable>
                    <Text style={styles.titleText}>
                        View All Products
                    </Text> 
                    {products && products.length > 0 && (
                    <FlatList
                        data={Object.keys(products)}
                        renderItem={({ item, index }) => 
                            <ShimmerPlaceHolder visible={isLoading}>                  
                                <Pressable onPress={() => navigation.navigate('SellerEditProduct', { product_id: products[item].product_id })}>
                                    <View style={styles.mainCardView}>
                                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={styles.subCardView}>
                                          <Image
                                            source={{ uri: products[item].image_thumb}}
                                            resizeMode="cover"
                                            style={styles.productImage}
                                          />
                                        </View>
                                        <View style={{marginLeft: 12,flexShrink: 1}}>
                                          <Text
                                            style={{
                                              color: Colors.blackColor,                         
                                              ...Fonts.blackColor14Bold,
                                            }}>
                                            {products[item].product_name}
                                          </Text>
                                          <View
                                            style={{
                                              borderWidth: 0,
                                              width: '100%',
                                            }}>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              Type: {products[item].product_type_name}
                                            </Text>
                                          </View>
                                          <View
                                            style={{
                                              borderWidth: 0,
                                              width: '100%',
                                            }}>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              Variety: {products[item].product_variety_name}
                                            </Text>
                                          </View>
                                          <View
                                            style={{
                                              borderWidth: 0,
                                              width: '100%',
                                            }}>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              Available In: {products[item].product_available_name}
                                            </Text>
                                          </View>
                                          <View
                                            style={{
                                              borderWidth: 0,
                                              width: '100%',
                                            }}>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              Available Qty: {products[item].prod_units}
                                            </Text>
                                          </View>
                                          <View
                                            style={{
                                              borderWidth: 0,
                                              width: '100%',
                                            }}>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              Quality: {products[item].product_quality_name}
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                      <View
                                        style={{
                                          height: 40,
                                          backgroundColor: Colors.greenColor,
                                          borderWidth: 0,
                                          width: 40,
                                          marginLeft: -26,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          position: 'absolute',
                                          right: 0,
                                          bottom: 0,
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
                        keyExtractor={item => products[item].product_id}
                        numColumns={1}
                        scrollEnabled={false}
                    />
                    )}
                    {products == undefined && (
                        <View style={{ marginVertical: Sizes.fixPadding }}>
                            <View style={{ ...styles.allSellersData}}>                                
                                <View style={{...styles.sellerCard, backgroundColor: '#edededf8', borderRadius: 2, borderWidth: 0, padding: Sizes.fixPadding}}>
                                    <View style={styles.sellerCardColumn}>
                                        <Text style={styles.sellerLabelColumn}>
                                            No products added yet.
                                        </Text>
                                    </View>     
                                </View> 
                            </View>
                        </View>
                    )}
                </View>
            </>
        )
    }

    function header() {
        const input = createRef();
        return (
            <View style={styles.headerWrapStyle}>                            
                <View style={styles.headerKrushi}>
                    <Image 
                        source={require('../../assets/logo-vertical.png')} 
                        style={{ width: 50, height: 50, }}
                    />                    
                </View>
                <View style={styles.headerKrushi}>
                    <Text style={styles.headerText}>Manage Products</Text>                   
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

export default SellerProductsScreen;
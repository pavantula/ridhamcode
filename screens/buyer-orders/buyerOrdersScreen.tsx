import React, { createRef, useState, useEffect, useRef } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, Pressable, FlatList, Image, Dimensions, StyleSheet, ImageBackground, RefreshControl, Text, TextInput, Alert, Animated, Platform, useWindowDimensions  } from "react-native";
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

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const BuyerOrdersScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigation();
    const [state, setState] = useState({ 
        showSnackBar: false,
        myOrders: [],
    });
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          getMyOrderList();
          setRefreshing(false);
        }, 2000);
    }, []);

    const getMyOrderList = () => {
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
                    const formData = new FormData();
                    formData.append('buyer_id', user_array.buyer_id);   
                
                    const response = await axios.post(
                        'myorderslist', 
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
                            const processedData = Object.values(response.data.result);
                            updateState({ myOrders: processedData }); 
                        }
                    } 
                } catch (e) {
                  setLoading(false); 
                  console.log(e)
                }
            }
        });  
    };
    useEffect(() => { 
        AsyncStorage.getItem('token').then(async (token) => {
            if(!token){
                Alert.alert (
                    "My Orders",
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
                getMyOrderList();
            }
        });        
    },[]);  

    const BuyersOrderList = () => {
        return (
                <View style={{ flex: 1, backgroundColor: Colors.bgGreyColor}}>
                    {myOrders.length != 0 &&
                        <FlatList
                        data={Object.keys(myOrders)}
                        renderItem={({ item, index }) => 
                            <ShimmerPlaceHolder visible={isLoading} key={index}>                  
                                <Pressable onPress={() => navigation.navigate("BuyerOrderDetail", { order_id: myOrders[item].order_id })}>
                                    <View style={styles.mainCardView}> 
                                         <View
                                            style={{
                                              borderWidth: 0,
                                              width: '100%',
                                              borderBottomWidth: 1.5,
                                              borderBottomColor: Colors.borderLightColor,
                                            }}>
                                            <Text
                                                style={{
                                                  color: Colors.blackColor,                         
                                                  ...Fonts.greenColor16Bold,
                                                }}>
                                                Order ID: {myOrders[item].order_id}
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
                                              Order Amount: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              ₹{myOrders[item].total_amount}
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
                                              {Moment(myOrders[item].order_date).format('d MMM YYYY')}
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
                                              Ordered Items:
                                            </Text>
                                            <Text
                                              style={{                                               
                                                ...Fonts.greenColor14Bold,
                                              }}>
                                              {myOrders[item].order_items != null ? myOrders[item].order_items.length : 0}
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
                                              Status:
                                            </Text>
                                            <Text
                                              style={{                                               
                                                ...Fonts.orangeColor14Medium,
                                              }}>
                                              {myOrders[item].order_status_label}
                                            </Text>
                                          </View>
                                        </View>
                                  </Pressable>
                            </ShimmerPlaceHolder>
                        }
                        keyExtractor={item => myOrders[item].order_id}
                        numColumns={1}

                    />
                }
                {myOrders.length == 0 && 
                    <View style={{ flex: 1, backgroundColor: Colors.bgGreyColor}}>
                        <Text style={styles.categoryName}>No Orders.</Text>
                    </View>
                }
            </View>
        );
    };

    const {        
        showSnackBar,
        snackBarMsg,
        myOrders
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
                    {BuyersOrderList()}
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
                    <Text style={styles.headerText}>My Orders</Text>                   
                </View>  
            </View>
        )
    }
}

export default BuyerOrdersScreen;
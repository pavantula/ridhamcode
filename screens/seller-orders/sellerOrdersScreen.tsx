import React, { createRef, useState, useEffect, useRef } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, Pressable, FlatList, Image, Dimensions, StyleSheet, ImageBackground, Text, TextInput, Alert, Animated, Platform,useWindowDimensions  } from "react-native";
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
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation, draweractions } from "@react-navigation/native";

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const SellerOrdersScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigation();
    const [state, setState] = useState({        
        products: dummyProductsCategoryWise,
        showSnackBar: false,
        snackBarMsg: null,
        salesOrders: [],
        cancelledOrders: [],
        returnedOrders: [],
        salesTransactions: [],
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
                        'salesorders', 
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
                            updateState({ salesOrders: processedData }); 
                        }
                    } 


                    const responseCancelledOrder = await axios.post(
                        'cancelorders', 
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `${token}`,
                            }   
                        }   
                    );
                    if(responseCancelledOrder){                         
                        if(!responseCancelledOrder.data.status){
                            setError(responseCancelledOrder.data.message);
                        }else{
                            const processedData = Object.values(responseCancelledOrder.data.result);
                            updateState({ cancelledOrders: processedData }); 
                        }
                    } 

                    const responseReturnedOrder = await axios.post(
                        'returnorders', 
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `${token}`,
                            }   
                        }   
                    );
                    if(responseReturnedOrder){                         
                        if(!responseReturnedOrder.data.status){
                            setError(responseReturnedOrder.data.message);
                        }else{
                            const processedData = Object.values(responseReturnedOrder.data.result);
                            updateState({ returnedOrders: processedData }); 
                        }
                    }

                    const responseSalesTransactions = await axios.post(
                        'sellertransactions', 
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `${token}`,
                            }   
                        }   
                    );
                    if(responseSalesTransactions){                         
                        if(!responseSalesTransactions.data.status){
                            setError(responseSalesTransactions.data.message);
                        }else{
                            const processedData = Object.values(responseSalesTransactions.data.result);
                            updateState({ salesTransactions: processedData }); 
                        }
                    } 
                } catch (e) {
                  setLoading(false); 
                  console.log(e)
                }
            }
        });  
    },[]);  

    const SalesOrderList = () => {
        return (
                <View style={{ flex: 1, backgroundColor: Colors.bgGreyColor}}>
                    {salesOrders.length != 0 &&
                        <FlatList
                        data={Object.keys(salesOrders)}
                        renderItem={({ item, index }) => 
                            <ShimmerPlaceHolder visible={isLoading} key={index}>                  
                                <Pressable onPress={() => navigation.navigate("SellerOrderDetail", { order_id: salesOrders[item].order_id })}>
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
                                                Order ID: {salesOrders[item].order_id}
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
                                              Buyer Name: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              {salesOrders[item].buyer_name}
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
                                              ₹{salesOrders[item].total_amount}
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
                                              {Moment(salesOrders[item].order_date).format('d MMM YYYY')}
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
                                              {salesOrders[item].order_items != null ? salesOrders[item].order_items.length : 0}
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
                                              {salesOrders[item].order_status_label}
                                            </Text>
                                          </View>
                                        </View>
                                  </Pressable>
                            </ShimmerPlaceHolder>
                        }
                        keyExtractor={item => salesOrders[item].order_id}
                        numColumns={1}

                    />
                }
                {salesOrders.length == 0 && 
                    <View style={{ flex: 1, backgroundColor: Colors.bgGreyColor}}>
                        <Text style={styles.categoryName}>No Sales Orders.</Text>
                    </View>
                }
            </View>
        );
    };

    const CancelledOrdersList = () => {
        return (
                <View style={{ flex: 1, backgroundColor: Colors.bgGreyColor}}>
                    {cancelledOrders.length != 0 &&
                        <FlatList
                        data={Object.keys(cancelledOrders)}
                        renderItem={({ item, index }) => 
                            <ShimmerPlaceHolder visible={isLoading} key={index}>                  
                                <Pressable>
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
                                                Order ID: {cancelledOrders[item].order_id}
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
                                              Buyer Name: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              {cancelledOrders[item].buyer_name}
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
                                              ₹{cancelledOrders[item].total_amount}
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
                                              {Moment(cancelledOrders[item].order_date).format('d MMM YYYY')}
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
                                              {cancelledOrders[item].order_items != null ? cancelledOrders[item].order_items.length : 0}
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
                                              {cancelledOrders[item].order_status_label}
                                            </Text>
                                          </View>
                                        </View>
                                  </Pressable>
                            </ShimmerPlaceHolder>
                        }
                        keyExtractor={item => cancelledOrders[item].order_id}
                        numColumns={1}

                    />
                }
                {cancelledOrders.length == 0 && 
                    <View style={{ flex: 1, backgroundColor: Colors.bgGreyColor}}>
                        <Text style={styles.categoryName}>No Cancelled Orders.</Text>
                    </View>
                }
            </View>
        );
    };

    const ReturnedOrdersList = () => {
        return (
                <View style={{ flex: 1, backgroundColor: Colors.bgGreyColor}}>
                    {returnedOrders.length != 0 &&
                        <FlatList
                        data={Object.keys(returnedOrders)}
                        renderItem={({ item, index }) => 
                            <ShimmerPlaceHolder visible={isLoading} key={index}>                  
                                <Pressable>
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
                                                Order ID: {returnedOrders[item].order_id}
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
                                              Buyer Name: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              {returnedOrders[item].buyer_name}
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
                                              ₹{returnedOrders[item].total_amount}
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
                                              {Moment(returnedOrders[item].order_date).format('d MMM YYYY')}
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
                                              {returnedOrders[item].order_items != null ? returnedOrders[item].order_items.length : 0}
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
                                              {returnedOrders[item].order_status_label}
                                            </Text>
                                          </View>
                                        </View>
                                  </Pressable>
                            </ShimmerPlaceHolder>
                        }
                        keyExtractor={item => returnedOrders[item].order_id}
                        numColumns={1}

                    />
                }
                {returnedOrders.length == 0 && 
                    <View style={{ flex: 1, backgroundColor: Colors.bgGreyColor}}>
                        <Text style={styles.categoryName}>No Returned Orders.</Text>
                    </View>
                }
            </View>
        );
    };

    const SalesTransactionList = () => {
        return (
                <View style={{ flex: 1, backgroundColor: Colors.bgGreyColor}}>
                    {salesTransactions.length != 0 &&
                        <FlatList
                        data={Object.keys(salesTransactions)}
                        renderItem={({ item, index }) => 
                            <ShimmerPlaceHolder visible={isLoading} key={index}>                  
                                <Pressable onPress={() => navigation.navigate("SellerOrderDetail", { order_id: salesTransactions[item].order_id })}>
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
                                                Order ID: {salesTransactions[item].order_id}
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
                                              Buyer Name: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              {salesTransactions[item].buyer_name}
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
                                              ₹{salesTransactions[item].paid_amount}
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
                                              Ordered On: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              {Moment(salesTransactions[item].order_date).format('d MMM YYYY')}
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
                                              {salesTransactions[item].order_status_label}
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
                                              Updated On: 
                                            </Text>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              {Moment(salesTransactions[item].updated_on).format('d MMM YYYY')}
                                            </Text>
                                          </View>   
                                        </View>
                                  </Pressable>
                            </ShimmerPlaceHolder>
                        }
                        keyExtractor={item => salesTransactions[item].order_id}
                        numColumns={1}

                    />
                }
                {salesTransactions.length == 0 && 
                    <View style={{ flex: 1, backgroundColor: Colors.bgGreyColor}}>
                        <Text style={styles.categoryName}>No Sales Transations.</Text>
                    </View>
                }
            </View>
        );
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

    // Initial states of slide index and slides
    const [currentIndex, setCurrentIndex] = useState(0),
          [value, setValue] = useState(0);

    const {        
        products,
        showSnackBar,
        snackBarMsg,
        salesOrders,
        cancelledOrders,
        returnedOrders,
        salesTransactions
    } = state;
    
    


    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        { key: 'sales', title: 'Sales Orders' },
        { key: 'cancelled', title: 'Cancelled Orders' },
        { key: 'returned', title: 'Returned Orders' },
        { key: 'salestransaction', title: 'Sales Transactions' },
    ]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGreyColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>  
                {homescreensections()}
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
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={SceneMap({
                            sales: SalesOrderList,
                            cancelled: CancelledOrdersList,
                            returned: ReturnedOrdersList,
                            salestransaction: SalesTransactionList,
                        })}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                        swipeEnabled
                        style={styles.tabViewStyle}
                    />
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
                    <Text style={styles.headerText}>Manage Orders</Text>                   
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

export default SellerOrdersScreen;
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, BackHandler, SafeAreaView, StatusBar, Dimensions } from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { FontAwesome5, Foundation, MaterialIcons, Ionicons, AntDesign, SimpleLineIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from "../screens/home/homeScreen";
import ShopScreen from "../screens/shop/shopScreen";
import AccountScreen from "../screens/account/accountScreen";
import CartScreen from "../screens/cart/cartScreen";
import SellerDashboardScreen from "../screens/seller-dashboard/sellerDashboardScreen";
import SellerProductsScreen from "../screens/seller-products/sellerProductsScreen";
import SellerOrdersScreen from "../screens/seller-orders/sellerOrdersScreen";
import { useFocusEffect } from "@react-navigation/native";
import styles from './bottomStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('window');

const BottomTabBarScreen = ({ navigation }) => {

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        currentIndex: 1,
        backClickCount: 0,
        user_data: null,
        user_role: null,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { currentIndex, backClickCount, user_data, user_role } = state;

    useEffect(() => {  
        AsyncStorage.getItem('user').then((user) => {
            if(user){
                updateState({ user_data: JSON.parse(user) });
            }else{
                navigation.navigate('BottomTabBar');
            }
        });

        AsyncStorage.getItem('role').then((role) => {
            if(role){
                updateState({ user_role: role });
            }
        });
    },[]);  

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            {user_role && user_role == "seller" && (
                <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                    {currentIndex == 1 ?
                        <SellerDashboardScreen navigation={navigation} /> :
                        currentIndex == 2 ?
                            <SellerProductsScreen navigation={navigation} />
                            :
                            currentIndex == 3 ?
                                <SellerOrdersScreen navigation={navigation} />
                                :
                                <AccountScreen navigation={navigation} />
                    }
                    <View style={styles.bottomTabBarStyle}>
                        <View style={{ alignItems: 'center', justifyContent: 'center'  }}>
                            {bottomTabBarItem({
                                index: 1,
                                name: 'Seller Home'
                            })}

                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'  }}>
                            {bottomTabBarItem({
                                index: 2,
                                name: 'Products'
                            })}
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center'  }}>                        
                            {bottomTabBarItem({
                                index: 3,
                                name: 'Orders'
                            })}
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center'  }}>                        
                            {bottomTabBarItem({
                                index: 4,
                                name: 'Settings'
                            })}
                        </View>
                    </View>
                </View>

            )}

            {user_role && user_role != 'seller' && (
                <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                    {currentIndex == 1 ?
                        <HomeScreen navigation={navigation} /> :
                        currentIndex == 2 ?
                            <ShopScreen navigation={navigation} />
                            :
                            currentIndex == 3 ?
                                <AccountScreen navigation={navigation} />
                                :
                                ''
                    }
                    <View style={styles.bottomTabBarStyle}>
                        <View style={{ alignItems: 'center', justifyContent: 'center'  }}>
                            {bottomTabBarItem({
                                index: 1,
                                name: 'Home'
                            })}

                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'  }}>
                            {bottomTabBarItem({
                                index: 2,
                                name: 'Shop'
                            })}
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center'  }}>                        
                            {bottomTabBarItem({
                                index: 3,
                                name: 'Menu'
                            })}
                        </View>
                    </View>
                </View>

            )}


            {!user_role && (
                <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                    {currentIndex == 1 ?
                        <HomeScreen navigation={navigation} /> :
                        currentIndex == 2 ?
                            <ShopScreen navigation={navigation} />
                            :
                            currentIndex == 3 ?
                                <AccountScreen navigation={navigation} />
                                :
                                ''
                    }
                    <View style={styles.bottomTabBarStyle}>
                        <View style={{ alignItems: 'center', justifyContent: 'center'  }}>
                            {bottomTabBarItem({
                                index: 1,
                                name: 'Home'
                            })}

                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'  }}>
                            {bottomTabBarItem({
                                index: 2,
                                name: 'Shop'
                            })}
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center'  }}>                        
                            {bottomTabBarItem({
                                index: 3,
                                name: 'Menu'
                            })}
                        </View>
                    </View>
                </View>
            )}
            
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function bottomTabBarItem({ index, name }) {
        return (
            <View style={{ alignItems: 'center'}}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ currentIndex: index })}
                >   
                    {user_role && user_role == "seller" && (
                        <View style={{...styles.uploadIconWrapStyle }}>
                            {index == 1 && (
                                <MaterialCommunityIcons name="view-dashboard-outline" size={28} color={currentIndex == 1 ? Colors.orangeColor : Colors. blackColor } />
                            )}
                            {index == 2 && (
                                <MaterialCommunityIcons name="format-list-text" size={28} color={currentIndex == 2 ? Colors.orangeColor : Colors. blackColor } />
                            )}
                            {index == 3 && (
                                <MaterialCommunityIcons name="sticker-text-outline" size={28} color={currentIndex == 3 ? Colors.orangeColor : Colors. blackColor } />
                            )}
                            {index == 4 && (
                                <SimpleLineIcons name="settings" size={28} color={currentIndex == 4 ? Colors.orangeColor : Colors. blackColor } />
                            )}
                        </View>
                    )}
                    {user_role && user_role != "seller" && (
                        <View style={{...styles.uploadIconWrapStyle }}>
                            {index == 1 && (
                                <Ionicons name="home-outline" size={28} color={currentIndex == 1 ? Colors.orangeColor : Colors. blackColor } />
                            )}
                            {index == 2 && (
                                <Ionicons name="cube-outline" size={28} color={currentIndex == 2 ? Colors.orangeColor : Colors. blackColor } />
                            )}
                            {index == 3 && (
                                <Feather name="user" size={28} color={currentIndex == 3 ? Colors.orangeColor : Colors. blackColor } />
                            )}
                        </View>
                    )}
                    {!user_role && (
                        <View style={{...styles.uploadIconWrapStyle }}>
                            {index == 1 && (
                                <Ionicons name="home-outline" size={28} color={currentIndex == 1 ? Colors.orangeColor : Colors. blackColor } />
                            )}
                            {index == 2 && (
                                <Ionicons name="cube-outline" size={28} color={currentIndex == 2 ? Colors.orangeColor : Colors. blackColor } />
                            )}
                            {index == 3 && (
                                <Feather name="user" size={28} color={currentIndex == 3 ? Colors.orangeColor : Colors. blackColor } />
                            )}
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        )
    }
}
export default BottomTabBarScreen;
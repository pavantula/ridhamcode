import React, { createRef, useState, useEffect, useRef } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, Pressable, FlatList, Image, Dimensions, StyleSheet, ImageBackground, Text, TextInput, Alert, Animated, Platform } from "react-native";
import { Colors, Fonts, Sizes, ElementsText, window } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { Badge } from 'react-native-paper';
import { IconButton, MD3Colors } from 'react-native-paper';
import styles from './styles';
import { dummyDataForCategories } from '../../data/categories'; 
import { useTranslation } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useSharedValue,
} from "react-native-reanimated";
import axios from "axios";

const ShopScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();

    const [state, setState] = useState({
        categories: dummyDataForCategories,
        showSnackBar: false,
        snackBarMsg: null,
    });

    const [cartBadge, setCartBadge] = useState(0); 

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();  

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const generateCartDetails = () => {
        AsyncStorage.getItem('user').then(async (user) => {
            if(user){
                const user_array = JSON.parse(user);
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
                            setCartBadge(response.data.result ? response.data.result.length : 0);
                        }
                    } 
                } catch (e) { 
                  console.log(e)
                }
            }
        }); 
    };


    useEffect(() => {
        async function fetchCategoryData() {
            try {
                setLoading(true);
                const response = await axios.post(
                    'categorys',
                    {
                        headers: {
                            'Content-Type': "application/json",
                            'Accept': 'application/json, text/plain, */*',
                        }  
                    }   
                );
                if(response){               
                    if(!response.data.status){
                        setError(response.data.message);
                    }else{                                   
                        updateState({ categories: response.data.result });  
                    }
                } 
            } catch (e) {          
                setError(e);    
            }
        }
        fetchCategoryData();    
        generateCartDetails();   
    },[]);  

    const {
        categories,
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
    
    function homescreensections() {        
        return (
            <>  
                {header()}
                <View style={styles.categorySlides}>
                    <FlatList
                        data={categories}
                        renderItem={({ item }) =>
                            <Pressable onPress={() => navigation.navigate("CategoryDetailScreen", { id: item.category_id, name: item.category_name })}>
                                <View styles={styles.productCardData}> 
                                    <Image
                                        source={{ uri: item.cat_image_thumb }}
                                        style={styles.productImageStyle}
                                    />
                                    <View style={styles.textViewBlock}>
                                        <Text style={styles.textView}>{item.category_name}</Text>
                                    </View>                                
                                </View> 
                            </Pressable>                            
                        }
                        keyExtractor={item => item.category_id}
                        scrollEventThrottle={32}
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
                <View style={styles.headerKrushi}>
                    <Text style={styles.headerText}>Products</Text>                   
                </View>  
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
            </View>
        )
    }
}

export default ShopScreen;
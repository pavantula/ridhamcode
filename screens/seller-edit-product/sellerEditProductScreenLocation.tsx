import React, { createRef, useState, useEffect, useRef } from "react";
import { SafeAreaView, View, Button, StatusBar, ScrollView, Pressable, FlatList, Image, Dimensions, StyleSheet, ImageBackground, Text, TextInput, Alert, Animated, Platform, ActivityIndicator } from "react-native";
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
import { Dropdown } from 'react-native-element-dropdown';
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';

import { useNavigation, draweractions } from "@react-navigation/native";

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const SellerEditProductScreenLocation = ({ route, navigation }) => {
    const { t, i18n } = useTranslation();
    const { step_one, product_id } = route.params;
    const navigate = useNavigation();
    const [state, setState] = useState({ 
        showSnackBar: false,snackBarMsg: null,
        user_data: null,user_role: null, 
    });
    const { control, handleSubmit, formState: { errors } } = useForm({});  
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const updateState = (data) => setState((state) => ({ ...state, ...data }))
    useEffect(() => { 
        AsyncStorage.getItem('user').then(async (user) => {
            if(user){
                updateState({ user_data: JSON.parse(user) });
                const user_array = JSON.parse(user);
                const payload = {
                    seller_id: user_array.seller_id,
                    product_id: product_id
                };
                try {                
                    const response = await axios.post(
                        'getsellerproductinfo',
                        payload,
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
                            if(response.data.result.locations.length > 0){
                                let locations = response.data.result.locations;
                                const _inputs = [];                                                            
                                for(let i = 0; i < locations.length; i++){ 
                                    const data = {
                                        name: locations[i].location_name.toString(),
                                        code: locations[i].location_code.toString(),
                                        radius: locations[i].radius.toString(),
                                        quantity: locations[i].quantity.toString(),
                                        location_id: locations[i].location_id.toString()
                                    };                                                               
                                    _inputs.push(data);
                                }
                                setInputs(_inputs);
                            }
                        }
                    } 
                } catch (e) {          
                    setError(e);    
                }
            }
        });

        AsyncStorage.getItem('role').then((role) => {
            if(role){
                updateState({ user_role: role });
            }
        });  
    
    },[]); 

    const [inputs, setInputs] = useState([{name: '', code: '', radius: '', quantity: '', location_id: ''}]);
 
    const addHandler = ()=>{
        const _inputs = [...inputs];
        _inputs.push({name: '', code: '', radius: '', quantity: '', location_id: ''});
        setInputs(_inputs);
    }
      
    const deleteHandler = (key)=>{
        const _inputs = inputs.filter((input,index) => index != key);
        setInputs(_inputs);
    }

    const addNameHandler = (text, key)=>{
        const _inputs = [...inputs];
        _inputs[key].name = text;
        setInputs(_inputs);
    }

    const addCodeHandler = (text, key)=>{
        const _inputs = [...inputs];
        _inputs[key].code = text;
        setInputs(_inputs);
    }

    const addRadiusHandler = (text, key)=>{
        const _inputs = [...inputs];
        _inputs[key].radius = text;
        setInputs(_inputs);
    }
    const addQuantityHandler= (text, key)=>{
        const _inputs = [...inputs];
        _inputs[key].quantity = text;
        setInputs(_inputs);
    }
    
    const signOutSeller = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Loader');
        }
        catch(exception) {
            return false;
        }
    }

    const onSubmit = async (data) => {
        setLoading(true); 
        try {                  
            let array = []; 
            let total = 0;       
            inputs.map((value) => {  
                let q = value.quantity !== "" ? parseInt(value.quantity) : 0;
                total = total + q;       
                array.push(value);       
            });
            const payload = {
                locations: array,
                total_quantity: total,
            };
            //console.log(inputs);
            AsyncStorage.setItem('step_two', JSON.stringify(payload));
            setLoading(false); 
            navigation.push('SellerEditProductPrice', { step_one: step_one, step_two: payload, product_id: product_id, totalQuantity: total});
        } catch (e) {
          setLoading(false); 
          console.log(e)       
        }
    };


    const {  
        showSnackBar,snackBarMsg,
        user_data,user_role,
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
                    <Text style={styles.sectionTitle}>Deliver Location Configuration</Text>
                </View>
                <View style={styles.categorySlides}>
                    {inputs.map((input, key)=> (
                        <View style={styles.inputContainer}>
                            <View style={styles.viewContainer}>
                              <TextInput placeholder={"Name"} value={input.name} onChangeText={(text)=>addNameHandler(text,key)} style={styles.textInputStyle}/>
                              <TextInput placeholder={"Pincode"} value={input.code} onChangeText={(text)=>addCodeHandler(text,key)} style={styles.textInputStyle}/>
                            </View>
                            <View style={styles.viewContainer}>
                              <TextInput placeholder={"Radius"} value={input.radius} onChangeText={(text)=>addRadiusHandler(text,key)} style={styles.textInputStyle}/>
                              <TextInput placeholder={"Quantity"} value={input.quantity} onChangeText={(text)=>addQuantityHandler(text,key)} style={styles.textInputStyle}/>                              
                            </View>
                            <View style={styles.viewContainer}>                              
                              <Pressable onPress = {()=> deleteHandler(key)}>
                                <Text style={styles.textInputStyleButton}>Remove Location</Text>
                              </Pressable>  
                            </View>
                        </View>
                    ))}
                </View>
                
                <Pressable                    
                    style={styles.krushiIDAddLocation}
                    onPress={addHandler}>   
                    <Text style={{ ...Fonts.whiteColor14Medium }}>
                        + Add New Location
                    </Text>
                </Pressable>
                
                <Pressable                    
                    style={styles.krushiIDCheckMain}
                    disabled={isLoading}
                    onPress={handleSubmit(onSubmit)}>   
                    {isLoading && 
                        <ActivityIndicator size="small" color="#ffffff" />
                    }
                    {!isLoading && 
                        <Text style={{ ...Fonts.whiteColor18Medium }}>
                            Next
                        </Text>
                    }                     
                </Pressable>
            </>
        )
    }

    function divider() {
        return (
            <View style={{
                backgroundColor: Colors.borderLightColor,
                height: 2.0,
                margin: Sizes.fixPadding * 2.0,
            }} />
        )
    }

    function header() {
        const input = createRef();
        return (
            <View style={styles.headerWrapStyle}>                            
                <Pressable onPress={() => signOutSeller()}> 
                    <Text style={{ ...Fonts.blackColor16Light,flexShrink: 1, textAlign: 'right', marginTop: Sizes.fixPadding  }}>
                        <Feather name="chevron-left" size={30} color="black" onPress={() => navigation.pop()}/>   
                    </Text> 
                </Pressable>
                <View style={styles.headerKrushi}>
                    <Text style={styles.headerText}>Edit Product</Text>                   
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

export default SellerEditProductScreenLocation;
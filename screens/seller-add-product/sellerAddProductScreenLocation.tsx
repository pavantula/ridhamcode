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

const SellerAddProductScreenLocation = ({ route, navigation }) => {
    
    const { t, i18n } = useTranslation();
    const { step_one } = route.params;
    const navigate = useNavigation();
    const [state, setState] = useState({ 
        showSnackBar: false,snackBarMsg: null,
        user_data: null,user_role: null, 
    });
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          city: '',
          district: '',
          state: '',
          pincode: '',
          product_available_from: '',
          product_model: '',
        }
    });  
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const updateState = (data) => setState((state) => ({ ...state, ...data }))
    useEffect(() => { 
        AsyncStorage.getItem('user').then((user) => {
            if(user){
                updateState({ user_data: JSON.parse(user) });
            }
        });

        AsyncStorage.getItem('role').then((role) => {
            if(role){
                updateState({ user_role: role });
            }
        });  

        AsyncStorage.getItem('step_two').then((step_two) => {
            if(step_two){
                //console.log(step_two);
                //setInputs({ user_role: role });
            }
        });
    
    },[]); 

    const [inputs, setInputs] = useState([{name: '', code: '', radius: '', quantity: ''}]);
 
    const addHandler = ()=>{
        const _inputs = [...inputs];
        _inputs.push({name: '', code: '', radius: '', quantity: ''});
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
            AsyncStorage.setItem('step_two', JSON.stringify(payload));
            setLoading(false); 
            navigation.push('SellerAddProductPrice', { step_one: step_one, step_two: payload, totalQuantity: total });
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
                    {inputs.map((input, key)=>(
                        <View style={styles.inputContainer} key={key}>
                            <View style={styles.viewContainer}>
                              <TextInput placeholder={"Name"} value={input.value} onChangeText={(text)=>addNameHandler(text,key)} style={styles.textInputStyle}/>
                              <TextInput placeholder={"Pincode"} value={input.value} onChangeText={(text)=>addCodeHandler(text,key)} style={styles.textInputStyle}/>
                            </View>
                            <View style={styles.viewContainer}>
                              <TextInput placeholder={"Radius"} value={input.value} onChangeText={(text)=>addRadiusHandler(text,key)} style={styles.textInputStyle}/>
                              <TextInput placeholder={"Quantity"} value={input.value} onChangeText={(text)=>addQuantityHandler(text,key)} style={styles.textInputStyle}/>                              
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
                    <Text style={styles.headerText}>Configure Product</Text>                   
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

export default SellerAddProductScreenLocation;
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
import { RadioButton } from 'react-native-paper'; 

import { useNavigation, draweractions } from "@react-navigation/native";

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const SellerEditProductScreenPrice = ({ route,navigation }) => {
    const { t, i18n } = useTranslation();
    const { step_one, step_two, product_id, totalQuantity} = route.params;
    const [selectedPriceType, setSelectedPriceType] = useState('1');
    const [selectedUnitType, setSelectedUnitType] = useState('Quintals');  
    const navigate = useNavigation();
    const [state, setState] = useState({ 
        showSnackBar: false,snackBarMsg: null,
        user_data: null,user_role: null, 
    });
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
          available_qty: '',
          onsale_price: '',
        }
    });  
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const updateState = (data) => setState((state) => ({ ...state, ...data }))
    useEffect(() => { 
        AsyncStorage.getItem('user').then(async(user) => {
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
                            setSelectedPriceType(response.data.result.price_type.toString());
                            setSelectedUnitType(response.data.result.unit.toString());
                            setValue('available_qty', response.data.result.prod_units.toString());
                            setValue('available_qty', totalQuantity.toString());
                            if(response.data.result.price_type == '1'){                                
                                setValue('onsale_price', response.data.result.onsale_price.toString());
                            }else if(response.data.result.price_type == '2'){
                                if(response.data.result.prices.length > 0){
                                    let prices = response.data.result.prices;
                                    const _inputs = [];                                                            
                                    for(let i = 0; i < prices.length; i++){ 
                                        const data = {
                                            min: prices[i].minimum.toString(),
                                            max: prices[i].maximum.toString(),
                                            price: prices[i].price.toString()
                                        };                                                               
                                        _inputs.push(data);
                                    }
                                    setInputs(_inputs);
                                }
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

    const [inputs, setInputs] = useState([{min: '', max: '', price: ''}]);

    const addHandler = () => {
        const _inputs = [...inputs];
        _inputs.push({min: '', max: '', price: ''});
        setInputs(_inputs);
    }
      
    const deleteHandler = (key)=>{
        const _inputs = inputs.filter((input,index) => index != key);
        setInputs(_inputs);
    }

    const addMinHandler = (text, key)=>{
        const _inputs = [...inputs];
        _inputs[key].min = text;
        setInputs(_inputs);
    }

    const addMaxHandler = (text, key)=>{
        const _inputs = [...inputs];
        _inputs[key].max = text;
        setInputs(_inputs);
    }

    const addPriceHandler = (text, key)=>{
        const _inputs = [...inputs];
        _inputs[key].price = text;
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
            inputs.map((value) => {         
                array.push(value);       
            });
            const payload = {
                price_type: selectedPriceType,
                prod_units: totalQuantity,
                unit: selectedUnitType,
                onsale_price: selectedPriceType == 1 ? data.onsale_price : 0,
                varible_prices: selectedPriceType == 2 ? inputs : [],
            };
            AsyncStorage.setItem('step_three', JSON.stringify(payload));
            setLoading(false);
            navigation.navigate('SellerEditProductImages', { step_one: step_one, step_two: step_two, step_three: payload, product_id: product_id, totalQuantity: totalQuantity }); 
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
                    <Text style={styles.sectionTitle}>Price Configuration</Text>
                </View>
                <View style={styles.categorySlides}>
                    <Text style={styles.fieldLabel}>Price Type</Text>
                    <View style={styles.radioGroup}> 
                        <View style={styles.radioButton}> 
                            <RadioButton 
                                value="1"
                                status={selectedPriceType === '1' ?  
                                        'checked' : 'unchecked'} 
                                onPress={() => setSelectedPriceType('1')} 
                                color={Colors.greenColor}
                            /> 
                            <Text style={styles.radioLabel}> 
                                Fixed 
                            </Text> 
                        </View> 
  
                        <View style={styles.radioButton}> 
                            <RadioButton
                                value="1"
                                status={selectedPriceType === '2' ?  
                                         'checked' : 'unchecked'} 
                                onPress={() => setSelectedPriceType('2')} 
                                color={Colors.greenColor}
                            /> 
                            <Text style={styles.radioLabel}> 
                                Variables 
                            </Text> 
                        </View> 
                    </View> 
                </View>

                <View style={styles.categorySlides}>
                    <Text style={styles.fieldLabel}>Unit Type</Text>
                    <View style={styles.radioGroup}> 
                        <View style={styles.radioButton}> 
                            <RadioButton 
                                value="Quintals"
                                status={selectedUnitType === 'Quintals' ?  
                                        'checked' : 'unchecked'} 
                                onPress={() => setSelectedUnitType('Quintals')} 
                                color={Colors.greenColor}
                            /> 
                            <Text style={styles.radioLabel}> 
                                Quintals 
                            </Text> 
                        </View> 
  
                        <View style={styles.radioButton}> 
                            <RadioButton
                                value="Ltrs"
                                status={selectedUnitType === 'Ltrs' ?  
                                         'checked' : 'unchecked'} 
                                onPress={() => setSelectedUnitType('Ltrs')} 
                                color={Colors.greenColor}
                            /> 
                            <Text style={styles.radioLabel}> 
                                Ltrs 
                            </Text> 
                        </View>

                        <View style={styles.radioButton}> 
                            <RadioButton
                                value="Bags"
                                status={selectedUnitType === 'Bags' ?  
                                         'checked' : 'unchecked'} 
                                onPress={() => setSelectedUnitType('Bags')} 
                                color={Colors.greenColor}
                            /> 
                            <Text style={styles.radioLabel}> 
                                Bags 
                            </Text> 
                        </View>

                        <View style={styles.radioButton}> 
                            <RadioButton
                                value="Bales"
                                status={selectedUnitType === 'Bales' ?  
                                         'checked' : 'unchecked'} 
                                onPress={() => setSelectedUnitType('Bales')} 
                                color={Colors.greenColor}
                            /> 
                            <Text style={styles.radioLabel}> 
                                Bales 
                            </Text> 
                        </View> 
                    </View> 
                </View>
                <View style={styles.categorySlides}>                          
                    <Text style={styles.fieldLabel}>                         
                        Available Qty
                    </Text> 
                    <View style={styles.textInfoWrapStyle}>
                        <Controller
                            control={control}                            
                            render={({ field: { onChange, onBlur, value } }) => (                                  
                                <TextInput
                                    placeholderTextColor={Colors.grayColor}
                                    style={{ flex: 1, ...Fonts.blackColor14Regular }}                                            
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder={'Available Qty'}
                                />   
                            )}
                            name="available_qty"
                        />                                                  
                    </View>                    
                </View>
                {selectedPriceType === '1' && (
                    <View style={styles.categorySlides}>                          
                        <Text style={styles.fieldLabel}>                         
                            Per {selectedUnitType}
                        </Text> 
                        <View style={styles.textInfoWrapStyle}>
                            <Controller
                                control={control}                            
                                render={({ field: { onChange, onBlur, value } }) => (                                  
                                    <TextInput
                                        placeholderTextColor={Colors.grayColor}
                                        style={{ flex: 1, ...Fonts.blackColor14Regular }}                                            
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={'Value (INR)'}
                                    />   
                                )}
                                name="onsale_price"
                            />                                                  
                        </View>                    
                    </View>
                )}
                {selectedPriceType === '2' && (
                    <>
                    <View style={styles.categorySlides}>
                        <Text style={styles.fieldLabel}>                         
                            Variable Price
                        </Text>
                        {inputs.map((input, key)=>(
                            <View style={styles.inputContainer} key={key}>
                                <View style={styles.viewContainer}>
                                  <TextInput placeholder={"Min " + selectedUnitType} value={input.min} onChangeText={(text)=>addMinHandler(text,key)} style={styles.textInputStyle}/>
                                  <TextInput placeholder={"Max " + selectedUnitType} value={input.max} onChangeText={(text)=>addMaxHandler(text,key)} style={styles.textInputStyle}/>
                                </View>
                                <View style={styles.viewContainer}>
                                  <TextInput placeholder={"Value (INR)"} value={input.price} onChangeText={(text)=>addPriceHandler(text,key)} style={styles.textInputStyle}/>
                                  <Pressable onPress = {()=> deleteHandler(key)}>
                                    <Text style={styles.textInputStyleButton}>Remove Price</Text>
                                  </Pressable> 
                                </View>
                            </View>
                        ))}
                    </View>
                    
                    <Pressable                    
                        style={styles.krushiIDAddLocation}
                        onPress={addHandler}>   
                        <Text style={{ ...Fonts.whiteColor14Medium }}>
                            + Add Price
                        </Text>
                    </Pressable>
                    </>
                )}
                
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

export default SellerEditProductScreenPrice;
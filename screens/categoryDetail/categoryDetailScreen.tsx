import React, { createRef, useState, useEffect, useRef } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, Pressable, FlatList, Image, Dimensions, StyleSheet, ImageBackground, Text, TextInput, Alert, Animated, Platform, ActivityIndicator } from "react-native";
import { Colors, Fonts, Sizes, ElementsText, window } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import styles from './styles';
import { dummyProductsCategoryWise } from '../../data/productscategorywise';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetRefProps } from '../../components/BottomSheet';
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';

const CategoryDetailScreen = ({ navigation, route }) => {
    const { t, i18n } = useTranslation();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
          shipping_name: '',
          shipping_no: '',
        }
    }); 

    const [state, setState] = useState({
        products: route.params ? dummyProductsCategoryWise.filter(item => item.category === route.params.id) : dummyProductsCategoryWise,
        showSnackBar: false,
        snackBarMsg: null,
        allCategories: [],selectedCategory: null,
        subproducts: [], selectedProduct: null,
        product_available: [], selectedAvailable: null,
        product_quality: [], selectedQuality: null,
        product_type: [], selectedType: null,
        product_variety: [], selectedVariety: null,
    });
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(); 

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [textAvailableDate, setTextAvailableDate] = useState('Select Expected Deliver Date');

    const ref = useRef<BottomSheetRefProps>(null); 

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const onChang = (event, selectDate) => {
        const currentDate = selectDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setTextAvailableDate(fDate);
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const fetchFilterData = async (data) => {
        updateState({ selectedCategory: data });
        try { 
            const formData = new FormData();
            formData.append('category_id', data);  
            formData.append('product_settings_id', '');             
            const response = await axios.post(
                    'buyerproductfilter',
                    formData,
                    {
                        headers: {
                            'Content-Type': "multipart/form-data",
                        }  
                    }   
            );
            if(response){               
                    if(!response.data.status){
                        setError(response.data.message);
                    }else{                                     
                        updateState({ allCategories: response.data.product_category });  
                        updateState({ subproducts: response.data.product_info });
                        updateState({ product_available: response.data.product_available });
                        updateState({ product_quality: response.data.product_quality });
                        updateState({ product_type: response.data.product_type });
                        updateState({ product_variety: response.data.product_variety });
                    }
                } 
        } catch (e) {          
                setError(e);    
        }
    };  

    const fetchFilterDataByProduct = async (data, product_id) => {
        updateState({ selectedCategory: data });
        updateState({ selectedProduct: product_id });
        try { 
            const formData = new FormData();
            formData.append('category_id', data);
            formData.append('product_settings_id', product_id);               
            const response = await axios.post(
                    'buyerproductfilter',
                    formData,
                    {
                        headers: {
                            'Content-Type': "multipart/form-data",
                            'Accept': '*/*',
                        }  
                    }   
            );
            if(response){               
                    if(!response.data.status){
                        setError(response.data.message);
                    }else{            

                        updateState({ allCategories: response.data.product_category });  
                        updateState({ subproducts: response.data.product_info });
                        updateState({ product_available: response.data.product_available });
                        updateState({ product_quality: response.data.product_quality });
                        updateState({ product_type: response.data.product_type });
                        updateState({ product_variety: response.data.product_variety });
                    }
                } 
        } catch (e) {          
                setError(e);    
        }
    };  

    useEffect(() => {       
        async function fetchCategoryData() {
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append('category_id', route.params.id);
                const response = await axios.post(
                    'productsbycategory-form',
                    formData,
                    {
                        headers: {
                            'Content-Type': "multipart/form-data",
                            'Accept': '*/*',
                        }  
                    }   
                );
                if(response){               
                    if(!response.data.status){
                        setError(response.data.message);
                    }else{       
                        setLoading(false);                            
                        updateState({ products: response.data.result });  
                    }
                } 
            } catch (e) {          
                setError(e);    
            }
        }
        fetchCategoryData();  
        fetchFilterData(route.params.id); 
    },[]);  

    const onPressOpenBottomSheet = () => {
        const isActive = ref?.current?.isActive();
        if (isActive) {
            ref?.current?.scrollTo(0);
        } else {
            ref?.current?.scrollTo(-600);
        } 
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            ref?.current?.scrollTo(-600);  
            const formData = new FormData();
            formData.append('category_id', selectedCategory != null ? selectedCategory : route.params.id);
            formData.append('product_available', selectedAvailable != null ? selectedAvailable : '');
            formData.append('product_name', selectedProduct != null ? selectedProduct : '');
            formData.append('product_type', selectedType != null ? selectedType : '');
            formData.append('product_quality', selectedQuality != null ? selectedQuality : '');
            formData.append('product_variety', selectedVariety != null ? selectedVariety : '');
            const response = await axios.post(
                    'productsbycategory-form',
                    formData,
                    {
                        headers: {
                            'Content-Type': "multipart/form-data",
                            'Accept': '*/*',
                        }  
                    }   
            );
            if(response){               
                if(!response.data.status){
                    setError(response.data.message);
                }else{       
                    setLoading(false);           
                    updateState({ products: response.data.result });  
                }
            } 
        } catch (e) {          
            setError(e);    
        }
    };

    const {
        products,
        showSnackBar,
        snackBarMsg,
        allCategories,selectedCategory,
        subproducts, selectedProduct,
        product_available, selectedAvailable,
        product_quality, selectedQuality,
        product_type, selectedType,
        product_variety, selectedVariety,
    } = state;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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
            {filterModal()}
        </GestureHandlerRootView>
    )

    function filterModal(){
        return (
            <BottomSheet ref={ref}>
                <View style={styles.categorySlides2}>
                    <Text style={styles.sectionTitle}>Filters</Text>
                </View>
                <View style={styles.categorySlides2}>
                    <Text style={styles.fieldLabel}> Products </Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={allCategories}
                        search
                        maxHeight={300}
                        labelField="category_name"
                        valueField="category_id"
                        placeholder="Select Product Category"
                        searchPlaceholder="Search..."
                        value={selectedCategory}
                        onChange={item => {
                          fetchFilterData(item.category_id);
                        }}                        
                        renderItem={item => {
                            return (
                                <View style={styles.itemStyle}>
                                  <Text style={styles.textItem}>{item.category_name}</Text>
                                </View>
                            );
                        }}
                      />
                </View>
                <View style={styles.categorySlides2}>
                    <Text style={styles.fieldLabel}> Sub Products</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={subproducts}
                        search
                        maxHeight={300}
                        labelField="product_name"
                        valueField="product_settings_id"
                        placeholder="Select Sub Product"
                        searchPlaceholder="Search..."
                        value={selectedProduct}
                        onChange={item => {
                          fetchFilterDataByProduct(selectedCategory,item.product_settings_id);
                        }}                        
                        renderItem={item => {
                            return (
                                <View style={styles.itemStyle}>
                                  <Text style={styles.textItem}>{item.product_name}</Text>
                                </View>
                            );
                        }}
                      />
                </View>
                <View style={styles.categorySlides2}>
                    <Text style={styles.fieldLabel}> Variety </Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={product_variety}
                        search
                        maxHeight={300}
                        labelField="product_variety_name"
                        valueField="product_variety_id"
                        placeholder="Select Variety"
                        searchPlaceholder="Search..."
                        value={selectedVariety}
                        onChange={item => {
                          updateState({ selectedVariety: item.product_variety_id});
                        }}                        
                        renderItem={item => {
                            return (
                                <View style={styles.itemStyle}>
                                  <Text style={styles.textItem}>{item.product_variety_name}</Text>
                                </View>
                            );
                        }}
                      />
                </View>
                <View style={styles.categorySlides2}>
                    <Text style={styles.fieldLabel}> Quality</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={product_quality}
                        search
                        maxHeight={300}
                        labelField="product_quality_name"
                        valueField="product_quality_id"
                        placeholder="Select Quality"
                        searchPlaceholder="Search..."
                        value={selectedQuality}
                        onChange={item => {
                          updateState({ selectedQuality: item.product_quality_id});
                        }}                        
                        renderItem={item => {
                            return (
                                <View style={styles.itemStyle}>
                                  <Text style={styles.textItem}>{item.product_quality_name}</Text>
                                </View>
                            );
                        }}
                      />
                </View>
                <View style={styles.categorySlides2}>
                    <Text style={styles.fieldLabel}> Available In</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={product_available}
                        search
                        maxHeight={300}
                        labelField="product_available_name"
                        valueField="product_available_id"
                        placeholder="Select Available"
                        searchPlaceholder="Search..."
                        value={selectedAvailable}
                        onChange={item => {
                          updateState({ selectedAvailable: item.product_available_id});
                        }}                        
                        renderItem={item => {
                            return (
                                <View style={styles.itemStyle}>
                                  <Text style={styles.textItem}>{item.product_available_name}</Text>
                                </View>
                            );
                        }}
                      />
                </View>
                <View style={styles.categorySlides2}>
                    <Text style={styles.fieldLabel}> Product Type </Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={product_type}
                        search
                        maxHeight={300}
                        labelField="product_type_name"
                        valueField="product_type_id"
                        placeholder="Select Type"
                        searchPlaceholder="Search..."
                        value={selectedType}
                        onChange={item => {
                          updateState({ selectedType: item.product_type_id });
                        }}                        
                        renderItem={item => {
                            return (
                                <View style={styles.itemStyle}>
                                  <Text style={styles.textItem}>{item.product_type_name}</Text>
                                </View>
                            );
                        }}
                      />
                </View>
                <Pressable                    
                    style={styles.krushiIDCheckMain}
                    disabled={isLoading}
                    onPress={handleSubmit(onSubmit)}>   
                    {isLoading && 
                        <ActivityIndicator size="small" color="#ffffff" />
                    }
                    {!isLoading && 
                        <Text style={{ ...Fonts.whiteColor18Medium }}>
                            Filter Data
                        </Text>
                    } 
                </Pressable>
            </BottomSheet>

        );
    }

    
    function homescreensections() {        
        return (
            <>  
                {header()}
                <View style={styles.categorySlides}>
                    <View style={styles.titleSlide}>                         
                        <Text style={styles.titleText}>
                            {route.params ? route.params.name : 'Category'}
                        </Text> 
                    </View>
                    {products && products.length > 0 && (
                        <FlatList
                            data={products}
                            renderItem={({ item }) =>
                                <Pressable onPress={() => navigation.navigate("ProductDetailScreen", { id: item.product_id })}>
                                    <View styles={styles.productCardData}> 
                                        <Image
                                            source={{ uri: item.image_thumb }}
                                            style={styles.productImageStyle}
                                        />
                                        <View style={styles.textViewBlock}>
                                            <Text style={styles.textView}>{item.product_name}</Text>
                                        </View>                                
                                    </View>    
                                </Pressable>                         
                            }
                            keyExtractor={item => item.product_id}
                            scrollEventThrottle={32}
                            numColumns={2}
                        />
                    )}
                    {products && products.length <= 0 && (
                        <Text style={styles.notavailable}>{error}</Text>
                    )}
                </View>  
            </>
        )
    }

    function header() {
        const input = createRef();
        return (
            <View style={styles.headerWrapStyle}>
                <Pressable onPress={() => navigation.pop()}> 
                    <View style={styles.headerKrushi}>
                        <Feather name="chevron-left" size={30} color="black" style={styles.backArrowStyle} />                       
                    </View> 
                </Pressable>
                <View style={styles.headerKrushi}>
                    <Text style={styles.headerText}>Category Detail</Text>                   
                </View>  
                <Pressable onPress={() => onPressOpenBottomSheet()}> 
                    <Text style={{ ...Fonts.blackColor16Light, marginLeft: Sizes.fixPadding,flexShrink: 1, textAlign: 'right', marginTop: Sizes.fixPadding  }}>
                        <Ionicons name="filter-sharp" size={24} color={Colors.greenColor} />
                    </Text> 
                </Pressable> 
            </View>
        )
    }
}

export default CategoryDetailScreen;
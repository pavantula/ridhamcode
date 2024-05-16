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
import { dummyProductsCategoryWise } from '../../data/productscategorywise'; 
import { dummyDataForProducts } from '../../data/products';
import { dummyFeatured } from '../../data/featured';

import { dummyBanners } from '../../data/banners';
import Carousel from 'react-native-reanimated-carousel';
//import Carousel from 'react-native-snap-carousel';
import { useTranslation } from 'react-i18next';
import moment from "moment";
// Components
import Slider from "../../components/Slider/Slider";
import ScrollButton from "../../components/ScrollButton/ScrollButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaginationItem } from "../../components/paginationItem";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'expo-linear-gradient';
import axios from "axios";

import { useNavigation, draweractions } from "@react-navigation/native";
import {
  useSharedValue,
} from "react-native-reanimated";
// StyleSheets
import globalStyles from "../../components/styles/globalStyles";
import sliderStyles from "../../components/styles/SliderStyles";

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

const PAGE_WIDTH = window.width;
const colors = [
  "#26292E",
  "#899F9C",
  "#B3C680",
];
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const HomeScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigation();
    const [state, setState] = useState({
        homeCard: dummyDataForAffairs,
        categories: dummyDataForCategories,
        products: dummyProductsCategoryWise,
        featured: dummyFeatured,
        banners: dummyBanners,
        showSnackBar: false,
        snackBarMsg: null,
    });

    const { container } = globalStyles,
        { flexView } = sliderStyles;

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();   

    const [cartBadge, setCartBadge] = useState(0); 

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const fetchFeaturedProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.post(
                    'featuredproducts',
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
                        updateState({ featured: response.data.result });  
                    }
                } 
            } catch (e) {          
                setError(e);    
            }
    }

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

        async function fetchProductData() {
            try {
                setLoading(true);
                const response = await axios.post(
                    'products',
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
                        updateState({ products: response.data.result });  
                    }
                } 
            } catch (e) {          
                setError(e);    
            }
        }
        fetchCategoryData();   
        fetchProductData();    
        fetchFeaturedProducts();    
        generateCartDetails();
    },[]);  

    // Initial states of slide index and slides
    const [currentIndex, setCurrentIndex] = useState(0),
          [value, setValue] = useState(0);

    const [isVertical, setIsVertical] = React.useState(false);
    const [autoPlay, setAutoPlay] = React.useState(true);
    const [pagingEnabled, setPagingEnabled] = React.useState<boolean>(true);
    const [snapEnabled, setSnapEnabled] = React.useState<boolean>(true);
    const progressValue = useSharedValue<number>(0);
    const baseOptions = isVertical
        ? ({
          vertical: true,
          width: PAGE_WIDTH * 0.86,
          height: PAGE_WIDTH * 0.6,
        } as const)
        : ({
          vertical: false,
          width: PAGE_WIDTH - 30,
          ...Platform.select({
              ios: {
                height: PAGE_WIDTH * 0.7,
              },
              android: {
                height: PAGE_WIDTH * 0.54,
              },
            }),
          
        } as const);  

    const {
        homeCard,
        categories,
        products,
        featured,
        banners,
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
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 5.0, }}
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
        const _renderItem =  ({item, index}, parallaxProps) => {
            return (
                <View style={styles.imageContainer}>                    
                    <Image
                        source={item.productImage}
                        style={{ height: 200, width: screenWidth}}
                        resizeMode="cover"
                     />
                </View>
            );
        }

        const _renderItemBanners =  ({item, index}, parallaxProps) => {
            return (
                <View style={styles.imageContainer}>                    
                    <Image
                        source={item.bannerImage}
                        style={{ height: 220, width: screenWidth}}
                        resizeMode="cover"
                     />
                </View>
            );
        }
        //console.log(categories);
        return (
            <>
                {header()}
                <View style={styles.categorySlides}>
                    <FlatList
                        data={categories}
                        renderItem={({ item, index }) =>
                            <ShimmerPlaceHolder visible={isLoading} key={item.category_id}>
                                <Pressable onPress={() => navigation.navigate("CategoryDetailScreen", { id: item.category_id, name: item.category_name })}>
                                    <View styles={styles.categoryCard}> 
                                            <Image
                                                source={{ uri: item.cat_image_thumb }}
                                                style={styles.categoryImage}
                                                resizeMode="cover"
                                             />
                                            <Text style={styles.categoryName}>{item.category_name}</Text>
                                    </View>
                                </Pressable>
                            </ShimmerPlaceHolder>   
                        }
                        keyExtractor={item => item.category_id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={styles.categorySlides}>
                    <Carousel
                        {...baseOptions}
                        style={{
                           width: PAGE_WIDTH - 20.0,
                        }}
                        loop
                        pagingEnabled={pagingEnabled}
                        snapEnabled={snapEnabled}
                        autoPlay={autoPlay}
                        autoPlayInterval={1500}
                        onProgressChange={(_, absoluteProgress) =>
                          (progressValue.value = absoluteProgress)
                        }
                        mode="parallax"
                        modeConfig={{
                          parallaxScrollingScale: 1.0,
                          parallaxScrollingOffset: 0,
                        }}
                        data={homeCard}
                        renderItem={_renderItem}
                      />
                      {!!progressValue && (
                        <View
                          style={
                            isVertical
                              ? {
                                flexDirection: "column",
                                justifyContent: "space-between",
                                width: PAGE_WIDTH,
                                alignSelf: "center",
                                position: "absolute",
                                right: 5,
                                top: 40,
                              }
                              : {
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: screenWidth - 350,
                                alignSelf: "center",
                                position: "absolute",
                                right: '55%',
                                top: '86%',
                              }
                          }
                        >
                          {homeCard.map((backgroundColor, index) => {
                            return (
                              <PaginationItem
                                backgroundColor={backgroundColor}
                                animValue={progressValue}
                                index={index}
                                key={index}
                                isRotate={isVertical}
                                length={homeCard.length}
                              />
                            );
                          })}
                        </View>
                      )}  
                </View>
                <View style={styles.categorySlides}>
                    <FlatList
                        data={categories}
                        renderItem={({item, index}) => 
                                <ShimmerPlaceHolder visible={isLoading} key={index}>
                                    <Pressable onPress={() => navigation.navigate("CategoryDetailScreen", { id: item.category_id, name: item.category_name })}>
                                        <View style={styles.categoryCardColumns}>
                                           <View styles={styles.categoryCardColumns2}> 
                                                <Image
                                                    source={{ uri: item.cat_image_thumb }}
                                                    style={styles.categoryIconStyle}
                                                    resizeMode="cover"
                                                 />
                                                <Text style={styles.categoryNameColumn}>{item.category_name}</Text>
                                            </View> 
                                        </View> 
                                    </Pressable>
                                </ShimmerPlaceHolder>
                        }
                        keyExtractor={({item, index}) => index}
                        numColumns={2}
                    />
                </View>
                <View style={styles.categorySlides}>
                    <View style={styles.titleSlide}>                         
                        <Text style={styles.titleText}>
                            {t('HomeScreen.featuredProductsText')}
                        </Text>                         
                    </View>
                    <FlatList
                        data={featured}
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
                        horizontal
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                
                {/*<View style={[styles.categorySlides, styles.bannersSlides]}>
                    <Carousel
                        {...baseOptions}                       
                        loop
                        pagingEnabled={pagingEnabled}
                        snapEnabled={snapEnabled}
                        autoPlay={false}
                        autoPlayInterval={1500}
                        onProgressChange={(_, absoluteProgress) =>
                          (progressValue.value = absoluteProgress)
                        }
                        mode="parallax"
                        modeConfig={{
                          parallaxScrollingScale: 1.0,
                          parallaxScrollingOffset: 0,
                        }}
                        data={banners}
                        renderItem={_renderItemBanners}
                      />
                      {!!progressValue && (
                        <View
                          style={
                            isVertical
                              ? {
                                flexDirection: "column",
                                justifyContent: "space-between",
                                width: PAGE_WIDTH,
                                alignSelf: "center",
                                position: "absolute",
                                right: 5,
                                top: 40,
                              }
                              : {
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: screenWidth - 350,
                                alignSelf: "center",
                                position: "absolute",
                                right: '50%',
                                top: '90%',
                              }
                          }
                        >
                          {banners.map((backgroundColor, index) => {
                            return (
                              <PaginationItem
                                backgroundColor={backgroundColor}
                                animValue={progressValue}
                                index={index}
                                key={index}
                                isRotate={isVertical}
                                length={banners.length}
                              />
                            );
                          })}
                        </View>
                      )}  
                </View>*/}
                {/*<View style={styles.categorySlides}>
                    <View style={styles.titleSlide}>                         
                        <Text style={styles.titleText}>
                            {t('HomeScreen.topProductsText')}
                        </Text> 
                    </View>
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
                        horizontal
                        keyExtractor={(item) => item.product_id} 
                        showsHorizontalScrollIndicator={false}                       
                    />
                </View>
                */}
                <View style={[styles.categorySlides, styles.analyticsStyle]}>
                    <View style={styles.analyticCard}>
                        <Image
                            source={require('../../assets/images/icons/guarantee.png')}
                            style={styles.analyticIcon}
                        />
                        <Text style={styles.analyticNumber}>{t('HomeScreen.customerSatisfactionNumber')}</Text>
                        <Text style={styles.analyticText}>{t('HomeScreen.customerSatisfactionText')}</Text>
                    </View>
                    <View style={styles.analyticCard}>
                        <Image
                            source={require('../../assets/images/icons/farmer.png')}
                            style={styles.analyticIcon}
                        />
                        <Text style={styles.analyticNumber}>{t('HomeScreen.expNumber')}</Text>
                        <Text style={styles.analyticText}>{t('HomeScreen.expText')}</Text>
                    </View>
                </View>
                <View style={styles.categorySlides}>
                    <View style={[styles.analyticCard, styles.analyticLargeCard]}>
                        <Image
                            source={require('../../assets/images/icons/warranty.png')}
                            style={styles.analyticIcon}
                        />
                        <Text style={styles.analyticNumber}>{t('HomeScreen.warrantyNumber')}</Text>
                        <Text style={styles.analyticText}>{t('HomeScreen.warrantyText')}</Text>
                    </View>                    
                </View>
            </>
        )
    }

    function header() {
        const input = createRef();
        return (
            <View style={styles.headerWrapStyle}>
              {/*  <Pressable onPress={() => navigation.openDrawer()}>
                    <Text style={{ ...Fonts.blackColor16Light,marginRight: Sizes.fixPadding ,flexShrink: 1, textAlign: 'left', marginTop: Sizes.fixPadding  }}>
                        <Ionicons name="menu-outline" size={28} color={Colors.greenColor} />
                    </Text> 
                </Pressable>  */}              
                <View style={styles.headerKrushi}>
                    <Image 
                        source={require('../../assets/logo-krushi-horizontal.png')} 
                        style={{ width: '62%', height: 50, }}
                    />                    
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
                        {/*<AntDesign name="shoppingcart" size={24} color={Colors.greenColor} />
                         <Badge
                          visible={true}
                          style={[styles.badge, { backgroundColor: Colors.orangeColor }]}
                        >
                          0
                        </Badge>*/}
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

export default HomeScreen;
import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import * as Font from 'expo';
import axios from "axios";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import LoadingScreen from "./components/loadingScreen";
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import splashScreen from "./screens/splashScreen";
import onboardingScreen from "./screens/onboarding/onboardingScreen";

/* Seller Screens */
import sellerLoginScreen from "./screens/seller-login/sellerLoginScreen";
import signupScreen from "./screens/signup/signupScreen";
import sellerSignupScreen from "./screens/seller-signup/sellerSignupScreen";
import sellerAddProductScreen from "./screens/seller-add-product/sellerAddProductScreen";
import sellerAddProductScreenLocation from "./screens/seller-add-product/sellerAddProductScreenLocation";
import sellerAddProductScreenPrice from "./screens/seller-add-product/sellerAddProductScreenPrice";
import sellerAddProductScreenImages from "./screens/seller-add-product/sellerAddProductScreenImages";
import sellerProfileUpdateScreen from "./screens/seller-profile-update/sellerProfileUpdateScreen";
import sellerEditProductScreen from "./screens/seller-edit-product/sellerEditProductScreen";
import sellerEditProductScreenLocation from "./screens/seller-edit-product/sellerEditProductScreenLocation";
import sellerEditProductScreenPrice from "./screens/seller-edit-product/sellerEditProductScreenPrice";
import sellerEditProductScreenImages from "./screens/seller-edit-product/sellerEditProductScreenImages";
import sellerOrderDetailScreen from "./screens/seller-order-detail/sellerOrderDetailScreen";

import shopScreen from "./screens/shop/shopScreen";
import cartScreen from "./screens/cart/cartScreen";
import searchScreen from "./screens/search/searchScreen";
import categoryDetailScreen from "./screens/categoryDetail/categoryDetailScreen";
import productDetailScreen from "./screens/productDetail/productDetailScreen";

/* Buyer Screens */
import buyerSignupScreen from "./screens/buyer-signup/buyerSignupScreen";
import buyerLoginScreen from "./screens/buyer-login/buyerLoginScreen";
import buyerAddressesScreen from "./screens/buyer-addresses/buyerAddressesScreen";
import buyerOrdersScreen from "./screens/buyer-orders/buyerOrdersScreen";
import buyerPurchasedOrdersScreen from "./screens/buyer-purchased-orders/buyerPurchasedOrdersScreen";
import buyerOrderDetailScreen from "./screens/buyer-order-detail/buyerOrderDetailScreen";
import buyerAddAddressScreen from "./screens/buyer-add-address/buyerAddAddressScreen";
import buyerEditAddressScreen from "./screens/buyer-edit-address/buyerEditAddressScreen";
import buyerCheckoutScreen from "./screens/checkout/buyerCheckoutScreen";
import successScreen from "./screens/success/successScreen";

/* General Screens */
import aboutUsScreen from "./screens/aboutUs/aboutUsScreen";
import contactUsScreen from "./screens/contactUs/contactUsScreen";
import privacyScreen from "./screens/privacy/privacyScreen";
import termsScreen from "./screens/terms/termsScreen";

import loaderScreen from "./screens/loading/loaderScreen";

import './assets/language/i18n';
import AppStack from "./components/appStack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootSiblingParent } from 'react-native-root-siblings';
import { store } from './store/store';
import { Provider } from 'react-redux'

axios.defaults.baseURL = "https://krushi.synverse.com/api/";
// axios.interceptors.request.use( async (config) => {
//   let token = await AsyncStorage.getItem('token');
//   if(token != null) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

LogBox.ignoreAllLogs();

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    // <Provider store={store}>
        <RootSiblingParent>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            >      
              <Stack.Screen name="Loading" component={LoadingScreen} />                
              <Stack.Screen name="BottomTabBar" component={bottomTabBarScreen} />        
              <Stack.Screen name="Splash" component={splashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
              <Stack.Screen name="Onboarding" component={onboardingScreen} />
              <Stack.Screen name="ShopScreen" component={shopScreen} />
              <Stack.Screen name="CartScreen" component={cartScreen} />
              
              <Stack.Screen name="SellerLoginScreen" component={sellerLoginScreen} />  
              <Stack.Screen name="SignupScreen" component={signupScreen} />   
              <Stack.Screen name="SellerSignupScreen" component={sellerSignupScreen} />  
              <Stack.Screen name="SearchScreen" component={searchScreen} />
              <Stack.Screen name="CategoryDetailScreen" component={categoryDetailScreen} />
              <Stack.Screen name="SellerAddProduct" component={sellerAddProductScreen} />
              <Stack.Screen name="SellerAddProductLocation" component={sellerAddProductScreenLocation} />
              <Stack.Screen name="SellerAddProductPrice" component={sellerAddProductScreenPrice} />
              <Stack.Screen name="SellerAddProductImages" component={sellerAddProductScreenImages} />
              <Stack.Screen name="SellerEditProduct" component={sellerEditProductScreen} />
              <Stack.Screen name="SellerEditProductLocation" component={sellerEditProductScreenLocation} />
              <Stack.Screen name="SellerEditProductPrice" component={sellerEditProductScreenPrice} />
              <Stack.Screen name="SellerEditProductImages" component={sellerEditProductScreenImages} />
              <Stack.Screen name="SellerOrderDetail" component={sellerOrderDetailScreen} />
              <Stack.Screen name="SellerProfileUpdate" component={sellerProfileUpdateScreen} />
              <Stack.Screen name="ProductDetailScreen" component={productDetailScreen} />

              <Stack.Screen name="BuyerLoginScreen" component={buyerLoginScreen} />  
              <Stack.Screen name="BuyerSignupScreen" component={buyerSignupScreen} /> 
              <Stack.Screen name="BuyerAddresses" component={buyerAddressesScreen} />  
              <Stack.Screen name="BuyerOrders" component={buyerOrdersScreen} />
              <Stack.Screen name="BuyerPurchasedOrders" component={buyerPurchasedOrdersScreen} />
              <Stack.Screen name="BuyerOrderDetail" component={buyerOrderDetailScreen} />
              <Stack.Screen name="BuyerAddAddress" component={buyerAddAddressScreen} />
              <Stack.Screen name="BuyerEditAddress" component={buyerEditAddressScreen} />
              <Stack.Screen name="BuyerCheckout" component={buyerCheckoutScreen} />
              <Stack.Screen name="OrderSuccess" component={successScreen} />
              

              <Stack.Screen name="AboutUsScreen" component={aboutUsScreen} />
              <Stack.Screen name="ContactUsScreen" component={contactUsScreen} />
              <Stack.Screen name="PrivacyScreen" component={privacyScreen} />
              <Stack.Screen name="TermsScreen" component={termsScreen} />
              <Stack.Screen name="Loader" component={loaderScreen} />  
            </Stack.Navigator>
          </NavigationContainer>
        </RootSiblingParent> 
    // </Provider> 
  );
}

export default App;
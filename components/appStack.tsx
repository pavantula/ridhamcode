import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/home/homeScreen";
import CustomDrawer from "./customDrawer";
import bottomTabBarScreen from "./bottomTabBarScreen";
import onboardingScreen from "../screens/onboarding/onboardingScreen";
import signupScreen from "../screens/signup/signupScreen";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} >
      <Drawer.Screen
        name="Home"
        component={bottomTabBarScreen}
        options={{
           title: 'Home',
           drawerIcon: ({focused, size}) => (
              <Ionicons
                 name="md-home"
                 size={20}
                 color={Colors.greenColor}
              />
           ),
           headerShown: false
        }}
      />

      <Drawer.Screen
        name="About Us"
        component={bottomTabBarScreen}
        options={{
           title: 'About Us',
           drawerIcon: ({focused, size}) => (
              <FontAwesome5
                 name="user-tag"
                 size={20}
                 color={Colors.greenColor}
              />
           ),
           headerShown: false
        }}
      />

      <Drawer.Screen
        name="Contact"
        component={bottomTabBarScreen}
        options={{
           title: 'Contact',
           drawerIcon: ({focused, size}) => (
              <MaterialIcons
                 name="contact-page"
                 size={24}
                 color={Colors.greenColor}
              />
           ),
           headerShown: false
        }}
      />

      <Drawer.Screen
        name="FAQs"
        component={bottomTabBarScreen}
        options={{
           title: 'FAQs',
           drawerIcon: ({focused, size}) => (
              <AntDesign
                 name="questioncircle"
                 size={20}
                 color={Colors.greenColor}
              />
           ),
           headerShown: false
        }}
      />

      <Drawer.Screen
        name="Privacy Policy"
        component={bottomTabBarScreen}
        options={{
           title: 'Privacy Policy',
           drawerIcon: ({focused, size}) => (
              <MaterialIcons
                 name="privacy-tip"
                 size={24}
                 color={Colors.greenColor}
              />
           ),
           headerShown: false
        }}
      />

      <Drawer.Screen
        name="Terms & Conditions"
        component={bottomTabBarScreen}
        options={{
           title: 'Terms & Conditions',
           drawerIcon: ({focused, size}) => (
              <FontAwesome
                 name="file-text"
                 size={20}
                 color={Colors.greenColor}
              />
           ),
           headerShown: false
        }}
      />

      <Drawer.Screen
        name="Login"
        component={onboardingScreen}
        options={{
           title: 'Login',
           drawerIcon: ({focused, size}) => (
              <AntDesign
                 name="login"
                 size={20}
                 color={Colors.greenColor}
              />
           ),
           headerShown: false
        }}
      />


      {/*<Drawer.Screen
        name="Rate Us"
        component={onboardingScreen}
        options={{
           title: 'Rate Us',
           drawerIcon: ({focused, size}) => (
              <MaterialIcons
                 name="rate-review"
                 size={20}
                 color={Colors.greenColor}
              />
           ),
           headerShown: false
        }}
      />*/}
      
    </Drawer.Navigator>
  );
};

export default AppStack;
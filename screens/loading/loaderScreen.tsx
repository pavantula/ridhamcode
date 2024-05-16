import React, { useState, useEffect, useRef } from "react";
import type { PropsWithChildren } from 'react';
import { SafeAreaView, View, Image, Dimensions, StatusBar, FlatList, StyleSheet, Text, ImageBackground,TouchableOpacity, Pressable, Alert, TextInput, RefreshControl, ScrollView, ActivityIndicator} from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, Feather, AntDesign, EvilIcons, Ionicons} from '@expo/vector-icons';
import styles from './styles';

import AsyncStorage from "@react-native-async-storage/async-storage";

import { GestureHandlerRootView } from 'react-native-gesture-handler';

const LoaderScreen = ({ navigation, route }) => {

    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {       
        setInterval(() => {
            setLoading(false);
            navigation.navigate('BottomTabBar');
        }, 2000);     
    },[]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                {isLoading && 
                    <View style={styles.loading}>
                        <ActivityIndicator size='large' color={Colors.greenColor}/>
                        <Text style={{ ...Fonts.greenColor18Bold }}>Logging Out... Please Wait...</Text>
                    </View>
                }
            </SafeAreaView>        
        </GestureHandlerRootView>
    )

}
export default LoaderScreen;
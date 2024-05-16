import React, { useState, useEffect} from "react";
import { SafeAreaView, View, Image, ScrollView, StatusBar, TextInput, Pressable, StyleSheet, Text, FlatList, Dimensions} from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import styles from './styles';
import { dummyDataForCategories } from '../../data/categories';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window')

const AllCategoriesScreen = ({ navigation }) => {  
    const { t, i18n } = useTranslation();

    const [state, setState] = useState({
        categoriesData: dummyDataForCategories,
        showSnackBar: false,
        snackBarMsg: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    useEffect(() => { 
        async function getAllCategoryList() {
            const data = await getCategoryList();
            updateState({ categoriesData: data });
        }
        getAllCategoryList();        
    },[]);

    const {
        categoriesData,
        showSnackBar,
        snackBarMsg,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>            
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>                
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, }}
                    >
                        {header()}
                        {categoriesAll()}
                    </ScrollView>                    
                </View>
        </SafeAreaView>
    )

    function categoriesAll() {
       const renderItem = ({ item }) => (
            <Pressable
                style={styles.categoriesWrapStyle}
            >
                <View
                    style={{ height: 270.0 }}
                    borderRadius={Sizes.fixPadding + 3.0}
                >
                    <Image
                        source={{ uri: item.image ? urlFor(item.image).width(676).url()!! : "http://placeimg.com/640/360/any"}}
                        style={{ height: 150, width: '100%',borderTopLeftRadius: Sizes.fixPadding + 5.0 , borderTopRightRadius: Sizes.fixPadding + 5.0 }}
                        resizeMode="cover"
                     />  
                    <View style={styles.categoryInfoOuterWrapStyle}>
                        <View style={styles.productInfoWrapStyle}>
                            <Text style={{ ...Fonts.blackColor18Medium, textAlign: 'center' }}>
                                {item.name}
                            </Text>                            
                            <View style={styles.productDetailWrapStyle}>                                 
                                <View style={styles.arrowIcon}>
                                    <Text style={{ ...Fonts.blackColor14Medium, paddingRight: 2.0 }}>
                                        Se rabatter
                                    </Text>
                                    <Ionicons name="md-arrow-forward-sharp" size={24} color="#000" />                                    
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        )
        return (
            <View style={{ marginVertical: Sizes.fixPadding }}> 
                <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18Medium, stroke:"black", strokeWidth:"1" }}>
                    {t('CategoriesScreen.title')}
                </Text>                   
                <FlatList
                    listKey="categories"
                    data={categoriesData}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={1}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>  
                <View style={styles.headerKrushi}>
                    <Feather name="arrow-left-circle" size={40} color="black" style={styles.backArrowStyle} onPress={() => navigation.pop()}/>                    
                </View> 
            </View>
        )
    }

}

export default AllCategoriesScreen;
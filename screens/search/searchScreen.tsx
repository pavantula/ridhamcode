import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Image, ScrollView, StatusBar, TextInput, Pressable, StyleSheet, Text, Alert, FlatList} from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useTranslation } from 'react-i18next';
// import { SearchBar } from '@rneui/themed';
import List from "../../components/List/List";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'expo-linear-gradient';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const SearchScreen = ({ navigation }) => {    
    const { t, i18n } = useTranslation();
    const [state, setState] = useState({        
        products: [],
        showSnackBar: false,
        snackBarMsg: null,
        filtered: [],
    });
    const [isChecked, setChecked] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [fakeData, setFakeData] = useState();
    const [error, setError] = useState();
    const [search, setSearch] = useState("");
    const [isLoading, setLoading] = useState(false);
    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const updateSearch = (search) => {
      setSearch(search);
    };

    const getSearchedData = async(data) => {
        setSearchPhrase(data)
        try {  
            const formData = new FormData();
            formData.append('search_key', data ? data : '');        
            const response = await axios.post(
                'globalsearch', 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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
            setLoading(false); 
        }
    };

    useEffect(() => {
        getSearchedData();
    }, []);

    const {        
        products,
        showSnackBar,
        snackBarMsg,
        filtered
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>            
                <StatusBar translucent={false} backgroundColor={Colors.bgGreyColor} />
                <View style={{ flex: 1 }}>                
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, }}
                    >
                        {header()}
                        {settingsPage()}
                    </ScrollView>                    
                </View>
        </SafeAreaView>
    )
    
    
    function settingsPage() {
        return (
            <View style={styles.KrushiIDProfileData}>    
               
               {clicked && products && products.length != 0 && (
                    <>
                    <Text style={styles.title}>Available Products for {searchPhrase}</Text>
                    {products && products.length > 0 && products.map((product, index) => {
                                return (
                                <Pressable onPress={() => navigation.navigate("ProductDetailScreen", { id: product.product_id })} key={index}>
                                    <View style={styles.mainCardView}>
                                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={styles.subCardView}>
                                          <Image
                                            source={{ uri: product.image_thumb}}
                                            resizeMode="cover"
                                            style={styles.productImage}
                                          />
                                        </View>
                                        <View style={{marginLeft: 12,flexShrink: 1}}>
                                          <Text
                                            style={{
                                              color: Colors.blackColor,                         
                                              ...Fonts.blackColor14Bold,
                                            }}>
                                            {product.product_name}
                                          </Text>
                                          <View
                                            style={{
                                              borderWidth: 0,
                                              width: '100%',
                                            }}>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              Type: {product.product_type_name}
                                            </Text>
                                          </View>
                                          <View
                                            style={{
                                              borderWidth: 0,
                                              width: '100%',
                                            }}>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              Variety: {product.product_variety_name}
                                            </Text>
                                          </View>
                                          <View
                                            style={{
                                              borderWidth: 0,
                                              width: '100%',
                                            }}>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              Available In: {product.product_available_name}
                                            </Text>
                                          </View>
                                          <View
                                            style={{
                                              borderWidth: 0,
                                              width: '100%',
                                            }}>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              Available Qty: {product.prod_units}
                                            </Text>
                                          </View>
                                          <View
                                            style={{
                                              borderWidth: 0,
                                              width: '100%',
                                            }}>
                                            <Text
                                              style={{
                                                color: Colors.blackColor,
                                                ...Fonts.blackColor14Regular,
                                              }}>
                                              Quality: {product.product_quality_name}
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                      
                                    </View>
                                  </Pressable>
                        )}
                        )}  
                    </>
                )}
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>  
                <View style={styles.headerKrushi}>
                    <Feather name="chevron-left" size={30} color="black" style={styles.backArrowStyle} onPress={() => navigation.pop()}/>                       
                </View>                 
                <View style={styles.container}>
                  <View
                    style={
                      clicked
                        ? styles.searchBar__clicked
                        : styles.searchBar__unclicked
                    }
                  >
                    {/* search Icon */}
                    <Feather
                      name="search"
                      size={20}
                      color="black"
                      style={{ marginLeft: 1 }}
                    />
                    {/* Input field */}
                    <TextInput
                      style={styles.input}
                      placeholder="Search Here..."
                      value={searchPhrase}
                      onChangeText={(text) => getSearchedData(text)}
                      onFocus={() => {
                        setClicked(true);
                      }}
                    />
                    {/* cross Icon, depending on whether the search bar is clicked or not */}
                    {clicked && (
                      <AntDesign name="close" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                          setSearchPhrase("")
                      }}/>
                    )}
                  </View>
                </View>
            </View>
        )
    }

}

export default SearchScreen;
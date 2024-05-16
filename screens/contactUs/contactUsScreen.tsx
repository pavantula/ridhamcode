import React, { useCallback, useState } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, Image, Dimensions, Text, TouchableOpacity, ScrollView, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { FontAwesome, MaterialIcons, AntDesign, Feather, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useForm, Controller } from "react-hook-form";
import * as EmailValidator from "email-validator";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ContactUsScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          first_name: '',
          last_name: '',
          email_address: '',
          mobile: '',
          message: ''
        }
    });    
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();

    const onSubmit = async (data) => {      
        setLoading(true);      
        try {
            const formData = new FormData();
            formData.append('first_name', data.first_name);
            formData.append('last_name', data.last_name);  
            formData.append('email', data.email_address);  
            formData.append('mobile', data.mobile);  
            formData.append('message', data.message);  
            const response = await axios.post(
                'sendcontactemail', 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': '*/*',
                    }  
                }   
            );
            if(response){ 
                setLoading(false);
                if(!response.data.status){
                    setError(response.data.message);
                }else{
                    setLoading(false);
                    Alert.alert(response.data.message);
                    navigation.pop(); 
                }
            } 
        } catch (e) {
          setLoading(false); 
          console.log(e)       
        }
    };   
    
    return(
        <SafeAreaView style={{ backgroundColor: Colors.whiteColor }}>            
                <StatusBar translucent={false} backgroundColor={Colors.whiteColor} />
                <View>                
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 1.0, }}
                    >
                        {header()}
                        {aboutUsFunction()}
                    </ScrollView>                    
                </View>
        </SafeAreaView>
    )

    function aboutUsFunction(){
        return (
            <View style={styles.krushiIDProfileData}>
                <View style={[styles.categorySlides, styles.analyticsStyle]}>
                    <View style={styles.analyticCard}>
                        <MaterialCommunityIcons name="email-edit-outline" size={30} color={Colors.greenColor} style={styles.analyticIcon}/>
                        <Text style={styles.analyticNumber}>info@krushi.co.in</Text>
                        <Text style={styles.analyticText}>Email</Text>
                    </View>
                    <View style={styles.analyticCard}>
                        <Feather name="phone-call" size={30} color={Colors.greenColor} style={styles.analyticIcon}/>
                        <Text style={styles.analyticNumber}>+91 9948022611</Text>
                        <Text style={styles.analyticText}>Phone</Text>
                    </View>
                </View>
                <View style={styles.categorySlides}>
                    <View style={[styles.analyticCard, styles.analyticLargeCard]}>
                        <Entypo name="location" size={30} color={Colors.greenColor} style={styles.analyticIcon}/>
                        <Text style={styles.analyticNumber}>Hyderabad ,Telangana, India</Text>
                        <Text style={styles.analyticText}>Address</Text>
                    </View>                    
                </View>
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    <Text style={{ ...Fonts.orangeColor18Bold }}>Send us a message!</Text>
                </Text>
                
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'justify'}}>
                    If you have any inquiries and facing any issues with the application feel free to contact us !
                </Text>
                <View style={styles.sectionBorder}></View>    
                {error && ( 
                    <View style={styles.section}>                   
                        <Text style={{...Fonts.redColor14Regular}}>{error}</Text>
                    </View>  
                )}       
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1, marginBottom: Sizes.fixPadding * 2.0 }}>                            
                            <Text style={{ ...Fonts.blackColor14Regular }}>                         
                                First Name
                            </Text> 
                            <View style={styles.textInfoWrapStyle}> 
                                <FontAwesome name="user-o" size={20} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}
                                    rules={{
                                     required: 'Please enter your first name.',
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (                                  
                                        <TextInput
                                            placeholderTextColor={Colors.grayColor}
                                            style={{ flex: 1, ...Fonts.blackColor14Regular }}                                            
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder={'Enter your first name'}
                                            returnKeyType="next"
                                        />   
                                    )}
                                    name="first_name"
                                />                                                  
                            </View>   
                            {errors.first_name && <Text style={{ ...Fonts.redColor14Regular }}>{errors.first_name.message}</Text>}                        
                        </View>
                    </View> 
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                            
                            <Text style={{ ...Fonts.blackColor14Regular }}>                         
                               Last Name
                            </Text> 
                            <View style={styles.textInfoWrapStyle}>  
                                <FontAwesome name="user-o" size={20} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: 'Please enter your last name.',
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextInput
                                        placeholderTextColor={Colors.grayColor}
                                        style={{ flex: 1, ...Fonts.blackColor14Regular }}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={'Enter your last name'}
                                      />
                                    )}
                                    name="last_name"
                                />                                                  
                            </View>
                            {errors.last_name && <Text style={{ ...Fonts.redColor14Regular }}>{errors.last_name.message}</Text>}                        
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                            
                            <Text style={{ ...Fonts.blackColor14Regular }}>                         
                               Email Address
                            </Text> 
                            <View style={styles.textInfoWrapStyle}>  
                                <MaterialCommunityIcons name="email-edit-outline" size={20} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: 'Please enter your email address.',
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextInput
                                        placeholderTextColor={Colors.grayColor}
                                        style={{ flex: 1, ...Fonts.blackColor14Regular }}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={'Enter your email address'}
                                      />
                                    )}
                                    name="email_address"
                                />                                                  
                            </View>
                            {errors.email_address && <Text style={{ ...Fonts.redColor14Regular }}>{errors.email_address.message}</Text>}                        
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                            
                            <Text style={{ ...Fonts.blackColor14Regular }}>                         
                               Mobile Number
                            </Text> 
                            <View style={styles.textInfoWrapStyle}>  
                                <Feather name="phone-call" size={20} color={Colors.orangeColor} style={styles.textIcon}/>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: 'Please enter your mobile number.',
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextInput
                                        placeholderTextColor={Colors.grayColor}
                                        style={{ flex: 1, ...Fonts.blackColor14Regular }}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={'Enter your mobile number'}
                                      />
                                    )}
                                    name="mobile"
                                />                                                  
                            </View>
                            {errors.mobile && <Text style={{ ...Fonts.redColor14Regular }}>{errors.mobile.message}</Text>}                        
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>                    
                        <View style={{ flex: 1 , marginBottom: Sizes.fixPadding * 2.0 }}>                            
                            <Text style={{ ...Fonts.blackColor14Regular }}>                         
                                Message (Not more that 500 words)
                            </Text> 
                            <View style={styles.textInfoWrapStyle}>  
                                <MaterialCommunityIcons name="message-processing-outline" size={20} color={Colors.orangeColor} style={styles.textIcon} />
                                <Controller
                                    control={control}
                                    rules={{
                                        required: 'Please enter your message.',
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                      <TextInput
                                        placeholderTextColor={Colors.grayColor}
                                        style={{ flex: 1, ...Fonts.blackColor14Regular }}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        multiline={true}
                                        numberOfLines={6} 
                                        maxLength={1000}
                                        placeholder={'Enter your message (Not more that 500 words)'}
                                      />
                                    )}
                                    name="message"
                                />                                                  
                            </View>
                            {errors.message && <Text style={{ ...Fonts.redColor14Regular }}>{errors.message.message}</Text>}                        
                        </View>
                    </View>          
                </View>               
                
                <Pressable                    
                    style={styles.krushiIDCheckMain}
                    disabled={isLoading}
                    onPress={handleSubmit(onSubmit)}>   
                        {isLoading && 
                            <ActivityIndicator size="small" color="#ffffff" />
                        }
                        {!isLoading && 
                            <Text style={{ ...Fonts.whiteColor16Medium }}>
                                Send Now
                            </Text>
                        } 
                </Pressable>
                
            </View>
        )  
    }
    

    function header() {
        return (
            <View style={styles.headerWrapStyle}>                            
                <Pressable onPress={() => navigation.pop()}> 
                    <Text style={{ ...Fonts.blackColor16Light, marginTop: Sizes.fixPadding  }}>
                        <Feather name="chevron-left" size={30} color="black" />   
                    </Text> 
                </Pressable>
                <View style={styles.headerKrushi}>
                    <Text style={styles.headerText}>Contact Us</Text>                   
                </View> 
                <Pressable> 
                    <Text style={{ ...Fonts.whiteColor16Regular, textAlign: 'right', marginTop: Sizes.fixPadding  }}>
                        Dum
                    </Text> 
                </Pressable>
            </View>
        )
    }  
}

export default ContactUsScreen;
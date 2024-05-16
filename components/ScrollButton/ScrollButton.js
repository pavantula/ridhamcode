import React, { useRef, useEffect } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

// SVG and icons
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign, Feather } from "@expo/vector-icons";

import { Colors, Fonts, Sizes, ElementsText, window } from "../../constants/styles";

// StyleSheets
import globalStyles from "../styles/globalStyles";
import scrollButtonStyles from "../styles/ScrollButtonStyles";

const NextButton = ({
    direction,
    scrollToNext,
    scrollToPrevious,
    percentage,
    currentIndex,
    slidesLength,
}) => {
    // Extract style from styleSheets
    const { button } = scrollButtonStyles;

    // Declare constants for the Circle SVGs
    const size = 100,
        strokeWidth = 2,
        center = size / 2,
        radius = size / 2 - strokeWidth / 2,
        circumference = 2 * Math.PI * radius;

    // If the touchable opacity should be disabled
    const ifDisabled =
        direction === "next"
            ? currentIndex >= slidesLength - 1
            : currentIndex <= 0;

    // Refs
    const progressAnimation = useRef(new Animated.Value(0)).current,
        progressRef = useRef(null);

    // Handle the animation
    const handleAnimation = (toValue) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    // Trigger animation function call
    useEffect(() => {
        handleAnimation(percentage);
    }, [percentage]);

    // Set event listener to progress animation ref
    useEffect(() => {
        progressAnimation.addListener(
            (value) => {
                // Set what the stroke width will be
                const strokeDashoffset =
                    circumference - (circumference * value.value) / 100;

                // If progressRef is initiated, set the stroke
                if (progressRef?.current) {
                    progressRef.current.setNativeProps({
                        strokeDashoffset,
                    });
                }
            },
            [percentage]
        );

        // Do the cleanup -- on component unmount
        return () => {
            progressAnimation.removeAllListeners();
        };
    }, []);

    return (
        <View style={{ backgroundColor: Colors.bgGreyColor}}>

            {/* The button to scroll the slider */}
            <TouchableOpacity
                // Function call depending on the direction
                onPress={direction === "next" ? scrollToNext : scrollToPrevious}
                style={[button, ifDisabled && { backgroundColor: Colors.greyColor }]}
                activeOpacity={0.6}
                // disabled if no slides to move in the requested direction
                disabled={ifDisabled}
            >
                {/* Icon */}
                <Feather
                    // Icon depending on the direction
                    name={direction === "next" ? "chevron-right" : "chevron-left"}
                    size={20}
                    color="#fff"
                />
            </TouchableOpacity>
        </View>
    );
};

export default NextButton;

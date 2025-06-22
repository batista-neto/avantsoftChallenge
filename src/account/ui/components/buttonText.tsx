import React from 'react';
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';

interface ButtonText {
    props?: TouchableOpacityProps
    textColor: string
    value: string
}

export function ButtonText({props, value, textColor}: ButtonText) {
   return (
    <TouchableOpacity {...props}>
        <Text style={[styles.textButton, {color: textColor}]}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    textButton: {
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        fontWeight: '900',
    },
});
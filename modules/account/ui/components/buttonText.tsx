import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface buttonTextProps {
    props?: TouchableOpacityProps
    textColor: string
    value: string
}

export const ButtonText = ({props, value, textColor}: buttonTextProps) => {
   return (
    <TouchableOpacity {...props}>
        <Text style={[styles.textButton, {color: textColor}]}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    textButton: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        fontWeight: '900',
    },
});
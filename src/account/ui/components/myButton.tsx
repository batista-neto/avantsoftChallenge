import React from 'react';
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';

interface MyButton {
    value: string
    props?: TouchableOpacityProps
    style?: object
}

export function MyButton({value, props, style}: MyButton) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
        <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#000000',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        fontWeight: '700',
    },
});
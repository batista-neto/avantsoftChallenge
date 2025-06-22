import React, { useState } from 'react';
import {StyleSheet, TextInput, View, TextInputProps, Image, ImageSourcePropType, TouchableOpacity} from 'react-native';

interface InputText {
    props?: TextInputProps
    isPassword?: boolean
    placeHolder: string
    value?: string
    onChangeText: (text: string) => void
}

export const InputText = ({props,placeHolder, value, onChangeText, isPassword = false}: InputText) => {
    const [secureEntry, setSecureEntry] = useState<boolean>(isPassword);

   return (
    <View style={styles.container}>
        <TextInput
            {...props}
            placeholder={placeHolder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureEntry}
            style={styles.inputText}
        />
        {isPassword && <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)} style={styles.hidePassword}>
            
        </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    icon: {
        position: 'absolute',
        top: 32,
        left: 15,
    },
    hidePassword: {
        position: 'absolute',
        top: 32,
        right: 15,
    },
    inputText: {
        width: '100%',
        borderWidth: 1.5,
        borderRadius: 10,
        marginTop: 15,
        paddingLeft: 45,
    },
});
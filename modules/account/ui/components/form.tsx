import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface formProps {
    title: string;
    value: string;
    onChangeValue: (text: string) => void;
    placeholder: string;
    isPassword?: boolean;
}

export const Form = ({title, value, onChangeValue, placeholder, isPassword = false}: formProps) => {
    const [secureEntry, setSecureEntry] = useState<boolean>(isPassword);
    
    return (
        <View style={styles.form}>
            <Text style={styles.text}> {title} </Text>
            <View style={styles.container}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeValue}
                    secureTextEntry={secureEntry}
                />
                {isPassword && <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)} style={styles.hidePassword}>
                    <Entypo name="eye-with-line" size={24} color="black" />
                </TouchableOpacity>}
            </View>
        </View>     
    );
};

const styles = StyleSheet.create({
    form: {
        width: "100%",
    },
    container: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 22,
        fontWeight: "light",
        fontFamily: "Roboto",
        marginBottom: 5,
    },
    textInput: {
        backgroundColor: "#F2F2F2",
        width: "100%",
        height: 45,
        padding: 12,
        borderRadius: 10,
    },
    hidePassword: {
        position: 'absolute',
        top: 10,
        right: 15,
    },
});



import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface myButtonProps {
    value: string
    props?: TouchableOpacityProps
}


export const MyButton = ({value, props}: myButtonProps) => {
    return (
        <TouchableOpacity style={styles.button} {...props}>
            <Text style={styles.buttonText}> {value} </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: "100%",
        backgroundColor: "#202020",
        borderRadius: 8,
        alignContent: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Roboto",
        fontWeight: "bold",
    },
});



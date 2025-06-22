import { ScreenInfo } from "core/navigation/api";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Form } from "../components/form";
import { MyButton } from "../components/myButton";

const RegisterScreen = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Form 
                    title="Email"
                    value={email}
                    onChangeValue={setEmail}
                    placeholder="Insert your email"
                />

                <Form 
                    title="Password"
                    value={password}
                    onChangeValue={setPassword}
                    placeholder="Insert your password"
                    isPassword={true}
                />

                <Form 
                    title="Confirm your Password"
                    value={password}
                    onChangeValue={setPassword}
                    placeholder="Insert the same password"
                    isPassword={true}
                />

                <View style={styles.buttonBox}>
                    <MyButton 
                        value="Register"
                        props={{ onPress: () => {} }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    box: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: '90%',
        alignSelf: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        },
    textError: {
        color: "red",
        fontSize: 16,
        marginTop: 10,
        textAlign: "center",
    },
    buttonBox: {
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    }
});

export function getRegisterScreenInfo(): ScreenInfo {
    return new ScreenInfo("Register", RegisterScreen, "Register", "default", false);
  }

export default RegisterScreen;



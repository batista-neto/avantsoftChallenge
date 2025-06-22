import { useInject } from "core/di/screens";
import { Navigator, ScreenInfo } from "core/navigation/api";
import { AuthController } from "modules/account/business/api";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ButtonText } from "../components/buttonText";
import { Form } from "../components/form";
import { MyButton } from "../components/myButton";

const LoginScreen = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<boolean>(false);

    const authController = useInject<AuthController>("AuthController");
    const navigator = useInject<Navigator>("Navigator");

    useEffect(() => {
        authController.subscribe({
            onLoginSuccess: (token) => {
                setEmail("");
                setPassword("");
                setLoginError(false);
            },
            onError: (error) => {
                setLoginError(true);
            },
            onLoading: (isLoading) => {
                console.log("Loading:", isLoading);
            }
        })
    })

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

                {loginError && <Text style={styles.textError}>Ivalid email or password </Text>}

                <View style={styles.buttonBox}>
                    <MyButton 
                        value="Login"
                        props={{ onPress: () => authController.login(email, password) }}
                    />
                </View>

                <View style={styles.thirdContent}>
                    <Text style={styles.text}>New to Avantsoft?</Text>
                    <ButtonText
                        value="Register"
                        textColor="#000"
                        props={{onPress: () => navigator.navigate('Register')}}
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
    },
    thirdContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 14,
        marginRight: 5,
        color: '#000',
        fontFamily: 'Roboto-Regular',
    },
});

export function getLoginScreenInfo(): ScreenInfo {
    return new ScreenInfo("Login", LoginScreen, "Login", "default", false);
  }

export default LoginScreen;



import { useInject } from "core/di/screens";
import { ScreenInfo } from "core/navigation/api";
import { Spinner } from "ds/components";
import { AuthController } from "modules/account/business/api";
import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import { Form } from "../components/form";
import { MyButton } from "../components/myButton";

const LoginScreen = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<boolean>(false);

    const authController = useInject<AuthController>("AuthController");

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        authController.subscribe({
            onLoginSuccess: (token) => {
                setEmail("");
                setPassword("");
                setLoginError(false);
            },
            onError: () => {
                setLoginError(true);
            },
            onLoading: (isLoading) => {
                setIsLoading(isLoading);
            }
        })

        authController.isLogedIn();

        return () => {
            authController.unSubscribe();
            backHandler.remove();
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                {isLoading ? <Spinner /> :
                <>
                    <Form 
                        title="Username"
                        value={email}
                        onChangeValue={setEmail}
                        placeholder="Insert your username"
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
                </>}
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
});

export function getLoginScreenInfo(): ScreenInfo {
    return new ScreenInfo("Login", LoginScreen, "Login", "default", false);
  }

export default LoginScreen;



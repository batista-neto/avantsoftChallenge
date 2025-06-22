import { useInject } from "core/di/screens";
import { ScreenInfo } from "core/navigation/api";
import { RegisterController } from "modules/account/business/api";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DateInput } from '../components/dateInput';
import { Form } from "../components/form";
import { MyButton } from "../components/myButton";
import { formatDate } from "../utils/formatDate";

const RegisterScreen = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [error, setError] = useState<boolean>(false);

    const registerController = useInject<RegisterController>("RegisterController");

    const handleDateChange = (_event: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
            setDateOfBirth(selectedDate);
        }
    };

    useEffect(() => {
        registerController.subscribe({
            onRegisterSuccess: () => {
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setDateOfBirth(new Date());
                setError(false);
            },
            onError: () => {
                setError(true);
            },
            onLoading: (isLoading) => {
                console.log("Loading:", isLoading);
            }
        });
    })

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Form 
                    title="Full name"
                    value={name}
                    onChangeValue={setName}
                    placeholder="Insert your full name"
                />

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
                    value={confirmPassword}
                    onChangeValue={setConfirmPassword}
                    placeholder="Insert the same password"
                    isPassword={true}
                />

                <DateInput 
                    date={dateOfBirth}
                    setDate={setDateOfBirth}
                    showPicker={showPicker}
                    setShowPicker={setShowPicker}
                    handleDateChange={handleDateChange}
                />

                {error && <Text style={styles.textError}>Fill in all fields correctly</Text>}

                <View style={styles.buttonBox}>
                    <MyButton 
                        value="Register"
                        props={{ onPress: () => registerController.register({name, email, password, dateOfBirth: formatDate(dateOfBirth)}, confirmPassword)}}
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
});

export function getRegisterScreenInfo(): ScreenInfo {
    return new ScreenInfo("Register", RegisterScreen, "Register", "default", false);
  }

export default RegisterScreen;



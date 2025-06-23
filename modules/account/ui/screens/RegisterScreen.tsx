import { useNavigation } from "@react-navigation/native";
import { useInject } from "core/di/screens";
import { ScreenInfo } from "core/navigation/api";
import { RegisterController } from "modules/account/business/api";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { DateInput } from '../components/dateInput';
import { Form } from "../components/form";
import { MyButton } from "../components/myButton";
import { formatDate } from "../utils/formatDate";

const RegisterScreen = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [error, setError] = useState<boolean>(false);

    const registerController = useInject<RegisterController>("RegisterController");
    const navigation = useNavigation();

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

        return () => {
            registerController.unsubscribe();
        }
    }, []);

    return (
        <Pressable style={styles.overlay} onPress={() => navigation.goBack()}>
            <View style={styles.modalContainer}>
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
                        props={{ onPress: () => 
                            registerController.register(
                                { name, email, dateOfBirth: formatDate(dateOfBirth) }
                            )
                        }}
                    />
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    textError: {
        color: "red",
        fontSize: 16,
        marginTop: 10,
        textAlign: "center",
    },
    buttonBox: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
});

export function getRegisterScreenInfo(): ScreenInfo {
    return new ScreenInfo("Register", RegisterScreen, undefined, "default", false);
}

export default RegisterScreen;

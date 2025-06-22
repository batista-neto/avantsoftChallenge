import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Text, View, StyleSheet } from 'react-native';
import { InputText } from '../components/inputText';
import { ButtonText } from '../components/buttonText';
import { MyButton } from '../components/myButton';


export default function LoginScreen({navigation}: any) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginErro, setLoginErro] = useState<boolean>(false);

  return (
    <View style={styles.container}>
        <View style={styles.box}>
        <KeyboardAvoidingView behavior="position">
                <InputText
                    placeHolder="Insert your email"
                    value={email}
                    onChangeText={setEmail}
                    props={{
                        keyboardType: 'email-address',
                    }}
                />
                <InputText
                    isPassword={true}
                    placeHolder="Insert your password"
                    value={password}
                    onChangeText={setPassword}
                />
                
                {loginErro && <Text style={styles.textErro}>Email ou senha estão incorretos</Text>}

                <MyButton
                    value="Entrar"
                    props={{onPress() {}}}
                />

                <View style={styles.thirdContent}>
                    <Text style={styles.text}>First access?</Text>
                    <ButtonText
                        value="Register"
                        textColor="#"
                        props={{onPress: () => navigation.navigate('Register')}}
                    />
                </View>
        </KeyboardAvoidingView>
        </View>
    </View>
  );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:  'center',
        backgroundColor: '#fff',
    },
    box: {
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
    thirdContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 12,
        marginRight: 5,
    },
    textErro: {
        color: '#C20C18',
        marginTop: 5,
        fontFamily: 'Roboto-Regular',
        fontWeight: '700',
    },
});
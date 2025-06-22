import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from 'ds/theme/colors';
import { fonts } from 'ds/theme/fonts';


interface actionTileProps {
    icon: React.ReactNode;
    text?: string;
    onPress?: () => void;
}

export const ActionTile: React.FC<actionTileProps> = ({ icon, text, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {icon}
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 0,
        width: 60,
        height: 60,
    },
    text: {
        fontSize: 8,
        fontFamily: fonts.regular,
        color: colors.black,
        textAlign: 'center',
    },
});
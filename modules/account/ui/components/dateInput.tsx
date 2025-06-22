import DateTimePicker from '@react-native-community/datetimepicker';
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDate } from '../utils/formatDate';

interface dateInputProps {
    date: Date;
    setDate: (date: Date) => void;
    showPicker: boolean;
    setShowPicker: (show: boolean) => void;
    handleDateChange: (_event: any, selectedDate?: Date) => void;
}

export const DateInput = ({date, setDate, showPicker, setShowPicker, handleDateChange}: dateInputProps) => {
    return (
        <View style={styles.container}>
                <Text style={styles.text}>Date of Birth</Text>
                <TouchableOpacity
                    onPress={() => setShowPicker(true)}
                    style={styles.input}
                >
                    <Text style={styles.inputText}>{formatDate(date)}</Text>
                </TouchableOpacity>

                {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                />)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    text: {
        fontSize: 22,
        fontWeight: "light",
        fontFamily: "Roboto",
        marginBottom: 5,
        marginLeft: 5,
    },
    input: {
        backgroundColor: '#eee',
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    inputText: {
        fontSize: 16,
        color: '#333',
    },
});
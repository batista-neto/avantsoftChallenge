import React from "react";
import { StyleSheet, Text, View } from "react-native";

const clientes = [
  { nome: "Ana Beatriz", vendas: [{ data: "2024-01-01", valor: 150 }, { data: "2024-01-02", valor: 50 }] },
  { nome: "Carlos Eduardo", vendas: [{ data: "2024-01-01", valor: 15 }] },
  { nome: "Juliana Lima", vendas: [{ data: "2024-01-01", valor: 80 }] },
];

interface boxInfoProps {
    title: string;
    name: string;
    total: string;
}

export const BoxtInfo = ({ title, name, total}: boxInfoProps) => {  
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.total}>{total}</Text>
        </View>
    );
};
  
  const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f0f8ff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    total: {
        fontSize: 16,
        color: '#555',
        marginTop: 4,
    },
  });
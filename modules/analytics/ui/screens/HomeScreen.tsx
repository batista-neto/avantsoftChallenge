import { ScreenInfo } from "core/navigation/api";
import { Header } from "ds/components/header";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart } from '../components/barChart';
import { BoxtInfo } from "../components/boxInfo";
import { formatDate } from "../utils/formatDate";

const clientes = [
  { nome: "Ana Beatriz", vendas: [{ data: "2024-01-01", valor: 150 }, { data: "2024-01-02", valor: 50 }] },
  { nome: "Carlos Eduardo", vendas: [{ data: "2024-01-01", valor: 15 }] },
  { nome: "Juliana Lima", vendas: [{ data: "2024-01-01", valor: 80 }] },
];

  
const HomeScreen = () => {  
    const [selectedDate, setSelectedDate] = useState(new Date('2024-01-01'));

    const getTopCliente = () => {
        return clientes.reduce((topCliente, cliente) => {
          const vendasFiltradas = cliente.vendas.filter(venda => venda.data === formatDate(selectedDate));
    
          if (vendasFiltradas.length === 0) return topCliente;
    
          const media = vendasFiltradas.reduce((sum, venda) => sum + venda.valor, 0) / vendasFiltradas.length;
    
          return media > topCliente.media ? { nome: cliente.nome, media } : topCliente;
        }, { nome: "", media: 0 });
      };
    
      const topCliente = getTopCliente();

      const getClienteMaisFrequenteTotal = () => {
        return clientes.reduce((maisFrequente, cliente) => {
          const quantidade = cliente.vendas.length;
      
          return quantidade > maisFrequente.quantidade
            ? { nome: cliente.nome, quantidade }
            : maisFrequente;
        }, { nome: "", quantidade: 0 });
      };

      const clienteMaisFrequente = getClienteMaisFrequenteTotal();

      const getLetraFaltando = (nome: string): string => {
        const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const letrasNome = nome.toUpperCase().replace(/[^A-Z]/g, "").split("");
      
        for (const letra of alfabeto) {
          if (!letrasNome.includes(letra)) {
            return letra;
          }
        }
      
        return "-";
      };

    return (
        <>
            <Header title="Sales report" />
            <ScrollView contentContainerStyle={styles.container}>
                <BarChart clientes={clientes} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

                <BoxtInfo
                    title="Customer with the highest average sales:"
                    name={topCliente.nome}
                    total={`Average: ${topCliente.media.toFixed(2) || "Nenhum"}`}
                />

                <BoxtInfo
                    title="Customer with the highest purchasing frequency:"
                    name={clienteMaisFrequente.nome || "Nenhum"}
                    total={`Purchases: ${clienteMaisFrequente.quantidade}`}
                />

                <View style={styles.letrasFaltandoContainer}>
                    <Text style={styles.topClienteTitle}>Letter of the alphabet that does not yet appear in the name:</Text>
                    {clientes.map((cliente) => (
                        <View key={cliente.nome} style={styles.clienteItem}>
                        <Text style={styles.clienteNome}>{cliente.nome}</Text>
                        <Text style={styles.letraFaltando}>
                            Missing letter: {getLetraFaltando(cliente.nome)}
                        </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

        </>
    );
};
  
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 20,
      paddingHorizontal: 10,
      backgroundColor: '#fff'
    },
    topClienteTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    letrasFaltandoContainer: {
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
      clienteItem: {
        marginBottom: 12,
      },
      clienteNome: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
      },
      letraFaltando: {
        fontSize: 14,
        color: '#666',
      },
  });

export function getHomeScreenInfo(): ScreenInfo {
    return new ScreenInfo("Home", HomeScreen, "Home", "default", false);
  }

export default HomeScreen;



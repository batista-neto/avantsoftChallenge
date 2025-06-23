import { useInject } from "core/di/screens";
import { ScreenInfo } from "core/navigation/api";
import { Header } from "ds/components/header";
import { Client, HomeScreenController } from "modules/analytics/business";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart } from '../components/barChart';
import { BoxtInfo } from "../components/boxInfo";

const clientes = [
  { nome: "Ana Beatriz", vendas: [{ data: "2024-01-01", valor: 150 }, { data: "2024-01-02", valor: 50 }] },
  { nome: "Carlos Eduardo", vendas: [{ data: "2024-01-01", valor: 15 }] },
  { nome: "Juliana Lima", vendas: [{ data: "2024-01-01", valor: 80 }] },
];

  
const HomeScreen = () => {
    const [clientess, setClientess] = useState<Client[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date('2024-01-02'));

    const homeScreenControler = useInject<HomeScreenController>("HomeScreenController");

    const customerWithHighestAvarageSale = homeScreenControler.getCustomerWithHighestAvarageSale(clientess, selectedDate)

    const clientEithMostFrequency = homeScreenControler.getCustumerWithMostFrequency(clientess)

    useEffect(() => {
        homeScreenControler.subscribe({
            onSalesReport(report) {
                setClientess(report.clients);
            },
            onError(error: string) {
                console.error("Error:", error);
            },
        });

        homeScreenControler.getSalesReport();

        return () => {
            homeScreenControler.unsubscribe();
        }
    }, [selectedDate])

    return (
        <>
            <Header title="Sales report" />
            <ScrollView contentContainerStyle={styles.container}>
                <BarChart clientes={clientes} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

                <BoxtInfo
                    title="Customer with the highest average sales:"
                    name={customerWithHighestAvarageSale.name}
                    total={`Average: ${customerWithHighestAvarageSale.average.toFixed(2) || "Nenhum"}`}
                />

                <BoxtInfo
                    title="Customer with the highest purchasing frequency:"
                    name={clientEithMostFrequency.name || "Nenhum"}
                    total={`Purchases: ${clientEithMostFrequency.qty}`}
                />

                <View style={styles.letrasFaltandoContainer}>
                    <Text style={styles.topClienteTitle}>Letter of the alphabet that does not yet appear in the name:</Text>
                    {clientes.map((cliente) => (
                        <View key={cliente.nome} style={styles.clienteItem}>
                        <Text style={styles.clienteNome}>{cliente.nome}</Text>
                        <Text style={styles.letraFaltando}>
                            Missing letter: {homeScreenControler.getLetterForCustomer(cliente.nome)}
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



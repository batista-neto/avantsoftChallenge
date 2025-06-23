import { useInject } from "core/di/screens";
import { ScreenInfo } from "core/navigation/api";
import { Header } from "ds/components/header";
import { Client, HomeScreenController } from "modules/analytics/business";
import React, { useEffect, useState } from "react";
import { BackHandler, ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart } from '../components/barChart';
import { BoxtInfo } from "../components/boxInfo";
import { MenuBar } from "../components/menuBar";
import { MenuIcon } from "../components/menuIcon";

  
const HomeScreen = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date('2024-01-02'));
    const [menuVisible, setMenuVisible] = useState(false);

    const homeScreenControler = useInject<HomeScreenController>("HomeScreenController");

    const customerWithHighestAvarageSale = homeScreenControler.getCustomerWithHighestAvarageSale(clients, selectedDate)

    const clientEithMostFrequency = homeScreenControler.getCustumerWithMostFrequency(clients)

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        homeScreenControler.subscribe({
            onSalesReport(report) {
                setClients(report.clients);
            },
            onError(error: string) {
                console.error("Error:", error);
            },
        });

        homeScreenControler.getSalesReport();

        return () => {
            homeScreenControler.unsubscribe();
            backHandler.remove();
        }
    }, [selectedDate])

    return (
        <>  
            <MenuIcon onPress={() => setMenuVisible(true)} />
            <MenuBar visible={menuVisible} onClose={() => setMenuVisible(false)} />
                
            <Header title="Sales report" />
            <ScrollView contentContainerStyle={styles.container}>
                <BarChart clients={clients} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

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
                    {clients.map((client) => (
                        <View key={client.user.name} style={styles.clienteItem}>
                        <Text style={styles.clienteNome}>{client.user.name}</Text>
                        <Text style={styles.letraFaltando}>
                            Missing letter: {homeScreenControler.getLetterForCustomer(client.user.name)}
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



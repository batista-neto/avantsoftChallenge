import { useInject } from 'core/di/screens';
import { Client, HomeScreenController } from 'modules/analytics/business';
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface barChartProps {
    clients: Client[];
}

export const BarChart = ({ clients }: barChartProps) => {
    const homeScreenController = useInject<HomeScreenController>("HomeScreenController");

    const salesPerDay = useMemo(() => {
        return homeScreenController.getReportOfSalesPerDay(clients);
    }, [clients]);
    
    const maxVendas = Math.max(...salesPerDay.map(d => d.volume), 0);

    return (
        <View>
            <View style={styles.barHeader}>
                <Text style={styles.title}>Total sales per day</Text>
            </View>

            <View style={styles.graphCard}>
                <View style={styles.chartContainer}>
                    <View style={styles.yAxis}>
                        {[...Array(5).keys()].reverse().map((i) => {
                            const value = Math.ceil((maxVendas / 4) * i);

                            if (value === 0) return <View key={i} style={styles.yLabelContainer} />;

                            return (
                                <View key={i} style={styles.yLabelContainer}>
                                    <Text style={styles.yLabel}>{value}</Text>
                                </View>
                            );
                        })}
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.barsContainer}>
                            {salesPerDay.map((item, index) => {
                                const heightPercent = item.volume / (maxVendas || 1);
                                const barHeight = heightPercent * 200;

                                return (
                                    <View key={index} style={styles.barItem}>
                                        <Text style={styles.barValue}>{item.volume}</Text>

                                        <View style={[styles.bar, {
                                            height: barHeight,
                                            backgroundColor: '#3498db',
                                        }]} />

                                        <Text style={styles.xLabel} numberOfLines={1} adjustsFontSizeToFit>
                                            {new Intl.DateTimeFormat('pt-BR').format(new Date(new Date(item.data).getTime() + 3 * 60 * 60 * 1000))}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    barHeader: {
        paddingHorizontal: 15,
        marginBottom: 10
    },
    graphCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        marginBottom: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        color: "#333"
    },
    chartContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 20
    },
    yAxis: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 200,
        marginRight: 8,
    },
    yLabelContainer: {
        height: 200 / 4,
        justifyContent: 'center',
    },
    yLabel: {
        fontSize: 12,
        color: '#333'
    },
    barsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 1,
    },
    barItem: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 80,
        marginHorizontal: 8,
    },
    bar: {
        width: '60%',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    barValue: {
        color: '#000',
        fontSize: 12,
        marginBottom: 4,
    },
    xLabel: {
        marginTop: 4,
        fontSize: 12,
        textAlign: 'center',
        color: '#333',
        width: 80,
    },
});

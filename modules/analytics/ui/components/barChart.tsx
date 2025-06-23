import DateTimePicker from '@react-native-community/datetimepicker';
import { Client } from 'modules/analytics/business';
import React, { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { formatDate } from '../utils/formatDate';

const screenWidth = Dimensions.get("window").width;

interface barChartProps {
    clients: Client[];
    selectedDate?: Date;
    setSelectedDate(date: Date): void;
}

export const BarChart = ({ clients, selectedDate = new Date('2024-01-01'), setSelectedDate }: barChartProps) => {
    const [showPicker, setShowPicker] = useState(false);

    const formattedDate = formatDate(selectedDate);
    
    const dados = clients.map(c => {
        const volumeNoDia = c.statistics.sales.filter(v => v.data === formattedDate).length;

        return { nome: c.user.name, volume: volumeNoDia };
    });

    const maxVendas = Math.max(...dados.map(d => d.volume), 0);

    return (
        <>
            <View>
                <Pressable onPress={() => setShowPicker(true)} style={styles.dateButton}>
                    <Text style={styles.dateButtonText}>Select date</Text>
                </Pressable>

                {showPicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="calendar"
                        onChange={(_event, date) => {
                            setShowPicker(false);
                            if (date) setSelectedDate(date);
                        }}
                    />
                )}

                <Text style={styles.title}>Sales on {formattedDate}</Text>

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

                        <View style={styles.barsContainer}>
                            {dados.map((item, index) => {
                                const heightPercent = item.volume / (maxVendas || 1);
                                const barHeight = heightPercent * 200;

                                return (
                                    <View key={index} style={styles.barItem}>
                                        <Text style={styles.barValue}>{item.volume}</Text>

                                        <View style={[styles.bar, {
                                            height: barHeight,
                                            backgroundColor: item.volume === maxVendas && maxVendas > 0 ? '#2ecc71' : '#3498db',
                                        }]} />

                                        <Text style={styles.xLabel}>{item.nome}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>

                <View style={styles.legendContainer}>
                    <View style={[styles.legendColor, { backgroundColor: '#2ecc71' }]} />
                    <Text style={styles.legendText}>Higher sales volume</Text>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
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
        marginBottom: 12,
        color: "#333"
    },
    dateButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 20
    },
    dateButtonText: {
        color: '#fff',
        fontWeight: '600'
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
        justifyContent: 'space-around',
        flex: 1,
    },
    barItem: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: (screenWidth - 80) / 3,
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
        color: '#333'
    },
    legendContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center'
    },
    legendColor: {
        width: 16,
        height: 16,
        marginRight: 8,
        borderRadius: 4
    },
    legendText: {
        fontSize: 14,
        color: "#333"
    }
});





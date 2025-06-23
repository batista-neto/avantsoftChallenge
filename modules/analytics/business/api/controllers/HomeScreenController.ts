import { Client } from "../models/Client";
import { HomeScreenObserver } from "../observers/HomeScreenObserver";

export interface HomeScreenController {
    getSalesReport(): Promise<void>;
    getCustomerWithHighestSalesVolume(clients: Client[]): { name: string; total: number }
    getCustomerWithHighestAvarageSale(clientes: Client[]): {name: string, average: number};
    getCustumerWithMostFrequency(clients: Client[]): {name: string, qty: number};
    getLetterForCustomer(name: string): string;
    subscribe(observer: HomeScreenObserver): void;
    unsubscribe(): void;
}
import { Report } from "../models/Report";

export interface HomeScreenObserver {
    onSalesReport(salesReport: Report): void;
    onError(mesage: string): void;
}
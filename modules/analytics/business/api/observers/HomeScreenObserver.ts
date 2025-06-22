export interface HomeScreenObserver {
    onSalesReport(salesReport: any): void;
    onCustomerWithHighestSale(customer: any): void;
    onCustomerWithMostSales(customer: any): void;
    onLetterForCustomer(letter: string): void;
}
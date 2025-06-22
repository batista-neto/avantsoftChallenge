export interface HomeScreenController {
    getSalesReport(): Promise<void>;
    getCustomerWithHighestSale(): Promise<void>;
    getCustumerWithMostSales(): Promise<void>;
    getLetterForCustomer(): Promise<void>;
}
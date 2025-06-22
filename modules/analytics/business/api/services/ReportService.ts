import { Report } from "../models/Report";

export interface ReportService {
    getSalesReport(): Promise<Report>;
}
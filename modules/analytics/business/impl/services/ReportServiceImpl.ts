import { Report, ReportService } from "../..";
import axios from '../../../../../axiosMock';

export class ReportServiceImpl implements ReportService {
    private baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

    async getSalesReport(): Promise<Report> {

        try {
            const response = await axios.get(`${this.baseUrl}/report`);
            
            const payload: Report = {
                clients: [
                    response.data.data.clientes.map((client: any) => ({
                        user: {
                            name: client.info.nomeCompleto,
                            email: client.info.detalhes.email,
                            birthDate: client.info.detalhes.nascimento,
                        },
                        statistics: {
                            sales: client.estatisticas.vendas || []
                        }
                    }))
                ],
                meta: {
                    recordTotal: response.data.meta?.recordTotal || 0,
                    page: response.data.meta?.page || 1
                }
            }
            
            return payload;
        } catch (error) {
            throw new Error("Failed to fetch sales report");
        }

    }
}
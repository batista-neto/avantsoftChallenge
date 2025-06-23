import { HomeScreenController } from "../../api/controllers/HomeScreenController";
import { Client } from "../../api/models/Client";
import { HomeScreenObserver } from "../../api/observers/HomeScreenObserver";
import { ReportService } from "../../api/services/ReportService";

export class HomeScreenControllerImpl implements HomeScreenController {
    private observer: HomeScreenObserver | null = null;

    constructor(private reportService: ReportService) {}

    async getSalesReport(): Promise<void> {
        try {
            const report = await this.reportService.getSalesReport();
            this.observer?.onSalesReport(report);
        } catch (error) {
            this.observer?.onError("Failed to fetch sales report");
        }
    }

    getCustomerWithHighestAvarageSale(clients: Client[], selectedDate: Date): {name: string, average: number} {
       const response = clients.reduce(
        (topClient, client) => {
          const vendasFiltradas = client.statistics.sales.filter(
            (venda) => venda.data === this.formatDate(selectedDate)
          );
      
          if (vendasFiltradas.length === 0) return topClient;
      
          const media =
            vendasFiltradas.reduce((sum, venda) => sum + venda.valor, 0) /
            vendasFiltradas.length;
      
          return media > topClient.media
            ? { nome: client.user.name, media }
            : topClient;
        },
        { nome: '', media: 0 }
      );

        return {name: response.nome, average: response.media};
    }

    getCustumerWithMostFrequency(clients: Client[]): { name: string, qty: number } {
        const response = clients.reduce((mostFrequency, client) => {
            const qty = client.statistics.sales.length;
        
            return qty > mostFrequency.qty ? { name: client.user.name, qty } : mostFrequency;
        }, { name: "", qty: 0 });

          return { name: response.name, qty: response.qty };
    }

    getLetterForCustomer(name: string): string {
        const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const letrasNome = name.toUpperCase().replace(/[^A-Z]/g, "").split("");
      
        for (const letra of alfabeto) {
          if (!letrasNome.includes(letra)) {
            return letra;
          }
        }
      
        return "-";
    }

    subscribe(observer: HomeScreenObserver): void {
        this.observer = observer;
    }

    unsubscribe(): void {
        this.observer = null;
    }

    private formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // meses começam do 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
}
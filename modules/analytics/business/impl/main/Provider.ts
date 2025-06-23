import { AbstractDIProvider } from "../../../../../core/di/api";
import { HomeScreenController } from "../../api/controllers/HomeScreenController";
import { ReportService } from "../../api/services/ReportService";
import { HomeScreenControllerImpl } from "../controllers/HomeScreenControllerImpl";
import { ReportServiceImpl } from "../services/ReportServiceImpl";

export class Provider extends AbstractDIProvider {
  provide(): void {
    this.provideInteractors();
    this.provideControllers();
  }

  protected provideControllers() {
    this.mapper.single("HomeScreenController", () => this.getHomeScreenControllerController());
  }
  protected provideInteractors() {
    this.mapper.single("ReportService", () => new ReportServiceImpl());
  }
  protected getHomeScreenControllerController(): HomeScreenController {
    const reportSerice = this.mapper.inject<ReportService>("ReportService");
    return new HomeScreenControllerImpl(reportSerice);
  }
}

import { CategorizedValuesChartConfig } from "../../shared/models/categorized-values-chart-config.model";

export interface BoxPlotConfig extends CategorizedValuesChartConfig {
    readonly jitterWidth: number;
}

import { SharedChartConfig } from "../../shared/models";

export interface BarChartConfig extends SharedChartConfig {
    readonly groupPadding: number;
    readonly subGroupPadding: number;
}

import { SharedChartConfig } from "./shared-chart-config.model";
import { WithCardinalScaleOffset } from "./with-cardinal-scale-offset.model";

export interface CategorizedValuesChartConfig extends SharedChartConfig, WithCardinalScaleOffset {
    readonly groupPadding: number;
    readonly subGroupPadding: number;
    /**
     * Reference length of a character
     *
     * default: 10
     */
    readonly refTickCharWidth: number;
}

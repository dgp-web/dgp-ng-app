import { SharedChartConfig, WithCardinalScaleOffset } from "../../shared/models";

export interface BoxPlotConfig extends SharedChartConfig, WithCardinalScaleOffset {
    readonly groupPadding: number;
    readonly subGroupPadding: number;
    readonly jitterWidth: number;
    /**
     * Reference length of a character
     *
     * default: 10
     */
    readonly refTickCharWidth: number;
}

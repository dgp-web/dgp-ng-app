import { Chart } from "../../shared/models";
import { BoxGroup } from "./box-group.model";
import { BoxPlotControlLine } from "./box-plot-control-line.model";

export interface BoxPlot extends Chart {
    readonly model: ReadonlyArray<BoxGroup>;
    /**
     * Optional lines that indicate limits in which values should lie
     */
    readonly controlLines?: ReadonlyArray<BoxPlotControlLine>;
    readonly yAxisMin?: number;
    readonly yAxisMax?: number;
}

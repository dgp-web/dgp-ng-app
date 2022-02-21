import { CardinalYAxis, Chart } from "../../shared/models";
import { BoxGroup } from "./box-group.model";
import { BoxPlotControlLine } from "./box-plot-control-line.model";

export interface BoxPlot extends Chart, CardinalYAxis {
    readonly model: ReadonlyArray<BoxGroup>;

    readonly xAxisTickFormat?: (x: string) => string;
    readonly showYAxisGridLines?: boolean;
    readonly showXAxisGridLines?: boolean;

    /**
     * Optional lines that indicate limits in which values should lie
     */
    readonly controlLines?: ReadonlyArray<BoxPlotControlLine>;
}

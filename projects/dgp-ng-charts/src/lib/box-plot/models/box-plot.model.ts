import { CardinalYAxis, Chart } from "../../shared/models";
import { BoxGroup } from "./box-group.model";
import { BoxPlotControlLine } from "./box-plot-control-line.model";
import { DotConfig } from "../../connected-scatter-plot/models";

export interface BoxPlot extends Chart, CardinalYAxis, DotConfig {
    readonly model: ReadonlyArray<BoxGroup>;

    readonly xAxisTickFormat?: (x: string) => string;

    /**
     * Optional lines that indicate limits in which values should lie
     */
    readonly controlLines?: ReadonlyArray<BoxPlotControlLine>;
}

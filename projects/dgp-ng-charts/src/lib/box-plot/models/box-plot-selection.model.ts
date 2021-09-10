import { BoxOutlier } from "./box-outlier.model";

export interface BoxPlotSelection {
    readonly outliers?: ReadonlyArray<BoxOutlier>;
}


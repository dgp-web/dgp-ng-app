import { TrackByFunction } from "@angular/core";
import { BoxPlotControlLine } from "../models";

export const trackByBoxPlotControlLineId: TrackByFunction<BoxPlotControlLine> = (index, item) => item.boxPlotControlLineId;

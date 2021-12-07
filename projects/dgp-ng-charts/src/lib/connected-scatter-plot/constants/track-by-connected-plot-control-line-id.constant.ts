import { TrackByFunction } from "@angular/core";
import { ConnectedScatterPlotControlLine } from "../models";

export const trackByConnectedPlotControlLineId: TrackByFunction<ConnectedScatterPlotControlLine> = (index, item) => item.connectedScatterPlotControlLineId;

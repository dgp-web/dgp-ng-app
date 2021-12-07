import { TrackByFunction } from "@angular/core";
import { ConnectedScatterSeries } from "../models";

export const trackByConnectedScatterSeriesId: TrackByFunction<ConnectedScatterSeries> = (index, item) => item.connectedScatterSeriesId;

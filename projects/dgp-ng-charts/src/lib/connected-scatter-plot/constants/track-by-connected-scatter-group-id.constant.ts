import { TrackByFunction } from "@angular/core";
import { ConnectedScatterGroup } from "../models";

export const trackByConnectedScatterGroupId: TrackByFunction<ConnectedScatterGroup> = (index, item) => item.connectedScatterGroupId;

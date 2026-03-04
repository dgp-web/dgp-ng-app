import { TrackByFunction } from "@angular/core";
import { ItemConfiguration } from "../types";

export const trackByItemId: TrackByFunction<ItemConfiguration> = (index, item) => item.id;

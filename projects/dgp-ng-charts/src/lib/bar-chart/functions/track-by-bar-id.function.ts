import { TrackByFunction } from "@angular/core";
import { Bar } from "../models";

export const trackByBarId: TrackByFunction<Bar> = (i, x) => x.barKey;

import { TrackByFunction } from "@angular/core";
import { Bar } from "dgp-ng-charts";

export const trackByBarId: TrackByFunction<Bar> = (i, x) => x.barKey;

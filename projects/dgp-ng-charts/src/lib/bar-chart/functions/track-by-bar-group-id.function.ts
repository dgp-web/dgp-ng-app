import { TrackByFunction } from "@angular/core";
import { BarGroup } from "dgp-ng-charts";

export const trackByBarGroupId: TrackByFunction<BarGroup> = (i, x) => x.barGroupKey;

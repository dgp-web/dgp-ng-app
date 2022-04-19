import { TrackByFunction } from "@angular/core";
import { BarGroup } from "../models";

export const trackByBarGroupId: TrackByFunction<BarGroup> = (i, x) => x.barGroupKey;

import { TrackByFunction } from "@angular/core";
import { BoxGroup } from "../models";

export const trackByBoxGroupId: TrackByFunction<BoxGroup> = (index, item) => item.boxGroupId;

import { TrackByFunction } from "@angular/core";
import { Box } from "../models";

export const trackByBoxId: TrackByFunction<Box> = (index, item) => item.boxGroupId + "." + item.boxId;

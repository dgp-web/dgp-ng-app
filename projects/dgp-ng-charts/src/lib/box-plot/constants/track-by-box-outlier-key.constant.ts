import { TrackByFunction } from "@angular/core";
import { BoxOutlierId } from "../models";

export const trackByBoxOutlierKey: TrackByFunction<BoxOutlierId> = (index, item) => item.boxGroupId + "." + item.boxId + "." + item.outlierIndex;

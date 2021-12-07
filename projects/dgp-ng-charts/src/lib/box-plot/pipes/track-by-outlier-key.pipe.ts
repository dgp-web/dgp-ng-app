import { Pipe, PipeTransform, TrackByFunction } from "@angular/core";
import { Box } from "../models";
import { trackByBoxOutlierKey } from "../constants";

@Pipe({name: "trackByOutlierKey"})
export class TrackByOutlierKeyPipe implements PipeTransform {

    transform<T>(box: Box): TrackByFunction<number> {
        return (outlierIndex: number, outlierValue: number) => {
            return trackByBoxOutlierKey(outlierIndex, {
                boxId: box.boxId, boxGroupId: box.boxGroupId, outlierIndex
            });
        };
    }
}

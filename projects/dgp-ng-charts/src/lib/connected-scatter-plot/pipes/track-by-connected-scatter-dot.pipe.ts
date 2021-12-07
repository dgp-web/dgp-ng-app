import { Pipe, PipeTransform, TrackByFunction } from "@angular/core";
import { ConnectedScatterSeries } from "../models";
import { Point } from "../../shapes/models";

@Pipe({name: "trackByConnectedScatterDot"})
export class TrackByConnectedScatterDotPipe implements PipeTransform {

    transform<T>(series: ConnectedScatterSeries): TrackByFunction<any> {
        return (outlierIndex: number, item: Point) => {
            return series.connectedScatterSeriesId + "." + outlierIndex;
        };
    }
}

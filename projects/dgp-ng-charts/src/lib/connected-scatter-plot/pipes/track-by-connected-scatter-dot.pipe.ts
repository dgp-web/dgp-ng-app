import { Pipe, PipeTransform, TrackByFunction } from "@angular/core";
import { ConnectedScatterSeries, Dot } from "../models";

@Pipe({name: "trackByConnectedScatterDot"})
export class TrackByConnectedScatterDotPipe implements PipeTransform {

    transform<T>(series: ConnectedScatterSeries): TrackByFunction<Dot> {
        return (index: number, item: Dot) => {
            return series.connectedScatterSeriesId + "." + index;
        };
    }
}

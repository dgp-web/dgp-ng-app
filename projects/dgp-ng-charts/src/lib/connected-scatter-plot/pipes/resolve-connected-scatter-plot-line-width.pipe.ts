import { Pipe, PipeTransform } from "@angular/core";
import { resolveConnectedScatterPlotLineWidth } from "../functions/resolve-connected-scatter-plot-line-width.function";

@Pipe({
    name: "resolveConnectedScatterPlotLineWidth"
})
export class ResolveConnectedScatterPlotLineWidthPipe implements PipeTransform {

    transform(lineWidth?: number, ...args: any[]): number {
        return resolveConnectedScatterPlotLineWidth(lineWidth);
    }

}

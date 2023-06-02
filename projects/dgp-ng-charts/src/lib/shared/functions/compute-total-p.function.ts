import { ConnectedScatterPlotModel } from "../../connected-scatter-plot/models";
import { P } from "../models";
import { byUnique, matrixToMany } from "dgp-ng-app";
import { fromPercent } from "./from-percent.function";

export function computeTotalP(payload: ConnectedScatterPlotModel): P {
    return payload.map(x => x.series)
        .reduce(matrixToMany, [])
        .map(x => x.dots)
        .reduce(matrixToMany, [])
        .map(x => x.y)
        .map(fromPercent)
        .filter(byUnique)
        .sort();
}


export function computeProbabilityChartDomain(payload: ConnectedScatterPlotModel): [number, number] {
    const totalDomainValues = payload.map(x => x.series)
        .reduce(matrixToMany, [])
        .map(x => x.dots)
        .reduce(matrixToMany, [])
        .map(x => x.x);

    const min = Math.min(...totalDomainValues);
    const max = Math.max(...totalDomainValues);

    return [min, max];

}

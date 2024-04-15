import { ConnectedScatterPlotModel } from "../../connected-scatter-plot/models";
import { P } from "../models";
import { matrixToMany } from "dgp-ng-app";
import { fromPercent } from "./from-percent.function";
import * as _ from "lodash";
import { WithNormalPlotOptimizationState } from "../../normal/optimization/models";

export function computeTotalP(payload: ConnectedScatterPlotModel & Partial<WithNormalPlotOptimizationState>): P {

    let result = payload.map(x => x.series)
        .reduce(matrixToMany, [])
        .map(x => x.dots)
        .reduce(matrixToMany, [])
        .map(x => x.y)
        .map(fromPercent);

    result = _.uniq(result);
    result = result.sort();

    return result;
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

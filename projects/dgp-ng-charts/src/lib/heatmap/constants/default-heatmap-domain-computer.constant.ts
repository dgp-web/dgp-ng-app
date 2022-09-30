import { HeatmapDomainComputer } from "../models";
import * as _ from "lodash";
import * as d3 from "d3";
import { notNullOrUndefined } from "dgp-ng-app";

export const defaultHeatmapDomainComputer: HeatmapDomainComputer = (model, overrides) => {

    const values = model.map(x => x.value);

    let min: number;
    let max: number;
    let median: number;

    min = _.min(values);
    max = _.max(values);
    median = d3.median(values);

    if (notNullOrUndefined(overrides) && notNullOrUndefined(overrides.min)) {
        min = overrides.min;
    }
    if (notNullOrUndefined(overrides) && notNullOrUndefined(overrides.median)) {
        median = overrides.median;
    }
    if (notNullOrUndefined(overrides) && notNullOrUndefined(overrides.max)) {
        max = overrides.max;
    }

    return [min, median, max];
};

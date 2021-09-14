import { Box, BoxValues } from "../models";
import * as _ from "lodash";
import { createGuid, notNullOrUndefined } from "dgp-ng-app";
import * as d3 from "d3";

export function computeBoxFromValues(payload: {
    readonly values: BoxValues;
    readonly boxId?: string;
    readonly boxGroupId?: string;
    readonly colorHex?: string;
}): Box {

    const values = _.sortBy(payload.values.originalValues)
        .filter(notNullOrUndefined);

    const lowerQuantile = d3.quantile(values, 0.25);
    const median = d3.quantile(values, 0.5);
    const upperQuantile = d3.quantile(values, 0.75);

    const interquartileRange = upperQuantile - lowerQuantile;
    // This is a special case of computing outliers
    const outlierLowerLimit = lowerQuantile - 3 * interquartileRange;
    const outlierUpperLimit = upperQuantile + 3 * interquartileRange;

    const valuesForOutlierComputation = values.filter(x =>
        x <= outlierUpperLimit && x >= outlierLowerLimit
    );

    return {
        boxId: payload.boxId || createGuid(),
        boxGroupId: payload.boxGroupId || createGuid(),
        colorHex: payload.colorHex || "#3000f0",
        boxValuesId: payload.values.boxValuesId,
        quantiles: {
            min: _.min(valuesForOutlierComputation),
            lower: lowerQuantile,
            median,
            upper: upperQuantile,
            max: _.max(valuesForOutlierComputation)
        },
        outliers: values.filter(x =>
            x > outlierUpperLimit || x < outlierLowerLimit
        )
    };

}

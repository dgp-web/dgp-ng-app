import * as d3 from "d3";
import { createGuid, notNullOrUndefined } from "dgp-ng-app";
import * as _ from "lodash";
import { Box, BoxValues } from "./models";

export function computeBoxFromValues(payload: {
    readonly values: BoxValues;
    readonly boxId?: string;
    readonly boxGroupId?: string;
}): Box {

    const values = payload.values.originalValues
        .filter(notNullOrUndefined)
        .sort();

    const lowerQuantile = d3.quantile(values, 0.25);
    const upperQuantile = d3.quantile(values, 0.75);

    const interquartileRange = upperQuantile - lowerQuantile;
    // This is a special case of computing outliers
    const outlierLowerLimit = lowerQuantile - 3 * interquartileRange;
    const outlierUpperLimit = upperQuantile + 3 * interquartileRange;

    const valuesForOutlierComputation = values.filter(x =>
        x <= outlierUpperLimit
        && x >= outlierLowerLimit
    );

    return {
        boxId: payload.boxId || createGuid(),
        boxGroupId: payload.boxGroupId || createGuid(),
        boxValuesId: payload.values.boxValuesId,
        quantiles: {
            min: _.min(valuesForOutlierComputation),
            lower: lowerQuantile,
            median: d3.median(values),
            upper: upperQuantile,
            max: _.max(valuesForOutlierComputation)
        },
        outliers: values.filter(x =>
            x > outlierUpperLimit
            || x < outlierLowerLimit
        )
    };

}

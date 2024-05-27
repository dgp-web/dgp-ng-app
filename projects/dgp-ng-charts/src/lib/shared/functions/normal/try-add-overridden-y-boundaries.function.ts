import { OverriddenYAxisBoundaries } from "../../models";
import { notNullOrUndefined } from "dgp-ng-app";
import { Many } from "data-modeling";
import * as _ from "lodash";

export function tryAddOverriddenYBoundaries(payload: {
    readonly result: Many<number>;
} & OverriddenYAxisBoundaries): Many<number> {
    let result = payload.result;

    const yAxisMin = payload.yAxisMin;
    const yAxisMax = payload.yAxisMax;

    if (notNullOrUndefined(yAxisMin)) {
        if (!result.includes(yAxisMin)) result = result.concat([yAxisMin]);
    }

    if (notNullOrUndefined(yAxisMax)) {
        if (!result.includes(yAxisMax)) result = result.concat([yAxisMax]);
    }

    result = _.sortBy(result);

    result = result.filter(tickValue => {
        if ((notNullOrUndefined(yAxisMin) && tickValue < yAxisMin)) return false;
        if ((notNullOrUndefined(yAxisMax) && tickValue > yAxisMax)) return false;
        return true;
    });

    return result;
}

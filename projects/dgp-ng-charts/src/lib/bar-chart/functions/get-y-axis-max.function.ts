import * as _ from "lodash";
import { BarGroup } from "../models";

export function getBarChartYAxisMax(payload: {
    readonly barGroups: ReadonlyArray<BarGroup>;
}): number {

    const valuesToConsider: number[] = [];

    payload.barGroups.forEach(barGroup => {

        barGroup.bars.forEach(bar => {

            let value = 0;

            value += bar.value;

            /* bar.segments.forEach(segment => {
                 value += segment.value;
             });*/

            valuesToConsider.push(value);

        });

    });

    return _.max(valuesToConsider);
}

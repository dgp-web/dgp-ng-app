import { Many } from "data-modeling";
import { toPercent } from "../to-percent.function";
import * as d3 from "d3";
import * as _ from "lodash";

export const defaultNormalYAxisTickValues = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99];

export function createNormalYAxisTickValues(payload: {
    readonly P: Many<number>;
}): Many<number> {

    const P = payload.P;

    const pLength = P.length;
    const exponent = Math.ceil(Math.log10(pLength));
    const excessTicksPerDirection = exponent - 2;

    const resolvedP = P.map(toPercent);

    const min = d3.min(resolvedP);
    const max = d3.max(resolvedP);

    let result: number[];
    if (excessTicksPerDirection > 0) {
        const excessTicks = Array.from(Array(excessTicksPerDirection)).map((x, i) => {
            const _exponent = (i + 1) + 2;
            const value = 1 / (10 ** _exponent);
            const valueP = value * 100;
            return valueP;
        });

        console.log("excessTicks", excessTicks);

        const maxExcessTicks = excessTicks.map(x => {
            return 100 - x;
        });

        console.log("maxExcessTicks", maxExcessTicks);

        result = _.sortBy(excessTicks.concat(defaultNormalYAxisTickValues).concat(maxExcessTicks));
    } else {
        result = [...defaultNormalYAxisTickValues];
    }

    /*  if (min < result[0]) {
          result.splice(0, 0, min);
      }

      if (max > result[result.length - 1]) {
          result.splice(result.length - 1, 1, max);
      }*/

    console.log(result);

    return result;
}

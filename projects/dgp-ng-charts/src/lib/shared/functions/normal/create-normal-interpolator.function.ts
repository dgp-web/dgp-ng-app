import * as d3 from "d3";
import { Many } from "data-modeling";
import { getProbabilityChartPMax } from "../probability-chart/get-probability-chart-p-max.function";
import { getProbabilityChartPMin } from "../probability-chart/get-probability-chart-p-min.function";
import { getNormalYCoordinate } from "./get-normal-y-coordinate.function";
import { computeDistance } from "../compute-distance.function";

export function createNormalInterpolator(payload: {
    readonly P?: Many<number>;
} = {}): d3.InterpolatorFactory<number, number> {
    const P = payload.P;

    const pMin = getProbabilityChartPMin({P});
    const pMax = getProbabilityChartPMax({P});

    const yMin = getNormalYCoordinate({p: pMin});
    const yMax = getNormalYCoordinate({p: pMax});

    const referenceDistance = computeDistance({target: yMin, start: yMax});

    return (rangeStart: number, rangeTarget: number) => {

        /**
         * a and b are the range boundaries
         *
         * We compute the visual middle between them which is where our median value should be placed.
         */
        const range = computeDistance({target: rangeTarget, start: rangeStart});

        return (t: number) => {
            /**
             * Note that the value t already gets transformed by d3.
             *
             * It's the computed distance of an input value between the domain boundaries.
             *
             * For us, this means that values between 0 and 100 are transformed back into values between 0 and 1.
             */
            const p = t;

            if (p === pMin) return rangeTarget;
            if (p === pMax) return rangeStart;

            const y = getNormalYCoordinate({p});
            const distance = computeDistance({
                target: y,
                start: yMax
            });
            const share = distance / referenceDistance;

            return share * range;
        };
    };

}


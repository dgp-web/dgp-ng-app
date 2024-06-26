import * as d3 from "d3";
import { Many } from "data-modeling";
import { getNormalPMax } from "./get-normal-p-max.function";
import { getNormalPMin } from "./get-normal-p-min.function";
import { getNormalYCoordinate } from "./get-normal-y-coordinate.function";
import { computeDistance } from "../compute-distance.function";
import { reverseTComputation } from "../reverse-t-computation.function";

export function createNormalInterpolatorFactory(payload: {
    readonly P?: Many<number>;
} = {}): d3.InterpolatorFactory<number, number> {
    const P = payload.P;

    const pMin = getNormalPMin({P});
    const pMax = getNormalPMax({P});

    const pMinY = getNormalYCoordinate({p: pMin});
    const pMaxY = getNormalYCoordinate({p: pMax});

    const referenceDistance = computeDistance({target: pMaxY, start: pMinY});

    return (rangeStart: number, rangeTarget: number) => {

        /**
         * a and b are the range boundaries
         *
         * We compute the visual middle between them which is where our median value should be placed.
         */
        const yPxDistance = computeDistance({target: rangeTarget, start: rangeStart});

        return (t: number) => {
            /**
             * Note that the value t already gets transformed by d3.
             *
             * It's the computed distance of an input value between the domain boundaries and always lies in [0, 100].
             *
             * For us, this means that values between 0 and 100 are transformed back into values between 0 and 1.
             */
            const p = reverseTComputation({value: t, min: pMin, max: pMax});

            if (p === pMin) return rangeTarget;
            if (p === pMax) return rangeStart;

            const pY = getNormalYCoordinate({p});
            const pYDistance = computeDistance({
                target: pMaxY,
                start: pY
            });

            const share = pYDistance / referenceDistance;

            return share * yPxDistance;
        };
    };

}


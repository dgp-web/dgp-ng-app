import * as d3 from "d3";
import { Limits } from "../box-plot/models";

export interface ComputeClipPathForContinuousAxisPayload {
    readonly configuredLimits?: Limits;
    readonly scale: d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number>;
}

export interface ComputeClipPathForContinuousAxisResult {
    readonly hasClipPath: boolean;
    /**
     * To be added to a data-root in a d3 chart like this
     * <SELECTOR-OF-YOUR-DATA-ROOT>.style("clip-path", clipPath);
     */
    readonly clipPath?: string;
}

function computeClipPathForContinuousAxis(payload: {
    readonly configuredLimits?: Limits;
    readonly scale: d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number>
}): ComputeClipPathForContinuousAxisResult {

    let topClipPath = 0;
    let bottomClipPath = 0;

    if (payload.configuredLimits.min < payload.scale.domain()[0]) {

        const valueRangeMin = payload.scale(payload.configuredLimits.min);
        const valueRangeMax = payload.scale(payload.configuredLimits.max);
        const displayedRangeMin = payload.scale(payload.scale.domain()[0]);

        const displayedDataHeight = Math.abs(
            valueRangeMax - valueRangeMin
        );

        const difference = Math.abs(valueRangeMin - displayedRangeMin);
        const differencePercent = difference / displayedDataHeight * 100;
        bottomClipPath = differencePercent;
    }

    if (payload.configuredLimits.max > payload.scale.domain()[1]) {

        const valueRangeMin = payload.scale(payload.configuredLimits.min);
        const valueRangeMax = payload.scale(payload.configuredLimits.max);
        const displayedRangeMax = payload.scale(payload.scale.domain()[1]);

        const displayedDataHeight = Math.abs(
            valueRangeMax - valueRangeMin
        );

        const difference = Math.abs(valueRangeMax - displayedRangeMax);
        const differencePercent = difference / displayedDataHeight * 100;
        topClipPath = differencePercent;
    }

    if (topClipPath !== 0 || bottomClipPath !== 0) {

        const clipPathResults = "inset(" + topClipPath + "% 0 " + (bottomClipPath) + "% 0)";

        return {
            hasClipPath: true,
            clipPath: clipPathResults
        };

    }

    return {
        hasClipPath: false
    };
}

export const contentPathComputationService = {
    computeClipPathForContinuousAxis
};

import { AxisScale } from "d3-axis";
import { fromPercent } from "../from-percent.function";
import { getNormalYCoordinate } from "./get-normal-y-coordinate.function";
import { computeDistance } from "../compute-distance.function";
import { getGaussianCumulativeDistribution } from "./get-gaussian-cumulative-distribution.function";
import { defaultNormalParameters } from "../../constants";
import { toPercent } from "../to-percent.function";

export function toNormalYDomainValueFromRangeValue(payload: {
    readonly yAxisScale: AxisScale<number>;
    readonly yRangeValue: number;
}): number {

    const yAxisScale = payload.yAxisScale;
    const yRangeValue = payload.yRangeValue;

    const yRange = yAxisScale.range();
    const yDomain = yAxisScale.domain();

    const yPxValue = yRangeValue - yRange[0];

    const yMin = yDomain[0];
    const yMax = yDomain[1];

    const pMin = fromPercent(yMin);
    const pMax = fromPercent(yMax);

    const pMinY = getNormalYCoordinate({p: pMin});
    const pMaxY = getNormalYCoordinate({p: pMax});

    const referenceDistance = computeDistance({target: pMaxY, start: pMinY});

    const pYDistance = yPxValue / (yRange[1] - yRange[0]) * referenceDistance;
    const py = pMaxY - pYDistance;
    const p = getGaussianCumulativeDistribution({...defaultNormalParameters, x: py});

    // noinspection UnnecessaryLocalVariableJS
    const yDomainValue = toPercent(p);

    return yDomainValue;
}

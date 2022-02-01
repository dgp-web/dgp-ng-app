import { AxisScale } from "d3-axis";
import { Many } from "data-modeling";

export function getLinearAxisTickValuesForInterval(payload: {
    readonly axisScale: AxisScale<number>;
    readonly tickInterval: number;
}): Many<number> {

    const axisScale = payload.axisScale;
    const tickInterval = payload.tickInterval;

    let max = axisScale.domain()[0];
    let min = axisScale.domain()[1];

    /**
     * Swap min and max if needed
     */
    if (max < min) {
        const cache = min;
        min = max;
        max = cache;
    }

    /**
     * Generate numbers between min and max
     */
    const valuesBetween = [];

    let value = min + tickInterval;

    while (value < max) {
        valuesBetween.push(value);
        value += tickInterval;
    }

    return [min, ...valuesBetween, max];
}

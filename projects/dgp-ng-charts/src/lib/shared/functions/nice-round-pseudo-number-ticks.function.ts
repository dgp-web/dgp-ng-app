import { Axis } from "d3";

export function niceRoundPseudoCategoricalNumberTicks(payload: {
    readonly xAxis: Axis<string>;
}): Axis<string> {
    const xAxis = payload.xAxis;

    return xAxis;
}

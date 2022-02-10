import * as d3 from "d3";

export function reverseDomain(payload: d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number>) {

    const reversedDomain = payload
        .domain()
        .reverse();

    payload = payload.domain(reversedDomain) as any;

    return payload;
}

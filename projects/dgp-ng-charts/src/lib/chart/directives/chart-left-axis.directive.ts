import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

import * as d3 from "d3";
import { AxisScales } from "../../shared/models";
import { estimateContinuousYAxisTickCount } from "../../shared/functions/estimate-continuous-y-axis-tick-count.function";


export function getYAxisTickDomainValues(getYAxisTickPayload: {
    readonly yAxisTickCount: number;
    readonly yAxisDomain: [number, number];
    readonly isLogarithmic?: boolean;
}): ReadonlyArray<number> {

    const values: Array<number> = [];

    const domainStart = getYAxisTickPayload.yAxisDomain[0];
    const domainEnd = getYAxisTickPayload.yAxisDomain[1];
    const totalDistance = domainEnd - domainStart;

    const tickCount = Math.ceil(getYAxisTickPayload.yAxisTickCount);

    for (let i = 0; i < tickCount; i++) {

        let distance: number;

        if (!getYAxisTickPayload.isLogarithmic) {
            distance = domainStart + totalDistance * (i / tickCount);
        } else {
            distance = i === 0 ? domainStart : Math.pow(10,
                Math.log10(domainStart) + (Math.log10(domainEnd) - Math.log10(domainStart)) * (i / tickCount)
            );

        }

        values.push(distance);

    }

    if (!values.includes(domainEnd)) values.push(domainEnd);

    return values;

}


export const superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹";

export function formatPower(power: number): string {

    return (power + "").split("")
        .map(x => superscript[x])
        .join("");
}

export function formatLogTick(value: number): string {

    if (value > Math.pow(10, 3)) {
        let power = Math.log(value) / Math.LN10;
        power = Math.round(power);
        return 10 + formatPower(power);
    } else {
        return value.toString();
    }

}

// TODO: Check if this is logarithmic
export function formatValueTick(value: number): string {
    //return value.toPrecision(3);
    return d3.format("~r")(value);
}

export const logTickValues = [
    Math.pow(10, -3),
    Math.pow(10, -2),
    Math.pow(10, -1),
    Math.pow(10, 0),
    Math.pow(10, 1),
    Math.pow(10, 2),
    Math.pow(10, 3),
    Math.pow(10, 4),
    Math.pow(10, 5),
    Math.pow(10, 7),
    Math.pow(10, 8),
    Math.pow(10, 9),
];

@Directive({selector: "[dgpChartLeftAxis]"})
export class DgpChartLeftAxisDirective implements OnChanges {

    @Input()
    scales: AxisScales;

    constructor(private readonly elementRef: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {


        if (changes.scales) {

            const yAxisTickCount = estimateContinuousYAxisTickCount({
                containerHeight: this.scales.containerHeight
            });

            const tickValues = getYAxisTickDomainValues({
                yAxisTickCount,
                yAxisDomain: [
                    this.scales.yAxis.domain()[1],
                    this.scales.yAxis.domain()[0]
                ],
                isLogarithmic: false // TODO
            });

            const axis = d3.axisLeft(this.scales.yAxis)
                .tickValues(logTickValues)
                .tickFormat(formatLogTick);
            d3.select(this.elementRef.nativeElement).call(axis);
        }

    }

}

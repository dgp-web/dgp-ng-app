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

@Directive({selector: "[dgpChartLeftAxis]"})
export class DgpChartLeftAxisDirective implements OnChanges {

    @Input()
    scales: AxisScales;

    constructor(private readonly elementRef: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        function formatValueTick(value: number): string {
            //return value.toPrecision(3);
            return d3.format("~r")(value);
        }

        if (changes.scales) {
            var superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹",
                formatPower = function (d) {
                    return (d + "").split("").map(function (c) {
                        return superscript[c];
                    }).join("");
                },
                formatTick = function (d) {
                    return 10 + formatPower(Math.round(Math.log(d) / Math.LN10));
                };

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

            /* const axis = d3.axisLeft(this.scales.yAxis)
                 .tickValues(tickValues as any)
                 .tickFormat(x => formatValueTick(x));
             d3.select(this.elementRef.nativeElement).call(axis);*/


            console.log(this.scales.yAxis.domain());
            const axis = d3.axisLeft(this.scales.yAxis)
                .tickValues([
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
                ])
                .tickFormat(formatValueTick);
            d3.select(this.elementRef.nativeElement).call(axis);
        }

    }

}

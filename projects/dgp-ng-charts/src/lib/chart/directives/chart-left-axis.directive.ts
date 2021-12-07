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


// TODO: Check if this is logarithmic
export function formatValueTick(value: number): string {
    //return value.toPrecision(3);
    return d3.format("~r")(value);
}

@Directive({selector: "[dgpChartLeftAxis]"})
export class DgpChartLeftAxisDirective implements OnChanges {

    @Input()
    scales: AxisScales;

    constructor(private readonly elementRef: ElementRef<SVGGElement>) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales) {
            this.elementRef.nativeElement.innerHTML = "";

            const yAxisTickCount = estimateContinuousYAxisTickCount({
                containerHeight: this.scales.containerHeight
            });

            const tickValues = getYAxisTickDomainValues({
                yAxisTickCount,
                yAxisDomain: [
                    this.scales.yAxisScale.domain()[1],
                    this.scales.yAxisScale.domain()[0]
                ],
                isLogarithmic: false // TODO
            });


            d3.select(this.elementRef.nativeElement).call(this.scales.yAxis);

        }

    }

}

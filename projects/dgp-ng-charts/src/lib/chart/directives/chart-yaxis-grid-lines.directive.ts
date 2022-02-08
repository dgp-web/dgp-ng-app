import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

import * as d3 from "d3";
import { ScaleLogarithmic } from "d3";
import { AxisScales, ScaleType } from "../../shared/models";
import { getMinorLogGridValues } from "../functions/get-minor-log-grid-values.function";
import { byDomain } from "../../shared/functions/by-domain.function";
import { NumericDomain } from "../../shared/models/numeric-domain.model";
import { noopTickFormat } from "../constants/noop-tick-format.constant";

@Directive({selector: "[dgpChartYAxisGridLines]"})
export class DgpChartYAxisGridLinesDirective implements OnChanges {

    @Input()
    scales: AxisScales;

    constructor(private readonly elementRef: ElementRef<SVGGElement>) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales) {
            this.elementRef.nativeElement.innerHTML = "";

            const innerTickSize = this.scales.xAxis.scale().range()[1];

            const yGridDummyAxis = this.scales.yAxis
                .tickFormat(noopTickFormat)
                .tickSizeInner(-innerTickSize);

            if (this.scales.yAxisModel.yAxisScaleType === ScaleType.Logarithmic) {
                const typedAxisScale = this.scales.yAxis.scale() as ScaleLogarithmic<number, number>;
                const base = typedAxisScale.base();
                if (base === 10) {
                    const tickValues = getMinorLogGridValues(base)
                        .filter(byDomain(typedAxisScale.domain() as NumericDomain));
                    yGridDummyAxis.tickValues(tickValues as number[]);
                }
            }

            d3.select(this.elementRef.nativeElement).call(yGridDummyAxis);


        }

    }

}


import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import * as d3 from "d3";
import { ScaleLogarithmic } from "d3";
import { AxisScales, ScaleType } from "../../shared/models";
import { noopTickFormat } from "../constants/noop-tick-format.constant";
import { getMinorLogGridValues } from "../functions/get-minor-log-grid-values.function";
import { byDomain } from "../../shared/functions/by-domain.function";
import { NumericDomain } from "../../shared/models/numeric-domain.model";

@Directive({selector: "[dgpChartXAxisGridLines]"})
export class DgpChartXAxisGridLinesDirective implements OnChanges {

    @Input()
    scales: AxisScales;

    constructor(private readonly elementRef: ElementRef<SVGGElement>,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales) {
            this.elementRef.nativeElement.innerHTML = "";

            this.renderer.setAttribute(
                this.elementRef.nativeElement,
                "transform",
                "translate(0," + this.scales.yAxisScale.range()[1] + ")"
            );
            this.elementRef.nativeElement.style.transform = "translate(0," + this.scales.yAxisScale.range()[1] + ")";

            const innerTickSize = this.scales.yAxis.scale().range()[1];

            const xGridDummyAxis = this.scales.xAxis
                .tickFormat(noopTickFormat)
                .tickSizeInner(-innerTickSize);

            if (this.scales.xAxisModel?.xAxisScaleType === ScaleType.Logarithmic) {
                const typedAxisScale = this.scales.xAxis.scale() as ScaleLogarithmic<number, number>;
                const base = typedAxisScale.base();
                if (base === 10) {
                    const tickValues = getMinorLogGridValues(base)
                        .filter(byDomain(typedAxisScale.domain() as NumericDomain));
                    xGridDummyAxis.tickValues(tickValues as number[]);
                }
            }

            d3.select(this.elementRef.nativeElement).call(xGridDummyAxis);
        }

    }

}

import { ChangeDetectionStrategy, Component, Inject, Input } from "@angular/core";
import { ID_PREFIX } from "../../shared/id-prefix-injection-token.constant";
import { AxisScales } from "../../shared/models";
import { observeAttribute$ } from "dgp-ng-app";
import { map } from "rxjs/operators";
import { getPlotRootTransform } from "../../shared/functions/get-plot-root-transform.function";
import { defaultChartConfig } from "../../shared/constants";

@Component({
    selector: "[dgpChartSVGRoot]",
    template: `
        <svg:g xmlns:svg="http://www.w3.org/2000/svg"
               [attr.clip-path]="containerAreaClipPath">
            <g [attr.transform]="containerTransform$ | async">

                <g dgpChartBottomAxis
                   [scales]="scales"></g>

                <g *ngIf="showXAxisGridLines"
                   dgpChartXAxisGridLines
                   [scales]="scales"></g>

                <g dgpChartLeftAxis
                   [scales]="scales"></g>

                <svg:g *ngIf="showYAxisGridLines"
                       dgpChartYAxisGridLines
                       [scales]="scales"></svg:g>

                <g [attr.clip-path]="dataAreaClipPath">
                    <line *ngIf="showDataAreaOutline"
                          dgpChartDataAreaOutlineTop
                          [scales]="scales"></line>
                    <line *ngIf="showDataAreaOutline"
                          dgpChartDataAreaOutlineRight
                          [scales]="scales"></line>

                    <ng-content></ng-content>
                </g>
            </g>
        </svg:g>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpChartSVGRootComponent {

    @Input()
    config = defaultChartConfig;

    @Input()
    scales: AxisScales;
    readonly scales$ = observeAttribute$(this as DgpChartSVGRootComponent, "scales");
    readonly containerTransform$ = this.scales$.pipe(map(x => x ? getPlotRootTransform(x.chartMargin) : null));

    @Input()
    showYAxisGridLines = true;

    @Input()
    showXAxisGridLines = true;

    @Input()
    showDataAreaOutline = true;

    readonly dataAreaClipPath = "url(#" + this.idPrefix + ".dataAreaClipPath" + ")";
    readonly containerAreaClipPath = "url(#" + this.idPrefix + ".containerAreaClipPath" + ")";

    constructor(
        @Inject(ID_PREFIX)
        protected readonly idPrefix: string
    ) {
    }

}

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
                    <ng-content></ng-content>
                </g>
            </g>
        </svg:g>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpChartSVGRootComponent {

    @Input()
    config = defaultChartConfig;
    readonly config$ = observeAttribute$(this as DgpChartSVGRootComponent, "config");
    readonly margin$ = this.config$.pipe(map(x => x.margin));

    readonly containerTransform$ = this.margin$.pipe(map(getPlotRootTransform));

    @Input()
    scales: AxisScales;

    @Input()
    showYAxisGridLines = true;

    @Input()
    showXAxisGridLines = true;

    readonly dataAreaClipPath = "url(#" + this.idPrefix + ".dataAreaClipPath" + ")";
    readonly containerAreaClipPath = "url(#" + this.idPrefix + ".containerAreaClipPath" + ")";

    constructor(
        @Inject(ID_PREFIX)
        protected readonly idPrefix: string
    ) {
    }

}

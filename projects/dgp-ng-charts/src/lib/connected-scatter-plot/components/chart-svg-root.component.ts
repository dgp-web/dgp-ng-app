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
        <svg:g [attr.clip-path]="containerAreaClipPath">
            <svg:g [attr.transform]="containerTransform$ | async">

                <svg:g dgpChartBottomAxis
                       [scales]="scales"></svg:g>

                <svg:g *ngIf="showXAxisGridLines"
                       dgpChartXAxisGridLines
                       [scales]="scales"></svg:g>

                <svg:g dgpChartLeftAxis
                       [scales]="scales"></svg:g>

                <svg:g *ngIf="showYAxisGridLines"
                       dgpChartYAxisGridLines
                       [scales]="scales"></svg:g>

                <svg:g [attr.clip-path]="dataAreaClipPath">
                    <ng-content></ng-content>
                </svg:g>
            </svg:g>
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

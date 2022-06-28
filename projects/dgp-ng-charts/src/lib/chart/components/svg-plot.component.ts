import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AxisScales } from "../../shared/models";
import { defaultChartConfig } from "../../shared/constants";
import { filterNotNullOrUndefined, observeAttribute$, Size } from "dgp-ng-app";
import { map } from "rxjs/operators";
import { getChartViewBox } from "../../shared/functions/get-chart-view-box.function";
import { DgpPlotComponentBase } from "./plot.component-base";

@Component({
    selector: "dgp-svg-plot",
    template: `
        <svg *ngIf="scales"
             class="chart-svg"
             [attr.viewBox]="viewBox$ | async">

            <defs>
                <clipPath dgpChartDataAreaClipPath
                          [scales]="scales"></clipPath>
                <clipPath dgpChartContainerAreaClipPath
                          [scales]="scales"></clipPath>
            </defs>
            <ng-content select="[defs]"></ng-content>

            <g dgpChartSVGRoot
               [scales]="scales"
               [config]="config"
               [showXAxisGridLines]="showXAxisGridLines"
               [showYAxisGridLines]="showYAxisGridLines">

                <ng-content></ng-content>
            </g>
        </svg>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpSvgPlotComponent extends DgpPlotComponentBase {

    @Input()
    scales: AxisScales;

    @Input()
    config = defaultChartConfig;

    @Input()
    size: Size;
    readonly size$ = observeAttribute$(this as DgpSvgPlotComponent, "size");


    readonly viewBox$ = this.size$.pipe(
        filterNotNullOrUndefined(),
        map(containerDOMRect => getChartViewBox({containerDOMRect}))
    );


}

import { Directive, ElementRef, Input, ViewChild } from "@angular/core";
import { Mutable } from "data-modeling";
import { Chart } from "../../shared/models";
import { DgpPlotContainerComponent } from "../../plot-container/components/plot-container.component";
import { filterNotNullOrUndefined, observeAttribute$ } from "dgp-ng-app";
import { map } from "rxjs/operators";
import { defaultChartConfig } from "../../shared/constants";
import { BehaviorSubject } from "rxjs";
import { getChartViewBox } from "../../shared/functions/get-chart-view-box.function";
import { getPlotRootTransform } from "../../shared/functions/get-plot-root-transform.function";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class DgpChartComponentBase implements Mutable<Chart> {

    @ViewChild(DgpPlotContainerComponent, {read: ElementRef, static: true})
    elRef: ElementRef<HTMLDivElement>;

    @Input()
    chartTitle: string;

    @Input()
    yAxisTitle: string;

    @Input()
    xAxisTitle: string;

    @Input()
    showYAxisGridLines = true;

    @Input()
    showXAxisGridLines = true;

    @Input()
    config = defaultChartConfig;
    readonly config$ = observeAttribute$(this as DgpChartComponentBase, "config");
    readonly margin$ = this.config$.pipe(map(x => x.margin));

    readonly containerDOMRect$ = new BehaviorSubject<DOMRectReadOnly>(null);

    readonly viewBox$ = this.containerDOMRect$.pipe(
        filterNotNullOrUndefined(),
        map(containerDOMRect => getChartViewBox({containerDOMRect}))
    );

    readonly containerTransform$ = this.margin$.pipe(map(getPlotRootTransform));

}

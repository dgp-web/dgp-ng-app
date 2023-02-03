import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { BehaviorSubject, combineLatest } from "rxjs";
import { debounceTime, map, shareReplay, take } from "rxjs/operators";
import { ConnectedScatterGroup, ConnectedScatterPlot, ConnectedScatterPlotControlLine } from "../models";
import { createConnectedScatterPlotScales, resolveConnectedScatterGroups } from "../functions";
import { defaultConnectedScatterPlotConfig } from "../constants";
import { filterNotNullOrUndefined, observeAttribute$, Size } from "dgp-ng-app";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";
import { DgpCardinalXYAxisChartComponentBase } from "../../chart/components/cardinal-xy-axis-chart.component-base";
import { ConnectedScatterPlotRenderer } from "../models/connected-scatter-plot-renderer.model";

@Component({
    selector: "dgp-connected-scatter-plot",
    template: `
        <dgp-chart [yAxisTitle]="yAxisTitle"
                   [xAxisTitle]="xAxisTitle"
                   [chartTitle]="chartTitle"
                   (sizeChanged)="onResize($event)">

            <ng-container right-legend>
                <ng-content select="[right-legend]"></ng-content>
            </ng-container>

            <!-- TODO: This needs some cleaning up. Passing around unneeded models and scales is weird -->
            <dgp-svg-connected-scatter-plot *ngIf="renderer === rendererEnum.SVG"
                                            [size]="size$ | async"
                                            [showXAxisGridLines]="showXAxisGridLines"
                                            [showYAxisGridLines]="showYAxisGridLines"
                                            [model]="resolvedModel$ | async"
                                            [controlLines]="controlLines"
                                            [scales]="scales$ | async"
                                            [showDotTooltips]="showDotTooltips"
                                            [showDataAreaOutline]="showDataAreaOutline"
                                            [config]="config"
                                            [dotSize]="dotSize"></dgp-svg-connected-scatter-plot>

            <dgp-hybrid-connected-scatter-plot *ngIf="renderer === rendererEnum.Hybrid"
                                               [size]="size$ | async"
                                               [showXAxisGridLines]="showXAxisGridLines"
                                               [showYAxisGridLines]="showYAxisGridLines"
                                               [model]="resolvedModel$ | async"
                                               [controlLines]="controlLines"
                                               [scales]="scales$ | async"
                                               [showDotTooltips]="showDotTooltips"
                                               [showDataAreaOutline]="showDataAreaOutline"
                                               [config]="config"
                                               [dotSize]="dotSize"></dgp-hybrid-connected-scatter-plot>

        </dgp-chart>
    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            flex-grow: 1;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        idPrefixProvider
    ]
})
export class DgpConnectedScatterPlotComponent extends DgpCardinalXYAxisChartComponentBase implements ConnectedScatterPlot {

    readonly rendererEnum = ConnectedScatterPlotRenderer;

    @Input()
    renderer = ConnectedScatterPlotRenderer.SVG;

    @Input()
    showDotTooltips = true;

    @Input()
    autoResize = true;

    @Input()
    model: readonly ConnectedScatterGroup[];
    readonly model$ = observeAttribute$(this as DgpConnectedScatterPlotComponent, "model");
    readonly resolvedModel$ = this.model$.pipe(map(resolveConnectedScatterGroups), shareReplay(1));

    @Input()
    controlLines?: ReadonlyArray<ConnectedScatterPlotControlLine>;
    readonly controlLines$ = observeAttribute$(this as DgpConnectedScatterPlotComponent, "controlLines");

    @Input()
    config = defaultConnectedScatterPlotConfig;
    readonly config$ = observeAttribute$(this as DgpConnectedScatterPlotComponent, "config");

    @Input()
    dotSize = 10;

    readonly size$ = new BehaviorSubject<Size>(null);

    readonly scales$ = combineLatest([
        this.autoResize
            ? this.size$.pipe(filterNotNullOrUndefined())
            : this.size$.pipe(filterNotNullOrUndefined(), take(1)),
        this.resolvedModel$,
        this.xAxis$,
        this.yAxis$,
        this.controlLines$,
        this.config$
    ]).pipe(
        debounceTime(0),
        map(combination => createConnectedScatterPlotScales({
            containerHeight: combination[0].height,
            containerWidth: combination[0].width,
            connectedScatterGroups: combination[1],
            ...combination[2],
            ...combination[3],
            controlLines: combination[4]
        }, combination[5])),
        shareReplay(1)
    );

    onResize(size: Size) {
        this.size$.next(size);
    }

}

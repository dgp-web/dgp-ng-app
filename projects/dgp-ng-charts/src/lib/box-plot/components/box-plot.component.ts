import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { BoxGroup, BoxPlot, BoxPlotControlLine, BoxPlotRenderer, BoxPlotSelection } from "../models";
import { debounceTime, map, shareReplay, take } from "rxjs/operators";
import { BehaviorSubject, combineLatest } from "rxjs";
import { createBoxPlotScales } from "../functions";
import { filterNotNullOrUndefined, observeAttribute$, Size } from "dgp-ng-app";
import { defaultBoxPlotConfig } from "../constants";
import { ChartSelectionMode } from "../../shared/models";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";
import { DgpCardinalYAxisChartComponentBase } from "../../chart/components/cardinal-y-axis-chart.component-base";
import { CardinalAxisTickFormat } from "../../shared/models/cardinal-axis-tick-format.model";


@Component({
    selector: "dgp-box-plot",
    template: `
        <dgp-chart [yAxisTitle]="yAxisTitle"
                   [xAxisTitle]="xAxisTitle"
                   [chartTitle]="chartTitle"
                   (sizeChanged)="onResize($event)">

            <ng-container right-legend>
                <ng-content select="[right-legend]"></ng-content>
            </ng-container>

            <dgp-svg-box-plot *ngIf="renderer === rendererEnum.SVG"
                              [showXAxisGridLines]="showXAxisGridLines"
                              [showYAxisGridLines]="showYAxisGridLines"
                              [showOutlierTooltips]="showOutlierTooltips"
                              [showDataAreaOutline]="showDataAreaOutline"
                              [controlLines]="controlLines"
                              [config]="config"
                              [dotSize]="dotSize"
                              [model]="model$ | async"
                              [scales]="scales$ | async"
                              [size]="size$ | async"></dgp-svg-box-plot>

            <dgp-hybrid-box-plot *ngIf="renderer === rendererEnum.Hybrid"
                                 [showXAxisGridLines]="showXAxisGridLines"
                                 [showYAxisGridLines]="showYAxisGridLines"
                                 [showOutlierTooltips]="showOutlierTooltips"
                                 [showDataAreaOutline]="showDataAreaOutline"
                                 [controlLines]="controlLines"
                                 [config]="config"
                                 [dotSize]="dotSize"
                                 [model]="model$ | async"
                                 [scales]="scales$ | async"
                                 [size]="size$ | async"></dgp-hybrid-box-plot>


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
export class DgpBoxPlotComponent extends DgpCardinalYAxisChartComponentBase implements BoxPlot {

    readonly rendererEnum = BoxPlotRenderer;

    @Input()
    renderer = BoxPlotRenderer.SVG;

    @Input()
    showOutlierTooltips = true;

    @Input()
    autoResize = true;

    @Input()
    model: ReadonlyArray<BoxGroup>;
    readonly model$ = observeAttribute$(this as DgpBoxPlotComponent, "model");

    @Input()
    controlLines?: ReadonlyArray<BoxPlotControlLine>;
    readonly controlLines$ = observeAttribute$(this as DgpBoxPlotComponent, "controlLines");

    @Input()
    config = defaultBoxPlotConfig;
    readonly config$ = observeAttribute$(this as DgpBoxPlotComponent, "config");

    @Input()
    selectionMode: ChartSelectionMode = "None";

    @Input()
    xAxisTickFormat?: CardinalAxisTickFormat;
    readonly xAxisTickFormat$ = observeAttribute$(this as DgpBoxPlotComponent, "xAxisTickFormat");

    @Input()
    dotSize = 10;

    @Output()
    readonly selectionChange = new EventEmitter<BoxPlotSelection>();

    readonly size$ = new BehaviorSubject<Size>(null);

    readonly scales$ = combineLatest([
        this.autoResize
            ? this.size$.pipe(filterNotNullOrUndefined())
            : this.size$.pipe(filterNotNullOrUndefined(), take(1)),
        this.model$,
        this.yAxis$,
        this.xAxisTickFormat$,
        this.controlLines$,
        this.config$
    ]).pipe(
        debounceTime(0),
        map(combination => createBoxPlotScales({
            containerHeight: combination[0].height,
            containerWidth: combination[0].width,
            boxGroups: combination[1],
            ...combination[2],
            xAxisTickFormat: combination[3],
            controlLines: combination[4]
        }, combination[5])),
        shareReplay(1)
    );

    onResize(size: Size) {
        this.size$.next(size);
    }

}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Box, BoxGroup, BoxPlot, BoxPlotControlLine, BoxPlotSelection } from "../models";
import { debounceTime, map, shareReplay, take } from "rxjs/operators";
import { BehaviorSubject, combineLatest } from "rxjs";
import { createBoxPlotScales } from "../functions";
import { filterNotNullOrUndefined, notNullOrUndefined, observeAttribute$, Size } from "dgp-ng-app";
import { defaultBoxPlotConfig, trackByBoxGroupId, trackByBoxId, trackByBoxOutlierKey, trackByBoxPlotControlLineId } from "../constants";
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
                   [scales]="scales$ | async"
                   (sizeChanged)="onResize($event)">

            <ng-container right-legend>
                <ng-content select="[right-legend]"></ng-content>
            </ng-container>

            <dgp-svg-plot [showXAxisGridLines]="showXAxisGridLines"
                          [showYAxisGridLines]="showYAxisGridLines"
                          [scales]="scales$ | async"
                          [config]="config"
                          [size]="size$ | async">

                <svg:defs xmlns:svg="http://www.w3.org/2000/svg"
                          dgpPatternAndMaskDefs></svg:defs>

                <ng-container *ngIf="scales$ | async">
                    <svg:line xmlns:svg="http://www.w3.org/2000/svg"
                              *ngFor="let controlLine of controlLines; trackBy: trackByBoxPlotControlLineId"
                              dgpBoxPlotControlLine
                              [scales]="scales$ | async"
                              [boxPlotControlLine]="controlLine"></svg:line>

                    <svg:g xmlns:svg="http://www.w3.org/2000/svg"
                           dgpBoxPlotBrushSelector
                           [scales]="scales$ | async"
                           [boxGroups]="model"
                           [config]="config"
                           [selectionMode]="selectionMode"
                           (selectionChange)="selectionChange.emit($event)"
                           [attr.clip-path]="dataAreaClipPath">

                        <g xmlns:svg="http://www.w3.org/2000/svg"
                           *ngFor="let boxGroup of model; trackBy: trackByBoxGroupId"
                           dgpBoxPlotBoxGroup
                           [boxGroup]="boxGroup"
                           [scales]="scales$ | async">
                            <ng-container *ngFor="let box of boxGroup.boxes; trackBy: trackByBoxId">
                                <line dgpBoxPlotWhisker
                                      type="max"
                                      [scales]="scales$ | async"
                                      [boxGroup]="boxGroup"
                                      [box]="box"></line>
                                <line dgpBoxPlotUpperAntenna
                                      [scales]="scales$ | async"
                                      [boxGroup]="boxGroup"
                                      [box]="box"></line>
                                <rect dgpBoxPlotBoxFillPattern
                                      [scales]="scales$ | async"
                                      [boxGroup]="boxGroup"
                                      [box]="box"></rect>
                                <rect dgpBoxPlotBox
                                      [scales]="scales$ | async"
                                      [boxGroup]="boxGroup"
                                      [box]="box"></rect>
                                <line dgpBoxPlotMedian
                                      [scales]="scales$ | async"
                                      [boxGroup]="boxGroup"
                                      [box]="box"></line>
                                <line dgpBoxPlotLowerAntenna
                                      [scales]="scales$ | async"
                                      [boxGroup]="boxGroup"
                                      [box]="box"></line>
                                <line dgpBoxPlotWhisker
                                      type="min"
                                      [scales]="scales$ | async"
                                      [boxGroup]="boxGroup"
                                      [box]="box"></line>
                            </ng-container>
                        </g>

                        <svg:g xmlns:svg="http://www.w3.org/2000/svg"
                               *ngFor="let boxGroup of model; trackBy: trackByBoxGroupId"
                               dgpBoxPlotBoxGroup
                               [boxGroup]="boxGroup"
                               [scales]="scales$ | async">
                            <ng-container *ngFor="let box of boxGroup.boxes; trackBy: trackByBoxId">
                                <ng-container
                                    *ngFor="let value of box.outliers; let i = index; trackBy: (box | trackByBoxOutlierKey)">
                                    <g *ngIf="showOutlierTooltips; else noTooltip"
                                       [matTooltip]="getOutlierTooltip(box, i)"
                                       dgpBoxPlotOutlier
                                       [scales]="scales$ | async"
                                       [boxGroup]="boxGroup"
                                       [box]="box"
                                       [value]="value"
                                       dgpDot
                                       [model]="box.outlierShape">
                                    </g>
                                    <ng-template #noTooltip>
                                        <g dgpBoxPlotOutlier
                                           [scales]="scales$ | async"
                                           [boxGroup]="boxGroup"
                                           [box]="box"
                                           [value]="value"
                                           dgpDot
                                           [model]="box.outlierShape">
                                        </g>
                                    </ng-template>

                                </ng-container>
                            </ng-container>
                        </svg:g>

                    </svg:g>
                </ng-container>

            </dgp-svg-plot>
        </dgp-chart>
    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            flex-grow: 1;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        idPrefixProvider
    ]
})
export class DgpBoxPlotComponent extends DgpCardinalYAxisChartComponentBase implements BoxPlot {

    readonly trackByBoxGroupId = trackByBoxGroupId;
    readonly trackByBoxId = trackByBoxId;
    readonly trackByBoxOutlierKey = trackByBoxOutlierKey;
    readonly trackByBoxPlotControlLineId = trackByBoxPlotControlLineId;

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

    @Input()
    selectionMode: ChartSelectionMode = "None";

    @Input()
    xAxisTickFormat?: CardinalAxisTickFormat;
    readonly xAxisTickFormat$ = observeAttribute$(this as DgpBoxPlotComponent, "xAxisTickFormat");

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
        this.controlLines$
    ]).pipe(
        debounceTime(0),
        map(combination => createBoxPlotScales({
            containerHeight: combination[0].height,
            containerWidth: combination[0].width,
            boxGroups: combination[1],
            ...combination[2],
            xAxisTickFormat: combination[3],
            controlLines: combination[4]
        })),
        shareReplay(1)
    );

    getOutlierTooltip(box: Box, outlierIndex: number): string {
        let result = "";

        if (notNullOrUndefined(box.outlierLabels) && notNullOrUndefined(box.outlierLabels[outlierIndex])) {
            result += box.outlierLabels[outlierIndex] + ": ";
        }

        result += box.outliers[outlierIndex].toPrecision(3);

        return result;
    }

    onResize(size: Size) {
        this.size$.next(size);
    }

}

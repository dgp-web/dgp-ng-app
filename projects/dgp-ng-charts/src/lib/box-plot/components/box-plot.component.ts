import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Box, BoxGroup, BoxPlot, BoxPlotControlLine, BoxPlotSelection } from "../models";
import { debounceTime, map, shareReplay } from "rxjs/operators";
import { combineLatest } from "rxjs";
import { createBoxPlotScales, getBoxOutlierSurrogateKey } from "../functions";
import { filterNotNullOrUndefined, isNullOrUndefined, notNullOrUndefined, observeAttribute$ } from "dgp-ng-app";
import { defaultBoxPlotConfig, trackByBoxGroupId, trackByBoxId, trackByBoxOutlierKey, trackByBoxPlotControlLineId } from "../constants";
import { ChartSelectionMode } from "../../shared/models";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";
import { Shape } from "../../shapes/models";
import { DgpCardinalYAxisChartComponentBase } from "../../chart/components/cardinal-y-axis-chart.component-base";

@Component({
    selector: "dgp-box-plot",
    template: `
        <dgp-chart [yAxisTitle]="yAxisTitle"
                   [xAxisTitle]="xAxisTitle"
                   [chartTitle]="chartTitle"
                   dgpResizeSensor
                   (sizeChanged)="onResize()">

            <ng-container right-legend>
                <ng-content select="[right-legend]"></ng-content>
            </ng-container>

            <dgp-plot-container>

                <svg #svgRoot
                     class="chart-svg"
                     *ngIf="model && (scales$ | async)"
                     [attr.viewBox]="viewBox$ | async">

                    <defs>
                        <!-- Patterns -->
                        <pattern dgpHorizontalLinesPattern></pattern>
                        <pattern dgpVerticalLinesPattern></pattern>
                        <pattern dgpLinesFromLeftTopToRightBottomPattern></pattern>
                        <pattern dgpLinesFromLeftBottomToRightTopPattern></pattern>
                        <pattern dgpCheckerboardPattern></pattern>
                        <pattern dgpDiagonalCheckerboardPattern></pattern>

                        <!-- Masks -->
                        <mask dgpVerticalLinesMask></mask>
                        <mask dgpHorizontalLinesMask></mask>
                        <mask dgpLinesFromLeftTopToRightBottomMask></mask>
                        <mask dgpLinesFromLeftBottomToRightTopMask></mask>
                        <mask dgpGridMask></mask>
                        <mask dgpDiagonalGridMask></mask>
                        <mask dgpCheckerboardMask></mask>
                        <mask dgpDiagonalCheckerboardMask></mask>

                        <!-- Other -->
                        <clipPath dgpChartDataAreaClipPath
                                  [scales]="scales$ | async"></clipPath>
                        <clipPath dgpChartContainerAreaClipPath
                                  [scales]="scales$ | async"></clipPath>
                    </defs>

                    <g [attr.clip-path]="containerAreaClipPath">
                        <g [attr.transform]="containerTransform$ | async">

                            <g dgpChartBottomAxis
                               [scales]="scales$ | async"></g>

                            <g *ngIf="showXAxisGridLines"
                               dgpChartXAxisGridLines
                               [scales]="scales$ | async"></g>

                            <g dgpChartLeftAxis
                               [scales]="scales$ | async"></g>

                            <g *ngIf="showYAxisGridLines"
                               dgpChartYAxisGridLines
                               [scales]="scales$ | async"></g>

                            <line *ngFor="let controlLine of controlLines; trackBy: trackByBoxPlotControlLineId"
                                  dgpBoxPlotControlLine
                                  [scales]="scales$ | async"
                                  [boxPlotControlLine]="controlLine"></line>

                            <g dgpBoxPlotBrushSelector
                               [scales]="scales$ | async"
                               [boxGroups]="model"
                               [config]="config"
                               [selectionMode]="selectionMode"
                               (selectionChange)="selectionChange.emit($event)"
                               [attr.clip-path]="dataAreaClipPath">

                                <g *ngFor="let boxGroup of model; trackBy: trackByBoxGroupId"
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

                                <g *ngFor="let boxGroup of model; trackBy: trackByBoxGroupId"
                                   dgpBoxPlotBoxGroup
                                   [boxGroup]="boxGroup"
                                   [scales]="scales$ | async">
                                    <ng-container *ngFor="let box of boxGroup.boxes; trackBy: trackByBoxId">
                                        <ng-container
                                            *ngFor="let value of box.outliers; let i = index; trackBy: (box | trackByBoxOutlierKey)">
                                            <g [matTooltip]="getOutlierTooltip(box, i)"
                                               dgpBoxPlotOutlier
                                               [scales]="scales$ | async"
                                               [boxGroup]="boxGroup"
                                               [box]="box"
                                               [value]="value"
                                               dgpDot
                                               [model]="box.outlierShape">
                                            </g>
                                        </ng-container>
                                    </ng-container>
                                </g>

                            </g>
                        </g>
                    </g>
                </svg>

            </dgp-plot-container>

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
    xAxisTickFormat?: (x: string) => string;
    readonly xAxisTickFormat$ = observeAttribute$(this as DgpBoxPlotComponent, "xAxisTickFormat");

    outlierKey: string;

    @Output()
    readonly selectionChange = new EventEmitter<BoxPlotSelection>();

    readonly shapeEnum = Shape;

    readonly scales$ = combineLatest([
        this.containerDOMRect$.pipe(filterNotNullOrUndefined()),
        this.model$,
        this.yAxis$,
        this.xAxisTickFormat$,
        this.controlLines$
    ]).pipe(
        debounceTime(250),
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

    getBoxOutlierKey(box: Box, outlierIndex: number) {
        return getBoxOutlierSurrogateKey({
            boxId: box.boxId, boxGroupId: box.boxGroupId, outlierIndex
        });
    }

    highlightOutlier(box: Box, outlierIndex: number) {
        this.outlierKey = this.getBoxOutlierKey(box, outlierIndex);
    }

    unhighlightOutlier(box: Box, value: number) {
        this.outlierKey = null;
    }

    getOutlierTooltip(box: Box, outlierIndex: number): string {
        let result = "";

        if (notNullOrUndefined(box.outlierLabels) && notNullOrUndefined(box.outlierLabels[outlierIndex])) {
            result += box.outlierLabels[outlierIndex] + ": ";
        }

        result += box.outliers[outlierIndex].toPrecision(3);

        return result;
    }

    onResize() {
        if (isNullOrUndefined(this.elRef.nativeElement)) return;
        this.containerDOMRect$.next(this.elRef.nativeElement.getBoundingClientRect());
    }

}

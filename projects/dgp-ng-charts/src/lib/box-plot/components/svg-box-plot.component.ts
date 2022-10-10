import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Box, BoxGroup, BoxPlot, BoxPlotControlLine, BoxPlotRenderer, BoxPlotScales, BoxPlotSelection } from "../models";
import { DgpCardinalYAxisChartComponentBase } from "../../chart/components/cardinal-y-axis-chart.component-base";
import { notNullOrUndefined, observeAttribute$, Size } from "dgp-ng-app";
import { defaultBoxPlotConfig, trackByBoxGroupId, trackByBoxId, trackByBoxOutlierKey, trackByBoxPlotControlLineId } from "../constants";
import { ChartSelectionMode } from "../../shared/models";
import { CardinalAxisTickFormat } from "../../shared/models/cardinal-axis-tick-format.model";

@Component({
    selector: "dgp-svg-box-plot",
    template: `
        <dgp-svg-plot [showXAxisGridLines]="showXAxisGridLines"
                      [showYAxisGridLines]="showYAxisGridLines"
                      [showDataAreaOutline]="showDataAreaOutline"
                      [scales]="scales"
                      [config]="config"
                      [size]="size">

            <svg:defs xmlns:svg="http://www.w3.org/2000/svg"
                      dgpPatternAndMaskDefs></svg:defs>

            <ng-container *ngIf="scales">
                <svg:line xmlns:svg="http://www.w3.org/2000/svg"
                          *ngFor="let controlLine of controlLines; trackBy: trackByBoxPlotControlLineId"
                          dgpBoxPlotControlLine
                          [scales]="scales"
                          [boxPlotControlLine]="controlLine"></svg:line>

                <svg:g xmlns:svg="http://www.w3.org/2000/svg"
                       dgpBoxPlotBrushSelector
                       [scales]="scales"
                       [boxGroups]="model"
                       [config]="config"
                       [selectionMode]="selectionMode"
                       (selectionChange)="selectionChange.emit($event)"
                       [attr.clip-path]="dataAreaClipPath">

                    <g xmlns:svg="http://www.w3.org/2000/svg"
                       *ngFor="let boxGroup of model; trackBy: trackByBoxGroupId"
                       dgpBoxPlotBoxGroup
                       [boxGroup]="boxGroup"
                       [scales]="scales">
                        <ng-container *ngFor="let box of boxGroup.boxes; trackBy: trackByBoxId">
                            <line dgpBoxPlotWhisker
                                  type="max"
                                  [scales]="scales"
                                  [boxGroup]="boxGroup"
                                  [box]="box"></line>
                            <line dgpBoxPlotUpperAntenna
                                  [scales]="scales"
                                  [boxGroup]="boxGroup"
                                  [box]="box"></line>
                            <rect dgpBoxPlotBoxFillPattern
                                  [scales]="scales"
                                  [boxGroup]="boxGroup"
                                  [box]="box"></rect>
                            <rect dgpBoxPlotBox
                                  [scales]="scales"
                                  [boxGroup]="boxGroup"
                                  [box]="box"></rect>
                            <line dgpBoxPlotMedian
                                  [scales]="scales"
                                  [boxGroup]="boxGroup"
                                  [box]="box"></line>
                            <line dgpBoxPlotLowerAntenna
                                  [scales]="scales"
                                  [boxGroup]="boxGroup"
                                  [box]="box"></line>
                            <line dgpBoxPlotWhisker
                                  type="min"
                                  [scales]="scales"
                                  [boxGroup]="boxGroup"
                                  [box]="box"></line>
                        </ng-container>
                    </g>

                    <svg:g xmlns:svg="http://www.w3.org/2000/svg"
                           *ngFor="let boxGroup of model; trackBy: trackByBoxGroupId"
                           dgpBoxPlotBoxGroup
                           [boxGroup]="boxGroup"
                           [scales]="scales">
                        <ng-container *ngFor="let box of boxGroup.boxes; trackBy: trackByBoxId">
                            <ng-container
                                *ngFor="let value of box.outliers; let i = index; trackBy: (box | trackByBoxOutlierKey)">
                                <g *ngIf="showOutlierTooltips; else noTooltip"
                                   [matTooltip]="getOutlierTooltip(box, i)"
                                   dgpBoxPlotOutlier
                                   [scales]="scales"
                                   [boxGroup]="boxGroup"
                                   [box]="box"
                                   [value]="value"
                                   dgpDot
                                   [model]="box.outlierShape">
                                </g>
                                <ng-template #noTooltip>
                                    <g dgpBoxPlotOutlier
                                       [scales]="scales"
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
})
export class DgpSVGBoxPlotComponent extends DgpCardinalYAxisChartComponentBase implements BoxPlot {

    readonly rendererEnum = BoxPlotRenderer;

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
    readonly model$ = observeAttribute$(this as DgpSVGBoxPlotComponent, "model");

    @Input()
    controlLines?: ReadonlyArray<BoxPlotControlLine>;
    readonly controlLines$ = observeAttribute$(this as DgpSVGBoxPlotComponent, "controlLines");

    @Input()
    config = defaultBoxPlotConfig;
    readonly config$ = observeAttribute$(this as DgpSVGBoxPlotComponent, "config");

    @Input()
    selectionMode: ChartSelectionMode = "None";

    @Input()
    xAxisTickFormat?: CardinalAxisTickFormat;
    readonly xAxisTickFormat$ = observeAttribute$(this as DgpSVGBoxPlotComponent, "xAxisTickFormat");

    @Output()
    readonly selectionChange = new EventEmitter<BoxPlotSelection>();

    @Input()
    readonly size: Size;

    @Input()
    scales: BoxPlotScales;

    getOutlierTooltip(box: Box, outlierIndex: number): string {
        let result = "";

        if (notNullOrUndefined(box.outlierLabels) && notNullOrUndefined(box.outlierLabels[outlierIndex])) {
            result += box.outlierLabels[outlierIndex] + ": ";
        }

        result += box.outliers[outlierIndex].toPrecision(3);

        return result;
    }

}

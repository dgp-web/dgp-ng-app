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
        
            @if (scales) {
              @for (controlLine of controlLines; track trackByBoxPlotControlLineId($index, controlLine)) {
                <svg:line xmlns:svg="http://www.w3.org/2000/svg"
                  dgpBoxPlotControlLine
                  [scales]="scales"
                  [boxPlotControlLine]="controlLine"></svg:line>
                }
                <svg:g xmlns:svg="http://www.w3.org/2000/svg"
                  dgpBoxPlotBrushSelector
                  [scales]="scales"
                  [boxGroups]="model"
                  [config]="config"
                  [selectionMode]="selectionMode"
                  (selectionChange)="selectionChange.emit($event)"
                  [attr.clip-path]="dataAreaClipPath">
                  @for (boxGroup of model; track trackByBoxGroupId($index, boxGroup)) {
                    <g xmlns:svg="http://www.w3.org/2000/svg"
                      dgpBoxPlotBoxGroup
                      [boxGroup]="boxGroup"
                      [scales]="scales">
                      @for (box of boxGroup.boxes; track trackByBoxId($index, box)) {
                        <ng-container>
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
                      }
                    </g>
                  }
                  @for (boxGroup of model; track trackByBoxGroupId($index, boxGroup)) {
                    <svg:g xmlns:svg="http://www.w3.org/2000/svg"
                      dgpBoxPlotBoxGroup
                      [boxGroup]="boxGroup"
                      [scales]="scales">
                      @for (box of boxGroup.boxes; track trackByBoxId($index, box)) {
                        <ng-container>
                          @for (value of box.outliers; track (box | trackByBoxOutlierKey)(i, value); let i = $index) {
                            <ng-container
                              >
                              @if (showOutlierTooltips) {
                                <g
                                  [matTooltip]="getOutlierTooltip(box, i)"
                                  dgpBoxPlotOutlier
                                  [scales]="scales"
                                  [boxGroup]="boxGroup"
                                  [box]="box"
                                  [value]="value"
                                  dgpDot
                                  [model]="box.outlierShape"
                                  [dotSize]="dotSize">
                                </g>
                              } @else {
                                <ng-template [ngTemplateOutlet]="noTooltip"></ng-template>
                              }
                              <ng-template #noTooltip>
                                <g dgpBoxPlotOutlier
                                  [scales]="scales"
                                  [boxGroup]="boxGroup"
                                  [box]="box"
                                  [value]="value"
                                  dgpDot
                                  [model]="box.outlierShape"
                                  [dotSize]="dotSize">
                                </g>
                              </ng-template>
                            </ng-container>
                          }
                        </ng-container>
                      }
                      </svg:g>
                    }
                    </svg:g>
                  }
        
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
    standalone: false
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

    @Input()
    dotSize: number;

    getOutlierTooltip(box: Box, outlierIndex: number): string {
        let result = "";

        if (notNullOrUndefined(box.outlierLabels) && notNullOrUndefined(box.outlierLabels[outlierIndex])) {
            result += box.outlierLabels[outlierIndex] + ": ";
        }

        result += box.outliers[outlierIndex].toPrecision(3);

        return result;
    }

}

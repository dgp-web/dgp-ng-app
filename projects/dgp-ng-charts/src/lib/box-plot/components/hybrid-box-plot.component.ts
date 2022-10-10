import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { DgpCardinalYAxisChartComponentBase } from "../../chart/components/cardinal-y-axis-chart.component-base";
import { Box, BoxGroup, BoxPlot, BoxPlotControlLine, BoxPlotRenderer, BoxPlotScales, BoxPlotSelection } from "../models";
import { notNullOrUndefined, observeAttribute$, Size } from "dgp-ng-app";
import { defaultBoxPlotConfig, trackByBoxGroupId, trackByBoxId, trackByBoxOutlierKey, trackByBoxPlotControlLineId } from "../constants";
import { ChartSelectionMode } from "../../shared/models";
import { CardinalAxisTickFormat } from "../../shared/models/cardinal-axis-tick-format.model";

@Component({
    selector: "dgp-hybrid-box-plot",
    template: `
        <dgp-svg-plot [showXAxisGridLines]="showXAxisGridLines"
                      [showYAxisGridLines]="showYAxisGridLines"
                      [showDataAreaOutline]="showDataAreaOutline"
                      [scales]="scales"
                      [config]="config"
                      [size]="size"></dgp-svg-plot>

        <dgp-box-plot-data-canvas *ngIf="scales"
                                  [scales]="scales"
                                  [config]="config"
                                  [model]="model"
                                  [controlLines]="controlLines"
                                  [size]="size"
                                  [showOutlierTooltips]="showOutlierTooltips"></dgp-box-plot-data-canvas>

        <!-- <div *ngIf="showOutlierTooltips && hoverEvent$.value"
              class="tooltip"
              [style.top.px]="hoverEvent$.value?.absoluteDomYPx"
              [style.left.px]="hoverEvent$.value?.absoluteDomXPx + 16">
             {{getCurrentTooltip()}}
         </div>-->


    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            flex-grow: 1;
            height: 100%;
            position: relative;
        }

        dgp-svg-plot {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        .tooltip {
            position: fixed;
            z-index: 100;
            border: 1px solid gray;
            background: #303030;
            color: white;
            padding: 8px 12px;
            display: flex;
            align-items: center;
        }

        dgp-box-plot-data-canvas {
            border-right: 1px solid inherit;
            border-top: 1px solid inherit;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpHybridBoxPlotComponent extends DgpCardinalYAxisChartComponentBase implements BoxPlot {

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
    readonly model$ = observeAttribute$(this as DgpHybridBoxPlotComponent, "model");

    @Input()
    controlLines?: ReadonlyArray<BoxPlotControlLine>;
    readonly controlLines$ = observeAttribute$(this as DgpHybridBoxPlotComponent, "controlLines");

    @Input()
    config = defaultBoxPlotConfig;
    readonly config$ = observeAttribute$(this as DgpHybridBoxPlotComponent, "config");

    @Input()
    selectionMode: ChartSelectionMode = "None";

    @Input()
    xAxisTickFormat?: CardinalAxisTickFormat;
    readonly xAxisTickFormat$ = observeAttribute$(this as DgpHybridBoxPlotComponent, "xAxisTickFormat");

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

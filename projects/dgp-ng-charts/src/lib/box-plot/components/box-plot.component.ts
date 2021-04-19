import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import * as d3 from "d3";
import { defaultBoxPlotConfig } from "../constants";
import { createBoxPlotScales, drawBoxPlot, drawBoxPlotOutliers, getOutlierXPosition, isBrushed } from "../functions";
import { Box, BoxGroup, BoxPlotConfig, BoxPlotSelection } from "../models";
import { ChartComponentBase } from "../../shared/chart.component-base";
import { ChartSelectionMode } from "../../shared/models";
import { serializeDOMNode, svgString2ImageSrc } from "../../heatmap/functions";
import { notNullOrUndefined } from "dgp-ng-app";
import { ExportChartDialogComponent } from "../../heatmap/components/export-chart-dialog.component";
import { ExportChartConfig, InternalExportChartConfig } from "../../heatmap/models";
import { MatDialog } from "@angular/material/dialog";

// TODO: Extract logic for coloring
// TODO: Extract logic for logarithmic y-axis scale

@Component({
    selector: "dgp-box-plot",
    template: `
        <dgp-chart-container>
            <div class="chart"
                 #chartRef>
                <div *ngIf="chartTitle"
                     class="title">
                    {{ chartTitle }}
                </div>

                <div class="inner-container">
                    <div *ngIf="yAxisTitle"
                         class="y-axis-label-container">
                        <div class="y-axis-label">
                            {{ yAxisTitle }}
                        </div>
                    </div>
                    <div #chartElRef
                         class="d3-hook"></div>
                    <div class="right-legend">
                        <ng-content select="[right-legend]"></ng-content>
                    </div>
                </div>

                <div *ngIf="xAxisTitle"
                     class="x-axis-label">
                    {{ xAxisTitle }}
                </div>
            </div>

            <ng-container chart-actions>

                <button mat-icon-button
                        (click)="downloadImage()"
                        matTooltip="Download image">
                    <mat-icon>image</mat-icon>
                </button>

            </ng-container>

        </dgp-chart-container>
    `,
    styles: [`
        :host {
            display: flex;
            flex-grow: 1;
            font-size: smaller;
        }

        .chart {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-grow: 1;
        }

        .title {
            justify-content: center;
            align-items: center;
            display: flex;
            margin: 16px;
            word-break: break-all;
        }

        .inner-container {
            display: flex;
            flex-grow: 1;
        }

        .y-axis-label-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 40px;
            max-width: 40px;
        }

        .y-axis-label {
            transform: rotate(-90deg);
            white-space: nowrap;
        }

        .d3-hook {
            flex-grow: 1;
            height: 100%;
        }

        .x-axis-label {
            min-height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .right-legend {
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxPlotComponent extends ChartComponentBase<ReadonlyArray<BoxGroup>, BoxPlotConfig> implements AfterViewInit {

    @Input()
    exportConfig: ExportChartConfig;

    @Output()
    readonly selectionChange = new EventEmitter<BoxPlotSelection>();

    @Input()
    selectionMode: ChartSelectionMode = "None";

    config = defaultBoxPlotConfig;
    svgNode: Node;

    constructor(
        readonly elRef: ElementRef,
        private readonly matDialog: MatDialog
    ) {
        super(elRef);
    }

    protected drawD3Chart(payload): void {
        this.svgNode = payload.svg.node().parentNode;

        const d3Scales = createBoxPlotScales({
            containerHeight: payload.containerHeight,
            containerWidth: payload.containerWidth,
            boxGroups: this.model
        });

        payload.svg.append("g")
            .attr("class", "chart__x-axis")
            .attr("transform", "translate(0," + d3Scales.yAxis.range()[1] + ")")
            .call(d3.axisBottom(d3Scales.xAxis));

        payload.svg.append("g")
            .attr("class", "chart__y-axis")
            .call(d3.axisLeft(d3Scales.yAxis));

        const onDataEnter = payload.svg.append("g")
            .attr("class", "measurement-result-root")
            .selectAll("g")
            .data(this.model as Array<BoxGroup>)
            .enter()
            .append("g")
            .attr("transform", x => "translate(" + d3Scales.xAxis(x.boxGroupId.toString()) + ",0)")
            .selectAll("rect")
            .data(x => x.boxes as Array<Box>)
            .enter();

        drawBoxPlot({d3OnGroupDataEnter: onDataEnter, d3Scales}, this.config);

        const outliers = drawBoxPlotOutliers({d3OnGroupDataEnter: onDataEnter, d3Scales}, this.config);

        // TODO: Add tooltip on mouseover

        // showTooltip
        /* outliers.on("mouseover", function(x) {

             d3.select(this)
                 .style("stroke", "black")
                 .style("opacity", 1);
         })
             .on("mouseleave", function(x) {

                 d3.select(this)
                     .style("stroke", "none")
                     .style("opacity", 0.8);
             });*/

        if (this.selectionMode === "Brush") {

            payload.svg.call(d3.brush()
                .extent([[0, 0], [payload.containerWidth, payload.containerHeight]])
                .on("start brush", () => {
                    const extent = d3.event.selection;

                    const filteredOutliers = outliers.filter(x => isBrushed(
                        extent, getOutlierXPosition(x, d3Scales, this.config),
                        d3Scales.yAxis(x.value)
                    ))
                        .data();

                    this.selectionChange.emit({
                        outliers: filteredOutliers
                    });
                })
            );
        }

    }

    async downloadImage() {
        const svgString = serializeDOMNode(this.svgNode);
        const legendRoot = $(this.elRef.nativeElement).find(".right-legend").children()[0];
        let serializedLegend: string;
        if (notNullOrUndefined(legendRoot)) {
            serializedLegend = new XMLSerializer().serializeToString(legendRoot);
        }

        const svgImageSrc = svgString2ImageSrc(svgString);

        this.matDialog.open(ExportChartDialogComponent, {
            data: {
                serializedChartImageUrl: svgImageSrc,
                serializedRightLegend: serializedLegend,

                chartTitle: this.exportConfig?.chartTitle ? this.exportConfig?.chartTitle : this.chartTitle,
                xAxisTitle: this.exportConfig?.xAxisTitle ? this.exportConfig?.xAxisTitle : this.xAxisTitle,
                yAxisTitle: this.exportConfig?.yAxisTitle ? this.exportConfig?.yAxisTitle : this.yAxisTitle
            } as InternalExportChartConfig
        });

    }
}

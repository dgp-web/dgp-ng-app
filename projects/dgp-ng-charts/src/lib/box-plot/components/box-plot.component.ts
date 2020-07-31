import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import * as d3 from "d3";
import { ChartComponentBase } from "../../shared/chart.component-base";
import { ChartSelectionMode } from "../../shared/models";
import { defaultBoxPlotConfig } from "../constants";
import { createBoxPlotScales, drawBoxPlot, drawBoxPlotOutliers, getOutlierXPosition, isBrushed } from "../functions";
import { Box, BoxGroup, BoxPlotConfig, BoxPlotSelection } from "../models";
import { d3ChartConstructionService } from "../../shared/d3-chart-construction.service";
import { d3TooltipService } from "../../shared/d3-tooltip.service";

// TODO: Extract logic for coloring
// TODO: Extract logic for logarithmic y-axis scale

@Component({
    selector: "dgp-box-plot",
    template: `
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
            </div>

            <div *ngIf="xAxisTitle"
                 class="x-axis-label">
                {{ xAxisTitle }}
            </div>
        </div>

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
            position: relative;
        }

        .x-axis-label {
            min-height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxPlotComponent extends ChartComponentBase<ReadonlyArray<BoxGroup>, BoxPlotConfig> implements AfterViewInit {

    @Output()
    readonly selectionChange = new EventEmitter<BoxPlotSelection>();

    @Input()
    selectionMode: ChartSelectionMode = "None";

    config = defaultBoxPlotConfig;

    protected drawD3Chart(payload): void {

        const d3Scales = createBoxPlotScales({
            containerHeight: payload.containerHeight,
            containerWidth: payload.containerWidth,
            boxGroups: this.model
        });

        d3ChartConstructionService.addCategoricalXAxisToChart({
            xAxisScale: d3Scales.xAxis,
            yAxisScale: d3Scales.yAxis,
            svg: payload.svg
        });

        d3ChartConstructionService.addYAxisToChart({
            yAxisScale: d3Scales.yAxis,
            svg: payload.svg
        });

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

        if (this.config.showOutlierTooltips) {

            const tooltip = d3TooltipService.createTooltip({
                nativeElement: this.chartElRef.nativeElement
            });

            const self = this;

            outliers.on("mouseover", function (x) {
                d3TooltipService.showTooltip({
                    text: self.config.outlierTooltipTextComputer(x),
                    referenceD3Element: d3.select(this),
                    tooltipD3Element: tooltip
                });
            })
                .on("mouseleave", function (x) {
                    d3TooltipService.hideTooltip({tooltipD3Element: tooltip});
                });

        }

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

}

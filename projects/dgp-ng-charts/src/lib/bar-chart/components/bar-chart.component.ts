import { ChangeDetectionStrategy, Component, ElementRef, Input } from "@angular/core";

import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { firstAsPromise, isNullOrUndefined, notNullOrUndefined } from "dgp-ng-app";
import { Bar, BarChartConfig, BarGroup, BarGroups } from "../models";
import { defaultBarChartConfig } from "../constants/default-bar-chart-config.constant";
import * as d3 from "d3";
import * as _ from "lodash";
import { getBarChartYAxisMax } from "../functions/get-y-axis-max.function";
import { DgpExportChartDialogComponent } from "./export-chart-dialog.component";
import { ExportChartConfig, InternalExportChartConfig } from "../../heatmap/models";
import { serializeDOMNode, svgString2ImageSrc } from "../../heatmap/functions";
import { ChartComponentBase, DrawD3ChartPayload } from "../../shared/chart.component-base";
import { getSmartTicks } from "../functions/get-smart-ticks.function";
import { axisTickFormattingService } from "../functions/axis-tick-formatting.service";
import { d3ChartConstructionService } from "../functions/d3-chart-construction.service";

@Component({
    selector: "dgp-bar-chart",
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
                <div class="right-legend">
                    <ng-content select="[right-legend]"></ng-content>
                </div>
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
export class DgpBarChartComponent extends ChartComponentBase<BarGroups, BarChartConfig> {

    @Input()
    barSortIndex: ReadonlyArray<string>;

    @Input()
    exportConfig: ExportChartConfig;

    config = defaultBarChartConfig;

    svgNode: Node;

    constructor(
        readonly elRef: ElementRef,
        private readonly matDialog: MatDialog
    ) {
        super(elRef);
    }

    downloadImage(): MatDialogRef<DgpExportChartDialogComponent> {
        const svgString = serializeDOMNode(this.svgNode);
        // @ts-ignore
        const legendRoot = $(this.elRef.nativeElement).find(".right-legend").children()[0];
        let serializedLegend: string;
        if (notNullOrUndefined(legendRoot)) {
            serializedLegend = new XMLSerializer().serializeToString(legendRoot);
        }

        const svgImageSrc = svgString2ImageSrc(svgString);

        return this.matDialog.open(DgpExportChartDialogComponent, {
            data: {
                serializedChartImageUrl: svgImageSrc,
                serializedLegend,

                chartTitle: this.exportConfig?.chartTitle ? this.exportConfig?.chartTitle : this.chartTitle,
                xAxisTitle: this.exportConfig?.xAxisTitle ? this.exportConfig?.xAxisTitle : this.xAxisTitle,
                yAxisTitle: this.exportConfig?.yAxisTitle ? this.exportConfig?.yAxisTitle : this.yAxisTitle
            } as InternalExportChartConfig,
            // disableClose: true
        });

    }

    async copyToClipboard() {
        const ref = this.downloadImage();
        await firstAsPromise(ref.afterOpened());
        await ref.componentInstance.copyImageToClipboard();
        ref.close();
    }

    async openInNewTab() {
        const ref = this.downloadImage();
        await firstAsPromise(ref.afterOpened());
        await ref.componentInstance.openImageInNewTab();
        ref.close();
    }

    protected drawD3Chart(payload: DrawD3ChartPayload): void {
        this.svgNode = payload.svg.node().parentNode;
        const svg = payload.svg;
        const containerWidth = payload.containerWidth;
        const containerHeight = payload.containerHeight;
        // set the dimensions and margins of the graph
        const barGroups = this.model;
        const margin = this.config.margin;
        const groupPadding = this.config.groupPadding;
        const subGroupPadding = this.config.subGroupPadding;

        const barAreaWidth = containerWidth - margin.left - margin.right;
        const barAreaHeight = containerHeight - margin.top - margin.bottom;

        let barKeys: ReadonlyArray<string>;
        if (notNullOrUndefined(this.barSortIndex)) {
            barKeys = this.barSortIndex;
        } else {
            barKeys = _.uniq(_.flatten(barGroups.map(msr => msr.bars.map(bar => bar.barKey))));
        }

        // X-axis entries
        const readoutSurrogateKeys = barGroups.map(x => x.barGroupKey);

        const yAxisMax = getBarChartYAxisMax({barGroups});

        // get the end value of Y axis and the number of ticks
        const yTicks = getSmartTicks(yAxisMax);

        // Add X axis
        const xAxis = d3.scaleBand()
            .domain(readoutSurrogateKeys)
            .range([0, barAreaWidth])
            .padding(groupPadding);

        // Add Y axis
        const yAxis = d3.scaleLinear()
            .domain([0, yAxisMax])
            .range([barAreaHeight, 0]);

        const xAxisTickValues = axisTickFormattingService.trimCategoricalXAxisTicks({
            currentXAxisValues: xAxis.domain(),
            containerWidth
        });

        d3ChartConstructionService.addCategoricalXAxisToChart({
            svg,
            xAxisTickValues,
            xAxisScale: xAxis,
            yAxisScale: yAxis,
            // tickFormatter
        }, {
            axisClass: "chart__x-axis"
        });

        svg.append("g")
            .attr("class", "chart__y-axis")
            .call(d3.axisLeft(yAxis).ticks(yTicks.count));

        // Another scale for subgroup position
        const xSubgroup = d3.scaleBand()
            .domain(barKeys)
            .range([0, xAxis.bandwidth()])
            .padding(subGroupPadding);

        const d3OnMeasurementDataEnter = svg.append("g")
            .selectAll("g")
            // Create one x-axis entry per measurement result
            .data(barGroups as Array<BarGroup>)
            .enter();

        const d3OnGroupDataEnter = d3OnMeasurementDataEnter.append("g")
            .attr("transform", (d) => {
                return "translate(" + xAxis(d.barGroupKey) + ",0)";
            })
            .selectAll("rect")
            .data((barGroup: BarGroup) => {
                return barGroup.bars as Array<Bar>;
            })
            .enter();

        // append failure bars
        d3OnGroupDataEnter
            .filter(x => !isNullOrUndefined(x.value))
            .append("rect")
            .attr("x", (d: Bar) => {
                return xSubgroup(d.barKey);
            })
            .attr("y", (d) => {
                return yAxis(d.value);
            })
            .attr("width", xSubgroup.bandwidth())
            .attr("height", (d: Bar) => {
                return barAreaHeight - yAxis(d.value);
            })
            .attr("fill", (d: Bar) => d.colorHex); //  "33";

        /*        d3OnGroupDataEnter
                    .filter(x => !isNullOrUndefined(x.failures) && x.failures > 0)
                    .append("text")
                    .attr("text-anchor", "middle")
                    .attr("fill", "#ffffff")
                    .attr("x", (d: FailureChartMeasurementSequenceResult) => {
                        return xSubgroup(d.sequenceNo + d.lotName) + xSubgroup.bandwidth() / 2;
                    })
                    .attr("y", (d) => {
                        return yAxis(d.failures) + barAreaHeight / 20;
                    })
                    .text((d: FailureChartMeasurementSequenceResult) => d.failuresLabel);*/

    }

}

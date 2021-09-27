import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { isNullOrUndefined, notNullOrUndefined } from "dgp-ng-app";
import { Bar, BarChart, BarChartScales, BarGroup, BarGroups } from "../models";
import { defaultBarChartConfig } from "../constants/default-bar-chart-config.constant";
import * as d3 from "d3";
import * as _ from "lodash";
import { getBarChartYAxisMax } from "../functions/get-y-axis-max.function";
import { ExportChartConfig } from "../../heatmap/models";
import { DrawD3ChartPayload } from "../../shared/chart.component-base";
import { getSmartTicks } from "../functions/get-smart-ticks.function";
import { axisTickFormattingService } from "../functions/axis-tick-formatting.service";
import { d3ChartConstructionService } from "../functions/d3-chart-construction.service";
import { DgpChartComponentBase } from "../../chart/components/chart.component-base";
import { Subscription } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { createBarChartScales } from "../functions/create-bar-chart-scales.function";

@Component({
    selector: "dgp-bar-chart",
    template: `

        <dgp-chart [yAxisTitle]="yAxisTitle"
                   [xAxisTitle]="xAxisTitle"
                   [chartTitle]="chartTitle">

            <ng-container chart-title>
                <ng-content select="[chart-title]"></ng-content>
            </ng-container>

            <ng-container x-axis-title>
                <ng-content select="[x-axis-title]"></ng-content>
            </ng-container>

            <ng-container y-axis-title>
                <ng-content select="[y-axis-title]"></ng-content>
            </ng-container>

            <ng-container right-legend>
                <ng-content select="[right-legend]"></ng-content>
            </ng-container>

            <div class="plot-container"
                 #chartContainer>

                <svg #svgRoot
                     dgpResizeSensor
                     (sizeChanged)="drawChart()"
                     *ngIf="barChartScales"
                     [attr.viewBox]="getViewBox()">

                    <g [attr.transform]="getContainerTransform()">

                        <g class="chart__x-axis"
                           dgpBarChartBottomAxis
                           [scales]="barChartScales"></g>

                        <g class="chart__y-axis"
                           dgpBarChartLeftAxis
                           [scales]="barChartScales"></g>

                    </g>

                </svg>

            </div>

            <!--
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
                        </div>-->

        </dgp-chart>
    `,
    styles: [`
        :host {
            display: flex;
            flex-grow: 1;
            font-size: smaller;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpBarChartComponent extends DgpChartComponentBase implements BarChart, OnChanges, OnDestroy {

    @ViewChild("chartContainer") elRef: ElementRef;

    @Input()
    model: BarGroups;

    @Input()
    barSortIndex: ReadonlyArray<string>;

    @Input()
    exportConfig: ExportChartConfig;

    @Input()
    config = defaultBarChartConfig;

    barChartScales: BarChartScales;

    private readonly drawChartActionScheduler = new EventEmitter();

    private drawChartSubscription: Subscription;


    constructor(
        private readonly cd: ChangeDetectorRef
    ) {
        super();

        this.drawChartSubscription = this.drawChartActionScheduler.pipe(
            debounceTime(250),
            tap(() => this.drawChart())
        ).subscribe();
    }

    drawChart() {

        if (isNullOrUndefined(this.elRef.nativeElement)) return;

        const rect = this.elRef.nativeElement.getBoundingClientRect() as DOMRect;

        this.drawD3Chart({
            svg: null,
            containerHeight: rect.height - this.config.margin.top - this.config.margin.bottom,
            containerWidth: rect.width - this.config.margin.left - this.config.margin.right
        });

    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes.model || changes.config || changes.selectionMode || changes.selection) {
            this.drawChartActionScheduler.emit();
        }
    }

    ngOnDestroy(): void {
        if (!this.drawChartSubscription?.closed) {
            this.drawChartSubscription?.unsubscribe();
        }
    }


    protected drawD3Chart(payload: DrawD3ChartPayload): void {

        this.barChartScales = createBarChartScales({
            containerHeight: payload.containerHeight,
            containerWidth: payload.containerWidth,
            barGroups: this.model
        });

        this.cd.markForCheck();

        const svgNode = payload.svg.node().parentNode;
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

        this.cd.markForCheck();

    }

    getContainerTransform(): string {
        return "translate(" + this.config.margin.left + " " + this.config.margin.top + ")";
    }

    getViewBox() {
        const rect = this.elRef.nativeElement.getBoundingClientRect() as DOMRect;

        const height = rect.height - this.config.margin.top - this.config.margin.bottom;
        const width = rect.width - this.config.margin.left - this.config.margin.right;

        return "0 0 " + width + " " + height;
    }
}

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { Box, BoxGroup, BoxPlot, BoxPlotScales, BoxPlotSelection } from "../models";
import { debounceTime, tap } from "rxjs/operators";
import { Subscription } from "rxjs";
import { DrawD3ChartPayload } from "../../shared/chart.component-base";
import { createBoxPlotScales, getBoxOutlierSurrogateKey } from "../functions";
import { isNullOrUndefined } from "dgp-ng-app";
import { defaultBoxPlotConfig } from "../constants";
import { ExportChartConfig } from "../../heatmap/models";
import { ChartSelectionMode } from "../../shared/models";
import { DgpChartComponentBase } from "../../chart/components/chart.component-base";

@Component({
    selector: "dgp-box-plot",
    template: `
        <dgp-chart dgpResizeSensor
                   (sizeChanged)="drawChart()"
                   [yAxisTitle]="yAxisTitle"
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

                <svg *ngIf="boxPlotScales"
                     class="chart-svg">

                    <defs>
                        <dgp-vertical-lines-pattern></dgp-vertical-lines-pattern>
                        <dgp-horizontal-lines-pattern></dgp-horizontal-lines-pattern>
                        <dgp-lines-from-left-top-to-right-bottom-pattern></dgp-lines-from-left-top-to-right-bottom-pattern>

                        <pattern id="lines-from-left-bottom-to-right-top-pattern"
                                 x="0"
                                 y="0"
                                 width="4"
                                 height="4"
                                 patternUnits="userSpaceOnUse"
                                 patternTransform="rotate(45 0 0)">
                            <rect x="0"
                                  y="0"
                                  width="1"
                                  height="4"
                                  stroke="white"
                                  stroke-width="1"/>
                        </pattern>


                        <pattern id="checkerboard-pattern"
                                 x="0"
                                 y="0"
                                 width="15"
                                 height="15"
                                 patternUnits="userSpaceOnUse">
                            <rect x="0"
                                  width="7"
                                  height="7"
                                  y="0"
                                  fill="white"></rect>
                            <rect x="7"
                                  width="7"
                                  height="7"
                                  y="7"
                                  fill="white"></rect>
                        </pattern>

                        <pattern id="diagonal-checkerboard-pattern"
                                 x="0"
                                 y="0"
                                 width="15"
                                 height="15"
                                 patternUnits="userSpaceOnUse"
                                 patternTransform="rotate(45)">
                            <rect x="0"
                                  width="7"
                                  height="7"
                                  y="0"
                                  fill="white"></rect>
                            <rect x="7"
                                  width="7"
                                  height="7"
                                  y="7"
                                  fill="white"></rect>
                        </pattern>

                        <!-- Masks -->

                        <mask id="vertical-lines-mask">
                            <rect x="0"
                                  y="0"
                                  width="100%"
                                  height="100%"
                                  fill="url(#vertical-lines-pattern)"/>
                        </mask>

                        <mask id="lines-from-left-top-to-right-bottom-mask">
                            <rect x="0"
                                  y="0"
                                  width="100%"
                                  height="100%"
                                  fill="url(#lines-from-left-top-to-right-bottom-pattern)"/>
                        </mask>

                        <mask id="horizontal-lines-mask">
                            <rect x="0"
                                  y="0"
                                  width="100%"
                                  height="100%"
                                  fill="url(#horizontal-lines-pattern)"/>
                        </mask>

                        <mask id="lines-from-left-bottom-to-right-top-mask">
                            <rect x="0"
                                  y="0"
                                  width="100%"
                                  height="100%"
                                  fill="url(#lines-from-left-bottom-to-right-top-pattern)"/>
                        </mask>

                        <mask id="grid-mask">
                            <rect x="0"
                                  y="0"
                                  width="100%"
                                  height="100%"
                                  fill="url(#horizontal-lines-pattern)"/>
                            <rect x="0"
                                  y="0"
                                  width="100%"
                                  height="100%"
                                  fill="url(#vertical-lines-pattern)"/>
                        </mask>

                        <mask id="diagonal-grid-mask">
                            <rect x="0"
                                  y="0"
                                  width="100%"
                                  height="100%"
                                  stroke-width="1"
                                  fill="url(#lines-from-left-bottom-to-right-top-pattern)"/>
                            <rect x="0"
                                  y="0"
                                  width="100%"
                                  height="100%"
                                  fill="url(#lines-from-left-top-to-right-bottom-pattern)"/>
                        </mask>

                        <mask id="checkerboard-mask">
                            <rect x="0"
                                  y="0"
                                  width="100%"
                                  height="100%"
                                  fill="url(#checkerboard-pattern)"/>
                        </mask>

                        <mask id="diagonal-checkerboard-mask">
                            <rect x="0"
                                  y="0"
                                  width="100%"
                                  height="100%"
                                  fill="url(#diagonal-checkerboard-pattern)"/>
                        </mask>

                    </defs>

                    <g [attr.transform]="getContainerTransform()">

                        <g class="chart__x-axis"
                           dgpBoxPlotBottomAxis
                           [scales]="boxPlotScales"></g>

                        <g class="chart__y-axis"
                           dgpBoxPlotLeftAxis
                           [scales]="boxPlotScales"></g>

                        <g class="measurement-result-root"
                           dgpBoxPlotBrushSelector
                           [scales]="boxPlotScales"
                           [boxGroups]="model"
                           [config]="config"
                           [selectionMode]="selectionMode"
                           (selectionChange)="selectionChange.emit($event)">
                            <g *ngFor="let boxGroup of model"
                               [attr.transform]="getResultRootTransform(boxGroup)">
                                <ng-container *ngFor="let box of boxGroup.boxes">
                                    <line dgpBoxPlotWhisker
                                          type="max"
                                          [scales]="boxPlotScales"
                                          [boxGroup]="boxGroup"
                                          [box]="box"></line>
                                    <line dgpBoxPlotUpperAntenna
                                          [scales]="boxPlotScales"
                                          [boxGroup]="boxGroup"
                                          [box]="box"></line>
                                    <rect dgpBoxPlotBoxFillPattern
                                          [scales]="boxPlotScales"
                                          [boxGroup]="boxGroup"
                                          [box]="box"></rect>
                                    <rect dgpBoxPlotBox
                                          [scales]="boxPlotScales"
                                          [boxGroup]="boxGroup"
                                          [box]="box"></rect>
                                    <line dgpBoxPlotMedian
                                          [scales]="boxPlotScales"
                                          [boxGroup]="boxGroup"
                                          [box]="box"></line>
                                    <line dgpBoxPlotLowerAntenna
                                          [scales]="boxPlotScales"
                                          [boxGroup]="boxGroup"
                                          [box]="box"></line>
                                    <line dgpBoxPlotWhisker
                                          type="min"
                                          [scales]="boxPlotScales"
                                          [boxGroup]="boxGroup"
                                          [box]="box"></line>

                                    <circle *ngFor="let value of box.outliers; let i = index;"
                                            r="3"
                                            dgpBoxPlotOutlier
                                            [scales]="boxPlotScales"
                                            [boxGroup]="boxGroup"
                                            [box]="box"
                                            [value]="value"
                                            (focus)="highlightOutlier(box, i)"
                                            (mouseenter)="highlightOutlier(box, i)"
                                            (blur)="unhighlightOutlier(box, i)"
                                            (mouseleave)="unhighlightOutlier(box, i)"></circle>

                                    <text *ngFor="let value of box.outliers let i = index;"
                                          class="tooltip --hidden"
                                          [class.--visible]="outlierKey === getBoxOutlierKey(box, i)"
                                          dgpBoxPlotOutlierTooltip
                                          [scales]="boxPlotScales"
                                          [boxGroup]="boxGroup"
                                          [box]="box"
                                          [value]="value">
                                        {{ value }}
                                    </text>
                                </ng-container>
                            </g>
                        </g>

                    </g>
                </svg>

            </div>

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
})
export class DgpBoxPlotComponent extends DgpChartComponentBase implements BoxPlot, OnChanges, OnDestroy {

    @ViewChild("chartContainer") elRef: ElementRef;

    @Input()
    model: ReadonlyArray<BoxGroup>;

    @Input()
    config = defaultBoxPlotConfig;

    @Input()
    selectionMode: ChartSelectionMode = "None";

    boxPlotScales: BoxPlotScales;

    private readonly drawChartActionScheduler = new EventEmitter();

    private drawChartSubscription: Subscription;

    outlierKey: string;

    @Input()
    exportConfig: ExportChartConfig;

    @Output()
    readonly selectionChange = new EventEmitter<BoxPlotSelection>();

    constructor(
        private readonly cd: ChangeDetectorRef
    ) {
        super();

        this.drawChartSubscription = this.drawChartActionScheduler.pipe(
            debounceTime(250),
            tap(() => this.drawChart())
        ).subscribe();
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

    drawD3Chart(payload: DrawD3ChartPayload): void {

        this.boxPlotScales = createBoxPlotScales({
            containerHeight: payload.containerHeight,
            containerWidth: payload.containerWidth,
            boxGroups: this.model
        });

        this.cd.markForCheck();
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

    getContainerTransform(): string {
        return "translate(" + this.config.margin.left + " " + this.config.margin.top + ")";
    }

    getResultRootTransform(boxGroup: BoxGroup) {
        return "translate(" + this.boxPlotScales.xAxis(boxGroup.boxGroupId) + ")";
    }

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
}

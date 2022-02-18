import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { Box, BoxGroup, BoxPlot, BoxPlotControlLine, BoxPlotScales, BoxPlotSelection } from "../models";
import { debounceTime, tap } from "rxjs/operators";
import { Subscription } from "rxjs";
import { DrawD3ChartPayload } from "../../shared/chart.component-base";
import { createBoxPlotScales, getBoxOutlierSurrogateKey } from "../functions";
import { isNullOrUndefined, notNullOrUndefined } from "dgp-ng-app";
import { defaultBoxPlotConfig, trackByBoxGroupId, trackByBoxId, trackByBoxOutlierKey, trackByBoxPlotControlLineId } from "../constants";
import { ExportChartConfig } from "../../heatmap/models";
import { ChartSelectionMode, ScaleType } from "../../shared/models";
import { DgpChartComponentBase } from "../../chart/components/chart.component-base";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";
import { Shape } from "../../shapes/models";
import { ID_PREFIX } from "../../shared/id-prefix-injection-token.constant";

@Component({
    selector: "dgp-box-plot",
    template: `
        <dgp-chart [yAxisTitle]="yAxisTitle"
                   [xAxisTitle]="xAxisTitle"
                   [chartTitle]="chartTitle"
                   dgpResizeSensor
                   (sizeChanged)="drawChart()">

            <ng-container right-legend>
                <ng-content select="[right-legend]"></ng-content>
            </ng-container>

            <div class="plot-container"
                 #chartContainer>

                <svg #svgRoot
                     class="chart-svg"
                     *ngIf="boxPlotScales"
                     [attr.viewBox]="getViewBox()">

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
                                  [scales]="boxPlotScales"></clipPath>
                        <clipPath dgpChartContainerAreaClipPath
                                  [scales]="boxPlotScales"></clipPath>
                    </defs>

                    <g [attr.clip-path]="getContainerAreaClipPath()">
                        <g [attr.transform]="getContainerTransform()">

                            <g class="chart__x-axis"
                               dgpChartBottomAxis
                               [scales]="boxPlotScales"></g>

                            <g *ngIf="showXAxisGridLines"
                               class="chart__x-axis-grid-lines"
                               dgpChartXAxisGridLines
                               [scales]="boxPlotScales"></g>

                            <g class="chart__y-axis"
                               dgpChartLeftAxis
                               [scales]="boxPlotScales"></g>

                            <g *ngIf="showYAxisGridLines"
                               class="chart__y-axis-grid-lines"
                               dgpChartYAxisGridLines
                               [scales]="boxPlotScales"></g>

                            <line *ngFor="let controlLine of controlLines; trackBy: trackByBoxPlotControlLineId"
                                  dgpBoxPlotControlLine
                                  [scales]="boxPlotScales"
                                  [boxPlotControlLine]="controlLine"></line>

                            <g dgpBoxPlotBrushSelector
                               [scales]="boxPlotScales"
                               [boxGroups]="model"
                               [config]="config"
                               [selectionMode]="selectionMode"
                               (selectionChange)="selectionChange.emit($event)"
                               [attr.clip-path]="getDataAreaClipPath()">

                                <g *ngFor="let boxGroup of model; trackBy: trackByBoxGroupId"
                                   [attr.transform]="getResultRootTransform(boxGroup)">
                                    <ng-container *ngFor="let box of boxGroup.boxes; trackBy: trackByBoxId">
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
                                    </ng-container>
                                </g>

                                <g *ngFor="let boxGroup of model; trackBy: trackByBoxGroupId"
                                   [attr.transform]="getResultRootTransform(boxGroup)">
                                    <ng-container *ngFor="let box of boxGroup.boxes; trackBy: trackByBoxId">
                                        <ng-container
                                            *ngFor="let value of box.outliers; let i = index; trackBy: (box | trackByBoxOutlierKey)">
                                            <g [ngSwitch]="box.outlierShape"
                                               [matTooltip]="getOutlierTooltip(box, i)"
                                               dgpBoxPlotOutlier
                                               [scales]="boxPlotScales"
                                               [boxGroup]="boxGroup"
                                               [box]="box"
                                               [value]="value">
                                                <circle *ngSwitchDefault
                                                        dgpCircle></circle>
                                                <circle *ngSwitchCase="shapeEnum.Circle"
                                                        dgpCircle></circle>
                                                <rect *ngSwitchCase="shapeEnum.Rectangle"
                                                      dgpRectangle></rect>
                                                <polygon *ngSwitchCase="shapeEnum.Rhombus"
                                                         dgpRhombus></polygon>
                                                <polygon *ngSwitchCase="shapeEnum.Star"
                                                         dgpStar></polygon>
                                                <polygon *ngSwitchCase="shapeEnum.Cross"
                                                         dgpCross></polygon>
                                                <polygon *ngSwitchCase="shapeEnum.Triangle"
                                                         dgpTriangle></polygon>
                                                <polygon *ngSwitchCase="shapeEnum.TriangleDown"
                                                         dgpTriangleDown></polygon>
                                                <polygon *ngSwitchCase="shapeEnum.TriangleRight"
                                                         dgpTriangleRight></polygon>
                                                <polygon *ngSwitchCase="shapeEnum.TriangleLeft"
                                                         dgpTriangleLeft></polygon>
                                            </g>
                                        </ng-container>
                                    </ng-container>
                                </g>

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
    providers: [
        idPrefixProvider
    ]
})
export class DgpBoxPlotComponent extends DgpChartComponentBase implements BoxPlot, OnChanges, OnDestroy {

    readonly trackByBoxGroupId = trackByBoxGroupId;
    readonly trackByBoxId = trackByBoxId;
    readonly trackByBoxOutlierKey = trackByBoxOutlierKey;
    readonly trackByBoxPlotControlLineId = trackByBoxPlotControlLineId;

    @ViewChild("chartContainer") elRef: ElementRef;

    @Input()
    model: ReadonlyArray<BoxGroup>;

    @Input()
    controlLines?: ReadonlyArray<BoxPlotControlLine>;

    @Input()
    config = defaultBoxPlotConfig;

    @Input()
    selectionMode: ChartSelectionMode = "None";

    boxPlotScales: BoxPlotScales;

    @Input()
    xAxisTickFormat?: (x: string) => string;

    @Input()
    yAxisMin?: number;

    @Input()
    yAxisMax?: number;

    @Input()
    yAxisStep?: number;

    @Input()
    yAxisScaleType?: ScaleType;

    @Input()
    showYAxisGridLines = true;

    @Input()
    showXAxisGridLines = true;

    private readonly drawChartActionScheduler = new EventEmitter();

    private drawChartSubscription: Subscription;

    outlierKey: string;

    @Input()
    exportConfig: ExportChartConfig;

    @Input()
    yAxisTickFormat?: (x: string) => string;

    @Output()
    readonly selectionChange = new EventEmitter<BoxPlotSelection>();

    readonly shapeEnum = Shape;

    constructor(
        private readonly cd: ChangeDetectorRef,
        @Inject(ID_PREFIX)
        protected readonly idPrefix: string
    ) {
        super();

        this.drawChartSubscription = this.drawChartActionScheduler.pipe(
            debounceTime(250),
            tap(() => this.drawChart())
        ).subscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.model
            || changes.config
            || changes.selectionMode
            || changes.selection
            /*            || changes.xAxisMin
                        || changes.xAxisMax
                        || changes.xAxisTicks*/
            || changes.yAxisMin
            || changes.yAxisMax
            || changes.yAxisStep
            || changes.yAxisScaleType
            || changes.controlLines
            || changes.chartTitle
            || changes.xAxisTitle
            || changes.yAxisTitle
            || changes.showXAxisGridLines
            || changes.showYAxisGridLines
            || changes.yAxisTickFormat
            || changes.xAxisTickFormat
        ) {
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
            boxGroups: this.model,
            yAxisMin: notNullOrUndefined(this.yAxisMin) ? +this.yAxisMin : undefined,
            yAxisMax: notNullOrUndefined(this.yAxisMax) ? +this.yAxisMax : undefined,
            yAxisScaleType: this.yAxisScaleType,
            controlLines: this.controlLines,
            yAxisTickFormat: this.yAxisTickFormat,
            yAxisStep: this.yAxisStep,
            xAxisTickFormat: this.xAxisTickFormat
        });

        this.cd.markForCheck();
    }

    drawChart() {

        if (isNullOrUndefined(this.elRef.nativeElement)) return;

        const rect = this.elRef.nativeElement.getBoundingClientRect() as DOMRect;

        this.drawD3Chart({
            svg: null,
            containerHeight: rect.height,
            containerWidth: rect.width
        });

    }

    getContainerTransform(): string {
        return "translate(" + this.boxPlotScales.chartMargin.left + " " + this.boxPlotScales.chartMargin.top + ")";
    }

    getResultRootTransform(boxGroup: BoxGroup) {
        return "translate(" + this.boxPlotScales.xAxisScale(boxGroup.boxGroupId) + ")";
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

    getViewBox() {
        const rect = this.elRef.nativeElement.getBoundingClientRect() as DOMRect;

        const height = rect.height;
        const width = rect.width;

        return "0 0 " + width + " " + height;
    }

    getDataAreaClipPath(): string {
        return " url(#" + this.idPrefix + ".dataAreaClipPath" + ")";
    }

    getContainerAreaClipPath(): string {
        return " url(#" + this.idPrefix + ".containerAreaClipPath" + ")";
    }

    getOutlierTooltip(box: Box, outlierIndex: number): string {
        let result = "";

        if (notNullOrUndefined(box.outlierLabels) && notNullOrUndefined(box.outlierLabels[outlierIndex])) {
            result += box.outlierLabels[outlierIndex] + ": ";
        }

        result += box.outliers[outlierIndex].toPrecision(3);

        return result;
    }

}

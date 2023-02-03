import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild
} from "@angular/core";
import { combineLatest, Subscription } from "rxjs";
import { notNullOrUndefined, observeAttribute$, Size } from "dgp-ng-app";
import { Box, BoxGroup, BoxPlotConfig, BoxPlotControlLine, BoxPlotScales } from "../models";
import { debounceTime } from "rxjs/operators";
import { mapStrokeToArray } from "../../stroke/functions";
import { Shape } from "../../shapes/models";
import { computePointsForShape } from "../../connected-scatter-plot/functions/compute-points-for-shape.function";
import { getJitter } from "../functions";
import { OutlierHoverEvent } from "../models/outlier-hover-event.model";
import { ScaleType } from "../../shared/models";
import { DotConfig } from "../../connected-scatter-plot/models";

@Component({
    selector: "dgp-box-plot-data-canvas",
    template: `
        <canvas #canvas
                [width]="scales.xAxisScale.range()[1]"
                [height]="scales.yAxisScale.range()[1]"
                [style.margin-left.px]="scales.chartMargin.left"
                [style.margin-top.px]="scales.chartMargin.top"
                [style.margin-right.px]="scales.chartMargin.right"
                [style.margin-bottom.px]="scales.chartMargin.bottom"
                (pointermove)="pointermove($event)"></canvas>
    `,
    styles: [`
        :host {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpBoxPlotDataCanvasComponent implements AfterViewInit, OnDestroy, DotConfig {

    @ViewChild("canvas", {read: ElementRef})
    canvasElementRef: ElementRef<HTMLCanvasElement>;

    private subscription: Subscription;

    @Input()
    showOutlierTooltips: boolean;

    @Input()
    scales: BoxPlotScales;
    readonly scales$ = observeAttribute$(this as DgpBoxPlotDataCanvasComponent, "scales");

    @Input()
    size: Size;
    readonly size$ = observeAttribute$(this as DgpBoxPlotDataCanvasComponent, "size");

    @Input()
    config: BoxPlotConfig;

    @Input()
    model: readonly BoxGroup[];
    readonly model$ = observeAttribute$(this as DgpBoxPlotDataCanvasComponent, "model");

    @Input()
    controlLines?: ReadonlyArray<BoxPlotControlLine>;
    readonly controlLines$ = observeAttribute$(this as DgpBoxPlotDataCanvasComponent, "controlLines");

    @Output()
    readonly outlierHovered = new EventEmitter<OutlierHoverEvent>();

    @Input()
    dotSize: number;
    readonly dotSize$ = observeAttribute$(this as DgpBoxPlotDataCanvasComponent, "dotSize");


    ngAfterViewInit(): void {
        const canvas = this.canvasElementRef.nativeElement;
        const ctx = canvas.getContext("2d");

        this.subscription = combineLatest([
            this.model$,
            this.controlLines$,
            this.size$,
            this.scales$,
            this.dotSize$
        ]).pipe(
            debounceTime(50)
        ).subscribe(combination => {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const model = combination[0];
            const controlLines = combination[1];
            const dotSize = combination[4] || 10;

            if (model) {

                model.forEach(group => {
                    group.boxes.forEach(box => {
                        ctx.fillStyle = box.colorHex;
                        ctx.strokeStyle = box.colorHex;
                        ctx.lineWidth = 1.5;

                        const groupX = this.scales.xAxisScale(group.boxGroupId);

                        /**
                         * Draw upper antenna
                         */
                        let x1 = groupX + this.scales.xAxisSubgroupKVS[group.boxGroupId](box.boxId)
                            + this.scales.xAxisSubgroupKVS[group.boxGroupId].bandwidth() / 2;
                        let x2 = x1;
                        let y1 = this.scales.yAxisScale(box.quantiles.min);
                        let y2 = this.scales.yAxisScale(box.quantiles.lower);

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();

                        /**
                         * Draw lower antenna
                         */
                        x1 = groupX + this.scales.xAxisSubgroupKVS[group.boxGroupId](box.boxId)
                            + this.scales.xAxisSubgroupKVS[group.boxGroupId].bandwidth() / 2;
                        x2 = x1;
                        y1 = this.scales.yAxisScale(box.quantiles.upper);
                        y2 = this.scales.yAxisScale(box.quantiles.max);

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();

                        /**
                         * Upper whisker
                         */
                        x1 = groupX + this.scales.xAxisSubgroupKVS[group.boxGroupId](box.boxId)
                            + this.scales.xAxisSubgroupKVS[group.boxGroupId].bandwidth() * 0.25;
                        x2 = groupX + this.scales.xAxisSubgroupKVS[group.boxGroupId](box.boxId)
                            + this.scales.xAxisSubgroupKVS[group.boxGroupId].bandwidth() * 0.75;
                        y1 = this.scales.yAxisScale(box.quantiles.max);
                        y2 = this.scales.yAxisScale(box.quantiles.max);

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();

                        /**
                         * Lower whisker
                         */
                        x1 = groupX + this.scales.xAxisSubgroupKVS[group.boxGroupId](box.boxId)
                            + this.scales.xAxisSubgroupKVS[group.boxGroupId].bandwidth() * 0.25;
                        x2 = groupX + this.scales.xAxisSubgroupKVS[group.boxGroupId](box.boxId)
                            + this.scales.xAxisSubgroupKVS[group.boxGroupId].bandwidth() * 0.75;
                        y1 = this.scales.yAxisScale(box.quantiles.min);
                        y2 = this.scales.yAxisScale(box.quantiles.min);

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();

                        /**
                         * Median whisker
                         */
                        x1 = groupX + this.scales.xAxisSubgroupKVS[group.boxGroupId](box.boxId);
                        x2 = groupX + this.scales.xAxisSubgroupKVS[group.boxGroupId](box.boxId)
                            + this.scales.xAxisSubgroupKVS[group.boxGroupId].bandwidth();
                        y1 = this.scales.yAxisScale(box.quantiles.median);
                        y2 = this.scales.yAxisScale(box.quantiles.median);

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();

                        /**
                         * Main box
                         */
                        const x = groupX + this.scales.xAxisSubgroupKVS[group.boxGroupId](box.boxId);
                        const y = this.scales.yAxisScale(box.quantiles.upper);
                        const height = Math.abs(
                            (this.scales.yAxisScale(box.quantiles.lower) - this.scales.yAxisScale(box.quantiles.upper))
                        );
                        const width = this.scales.xAxisSubgroupKVS[group.boxGroupId].bandwidth();

                        ctx.beginPath();
                        ctx.rect(x, y, width, height);
                        ctx.stroke();

                        ctx.globalAlpha = 0.33;
                        ctx.fill();
                        ctx.globalAlpha = 1;

                        box.outliers?.forEach((outlier, outlierIndex) => {
                            ctx.beginPath();

                            switch (box.outlierShape) {
                                default:
                                case Shape.Circle:
                                    const centerX = groupX + this.scales.xAxisSubgroupKVS[group.boxGroupId](box.boxId)
                                        + this.scales.xAxisSubgroupKVS[group.boxGroupId].bandwidth() / 2
                                        + getJitter(box.boxId + outlier, this.config);
                                    const centerY = this.scales.yAxisScale(outlier);
                                    const radius = dotSize / 2;

                                    ctx.beginPath();
                                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                                    break;
                                case Shape.Rectangle:
                                    const xOutlier = groupX + this.scales.xAxisSubgroupKVS[group.boxGroupId](box.boxId)
                                        + this.scales.xAxisSubgroupKVS[group.boxGroupId].bandwidth() / 2
                                        + getJitter(box.boxId + outlier, this.config);
                                    const yOutlier = this.scales.yAxisScale(outlier) - 4;

                                    const w = dotSize - 2;
                                    const h = width;

                                    ctx.beginPath();
                                    ctx.rect(xOutlier, yOutlier, w, h);
                                    break;
                                case Shape.Star:
                                case Shape.Cross:
                                case Shape.Triangle:
                                case Shape.TriangleLeft:
                                case Shape.TriangleDown:
                                case Shape.TriangleRight:
                                case Shape.Rhombus:
                                    const size = dotSize;
                                    const halfSize = size / 2;

                                    const points = computePointsForShape({
                                        shape: box.outlierShape,
                                        width: size,
                                        height: size
                                    });

                                    points.forEach((point, index) => {


                                        const xOutlier1 = groupX + this.scales.yAxisScale(outlier) + point[0] - halfSize;
                                        // const xOutlier1 = this.scales.xAxisScale(dot.x) + point[0] - halfSize;
                                        const yOutlier1 = this.scales.yAxisScale(outlier) + point[1] - halfSize;

                                        ctx.lineTo(xOutlier1, yOutlier1);
                                    });
                                    break;
                            }


                            ctx.fill();
                            ctx.stroke();

                        });
                    });
                });

            }

            if (controlLines) {
                controlLines.forEach(controlLine => {
                    ctx.beginPath();
                    ctx.lineWidth = 1.5;


                    const y = this.scales.yAxisScale(controlLine.value);
                    const x0 = this.scales.xAxisScale.range()[0];
                    const x1 = this.scales.xAxisScale.range()[1];


                    ctx.strokeStyle = controlLine.colorHex;
                    const stroke = mapStrokeToArray(controlLine.stroke);
                    ctx.setLineDash(stroke);

                    ctx.moveTo(x0, y);
                    ctx.lineTo(x1, y);
                    ctx.stroke();

                });
            }

        });
    }

    ngOnDestroy(): void {
        if (!this.subscription?.closed) this.subscription.unsubscribe();
    }

    pointermove(e: PointerEvent) {

        if (!this.showOutlierTooltips) return;
        if (!this.model) return;


        const pointerX = e.clientX;
        const pointerY = e.clientY;

        const canvasBoundingClient = this.canvasElementRef.nativeElement.getBoundingClientRect();
        const yRange = this.scales.yAxisScale.range();
        const yDomain = this.scales.yAxisScale.domain();


        const absoluteY = pointerY - canvasBoundingClient.y;
        const yRelativeDistance = (absoluteY - yRange[0]) / (yRange[1] - yRange[0]);
        let yDomainDistance: number;
        let yTolerance: number;
        let lowerYBoundary: number;
        let upperYBoundary: number;

        if (this.scales.yAxisModel.yAxisScaleType === ScaleType.Linear) {
            yDomainDistance = yDomain[1] - yDomain[0];
            const yDomainValue = yDomain[0] + yRelativeDistance * yDomainDistance;
            yTolerance = Math.abs(yDomainDistance * 0.005);
            lowerYBoundary = yDomainValue - yTolerance;
            upperYBoundary = yDomainValue + yTolerance;
        } else if (this.scales.yAxisModel.yAxisScaleType === ScaleType.Logarithmic) {
            yDomainDistance = Math.log10(yDomain[1]) - Math.log10(yDomain[0]);
            lowerYBoundary = Math.pow(10,
                Math.log10(yDomain[0]) + yDomainDistance * yRelativeDistance + yDomainDistance * yRelativeDistance * 0.005
            );
            upperYBoundary = Math.pow(10,
                Math.log10(yDomain[0]) + yDomainDistance * yRelativeDistance - yDomainDistance * yRelativeDistance * 0.005
            );
        }

        let outlierIndex: number;
        let box: Box;
        let boxGroup: BoxGroup;

        this.model.forEach(xGroup => {
            xGroup.boxes.forEach(xSeries => {

                xSeries.outliers.forEach((outlier, xOutlierIndex) => {
                    if (outlier >= lowerYBoundary && outlier <= upperYBoundary) {

                        outlierIndex = xOutlierIndex;
                        box = xSeries;
                        boxGroup = xGroup;

                    }
                });

            });
        });


        if (notNullOrUndefined(outlierIndex)) {
            this.outlierHovered.emit({
                outlierIndex,
                box,
                boxGroup,
                absoluteDomXPx: pointerX,
                absoluteDomYPx: pointerY
            });
        } else {
            this.outlierHovered.emit(null);
        }


    }
}

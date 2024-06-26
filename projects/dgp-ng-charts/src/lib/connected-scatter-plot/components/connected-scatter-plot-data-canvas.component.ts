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
import { AxisScales } from "../../shared/models";
import {
    ConnectedScatterGroup,
    ConnectedScatterPlotChartConfig,
    ConnectedScatterPlotControlLine,
    ConnectedScatterSeries,
    Dot,
    DotHoverEvent
} from "../models";
import { observeAttribute$, Size } from "dgp-ng-app";
import { combineLatest, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { mapStrokeToArray } from "../../stroke/functions";
import { Shape } from "../../shapes/models";
import { computePointsForShape } from "../functions/compute-points-for-shape.function";
import { ControlLineAxis } from "../../stroke/models";

@Component({
    selector: "dgp-connected-scatter-plot-data-canvas",
    template: `
        <canvas #canvas
                [width]="scales.xAxisScale.range()[1]"
                [height]="scales.yAxisScale.range()[1]"
                [style.margin-left.px]="scales.chartMargin.left"
                [style.margin-top.px]="scales.chartMargin.top"
                [style.margin-right.px]="scales.chartMargin.right"
                [style.margin-bottom.px]="scales.chartMargin.bottom"
                (pointermove)="pointermove($event)"></canvas>`,
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
export class DgpConnectedScatterPlotDataCanvasComponent implements AfterViewInit, OnDestroy {

    @ViewChild("canvas", {read: ElementRef})
    canvasElementRef: ElementRef<HTMLCanvasElement>;

    private subscription: Subscription;

    @Input()
    showDotTooltips: boolean;

    @Input()
    scales: AxisScales;
    readonly scales$ = observeAttribute$(this as DgpConnectedScatterPlotDataCanvasComponent, "scales");

    @Input()
    size: Size;
    readonly size$ = observeAttribute$(this as DgpConnectedScatterPlotDataCanvasComponent, "size");

    @Input()
    config: ConnectedScatterPlotChartConfig;

    @Input()
    model: readonly ConnectedScatterGroup[];
    readonly model$ = observeAttribute$(this as DgpConnectedScatterPlotDataCanvasComponent, "model");

    @Input()
    controlLines?: ReadonlyArray<ConnectedScatterPlotControlLine>;
    readonly controlLines$ = observeAttribute$(this as DgpConnectedScatterPlotDataCanvasComponent, "controlLines");

    @Output()
    readonly dotHovered = new EventEmitter<DotHoverEvent>();

    @Input()
    dotSize: number;
    readonly dotSize$ = observeAttribute$(this as DgpConnectedScatterPlotDataCanvasComponent, "dotSize");

    @Input()
    lineWidth: number;
    readonly lineWidth$ = observeAttribute$(this as DgpConnectedScatterPlotDataCanvasComponent, "lineWidth");

    ngAfterViewInit(): void {
        const canvas = this.canvasElementRef.nativeElement;
        const ctx = canvas.getContext("2d");

        this.subscription = combineLatest([
            this.model$,
            this.controlLines$,
            this.size$,
            this.scales$,
            this.dotSize$,
            this.lineWidth$,
        ]).pipe(
            debounceTime(50)
        ).subscribe(combination => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const model = combination[0];
            const controlLines = combination[1];
            const dotSize = combination[4] || 10;
            const lineWidth = combination[5] || 1.5;

            if (model) {
                model.forEach(group => {
                    group.series.forEach(series => {
                        ctx.fillStyle = series.colorHex;
                        ctx.strokeStyle = series.colorHex;
                        ctx.lineWidth = lineWidth;

                        if (series.showVertices) {
                            series.dots.forEach(dot => {

                                ctx.beginPath();
                                switch (series.shape) {
                                    default:
                                    case Shape.Circle:
                                        const centerX = this.scales.xAxisScale(dot.x);
                                        const centerY = this.scales.yAxisScale(dot.y);
                                        const radius = dotSize / 2;

                                        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                                        break;
                                    case Shape.Rectangle:
                                        const width = dotSize - 2;
                                        const height = width;
                                        const xOffset = width / 2;
                                        const yOffset = height / 2;
                                        const x = this.scales.xAxisScale(dot.x) - xOffset;
                                        const y = this.scales.yAxisScale(dot.y) - yOffset;

                                        ctx.rect(x, y, width, height);
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
                                            shape: series.shape,
                                            width: size,
                                            height: size
                                        });

                                        points.forEach((point, index) => {
                                            const x1 = this.scales.xAxisScale(dot.x) + point[0] - halfSize;
                                            const y1 = this.scales.yAxisScale(dot.y) + point[1] - halfSize;

                                            ctx.lineTo(x1, y1);
                                        });
                                        break;
                                }

                                ctx.fill();
                            });

                            ctx.stroke();
                        }

                        if (series.showEdges) {
                            ctx.beginPath();
                            ctx.lineWidth = lineWidth;
                            const stroke = mapStrokeToArray(series.stroke);
                            ctx.setLineDash(stroke);
                            series.dots.forEach((dot, index) => {

                                const x = this.scales.xAxisScale(dot.x);
                                const y = this.scales.yAxisScale(dot.y);

                                if (index === 0) {
                                    ctx.moveTo(x, y);
                                }

                                ctx.lineTo(x, y);
                            });

                            ctx.stroke();
                        }

                    });
                });
            }

            if (controlLines) {
                controlLines.forEach(controlLine => {
                    ctx.beginPath();
                    ctx.lineWidth = lineWidth;

                    ctx.strokeStyle = controlLine.colorHex;
                    const stroke = mapStrokeToArray(controlLine.stroke);
                    ctx.setLineDash(stroke);

                    if (!controlLine.axis || controlLine.axis === ControlLineAxis.Y) {
                        const y = this.scales.yAxisScale(controlLine.value);
                        const x0 = this.scales.xAxisScale.range()[0];
                        const x1 = this.scales.xAxisScale.range()[1];

                        ctx.moveTo(x0, y);
                        ctx.lineTo(x1, y);
                    } else {
                        const x = this.scales.xAxisScale(controlLine.value);
                        const y0 = this.scales.yAxisScale.range()[0];
                        const y1 = this.scales.yAxisScale.range()[1];

                        ctx.moveTo(x, y0);
                        ctx.lineTo(x, y1);
                    }

                    ctx.stroke();

                });
            }

        });

    }

    private drawTopLine(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.lineWidth = 1.5;

        const y = this.scales.yAxisScale.range()[0];
        const x0 = this.scales.xAxisScale.range()[0];
        const x1 = this.scales.xAxisScale.range()[1];

        ctx.strokeStyle = "#ffffffff";
        const stroke = [0, 0];
        ctx.setLineDash(stroke);

        ctx.moveTo(x0, y);
        ctx.lineTo(x1, y);
        ctx.stroke();
    }

    private drawRightLine(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.lineWidth = 1.5;

        const x = this.scales.xAxisScale.range()[1];
        const y0 = this.scales.yAxisScale.range()[0];
        const y1 = this.scales.yAxisScale.range()[1];

        ctx.strokeStyle = "#ffffffff";
        const stroke = [0, 0];
        ctx.setLineDash(stroke);

        ctx.moveTo(x, y0);
        ctx.lineTo(x, y1);
        ctx.stroke();
    }

    ngOnDestroy(): void {
        if (!this.subscription?.closed) this.subscription.unsubscribe();
    }

    pointermove(e: PointerEvent) {

        if (!this.showDotTooltips) return;
        if (!this.model) return;

        const pointerX = e.clientX;
        const pointerY = e.clientY;

        const canvasBoundingClient = this.canvasElementRef.nativeElement.getBoundingClientRect();
        const xRange = this.scales.xAxisScale.range();
        const yRange = this.scales.yAxisScale.range();

        const xRangeValue = pointerX - canvasBoundingClient.x;
        const yRangeValue = pointerY - canvasBoundingClient.y;

        let dot: Dot;
        let series: ConnectedScatterSeries;
        let group: ConnectedScatterGroup;

        const yDelta = (yRange[1] - yRange[0]) * 0.005;
        const xDelta = (xRange[1] - xRange[0]) * 0.005;

        this.model.forEach(xGroup => {
            xGroup.series.forEach(xSeries => {

                xSeries.dots.forEach(xDot => {

                    const dotX = this.scales.xAxisScale(xDot.x);
                    const dotY = this.scales.yAxisScale(xDot.y);

                    const upperX = dotX + xDelta;
                    const lowerX = dotX - xDelta;

                    const upperY = dotY + yDelta;
                    const lowerY = dotY - yDelta;

                    if (xRangeValue >= lowerX && xRangeValue <= upperX
                        && yRangeValue >= lowerY && yRangeValue <= upperY) {

                        dot = xDot;
                        series = xSeries;
                        group = xGroup;

                    }
                });

            });
        });

        if (dot) {
            this.dotHovered.emit({
                dot,
                series,
                group,
                absoluteDomXPx: pointerX,
                absoluteDomYPx: pointerY
            });
        } else {
            this.dotHovered.emit(null);
        }

    }
}


import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnDestroy, ViewChild } from "@angular/core";
import { AxisScales, ScaleType } from "../../shared/models";
import { ConnectedScatterGroup, ConnectedScatterPlotConfig, ConnectedScatterPlotControlLine } from "../models";
import { matrixToMany, observeAttribute$, Size } from "dgp-ng-app";
import { combineLatest, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { mapStrokeToArray } from "../../stroke/functions";
import { Shape } from "../../shapes/models";
import { computePointsForShape } from "../functions/compute-points-for-shape.function";

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
    scales: AxisScales;
    readonly scales$ = observeAttribute$(this as DgpConnectedScatterPlotDataCanvasComponent, "scales");

    @Input()
    size: Size;
    readonly size$ = observeAttribute$(this as DgpConnectedScatterPlotDataCanvasComponent, "size");

    @Input()
    config: ConnectedScatterPlotConfig;

    @Input()
    model: readonly ConnectedScatterGroup[];
    readonly model$ = observeAttribute$(this as DgpConnectedScatterPlotDataCanvasComponent, "model");

    @Input()
    controlLines?: ReadonlyArray<ConnectedScatterPlotControlLine>;
    readonly controlLines$ = observeAttribute$(this as DgpConnectedScatterPlotDataCanvasComponent, "controlLines");

    ngAfterViewInit(): void {
        const canvas = this.canvasElementRef.nativeElement;
        const ctx = canvas.getContext("2d");

        this.subscription = combineLatest([
            this.model$,
            this.controlLines$,
            this.size$,
            this.scales$
        ]).pipe(
            debounceTime(50)
        ).subscribe(combination => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const model = combination[0];
            const controlLines = combination[1];

            if (model) {
                model.forEach(group => {
                    group.series.forEach(series => {
                        ctx.fillStyle = series.colorHex;
                        ctx.strokeStyle = series.colorHex;
                        ctx.lineWidth = 1.5;

                        if (series.showVertices) {
                            series.dots.forEach(dot => {
                                ctx.beginPath();

                                switch (series.shape) {
                                    default:
                                    case Shape.Circle:
                                        const centerX = this.scales.xAxisScale(dot.x);
                                        const centerY = this.scales.yAxisScale(dot.y);

                                        ctx.beginPath();
                                        ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI, false);
                                        break;
                                    case Shape.Rectangle:
                                        const x = this.scales.xAxisScale(dot.x) - 4;
                                        const y = this.scales.yAxisScale(dot.y) - 4;

                                        ctx.beginPath();
                                        ctx.rect(x, y, 8, 8);
                                        break;
                                    case Shape.Star:
                                    case Shape.Cross:
                                    case Shape.Triangle:
                                    case Shape.TriangleLeft:
                                    case Shape.TriangleDown:
                                    case Shape.TriangleRight:
                                    case Shape.Rhombus:
                                        const size = 10;
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
                                ctx.stroke();

                            });
                        }

                        if (series.showEdges) {
                            ctx.beginPath();
                            ctx.lineWidth = 1.5;
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

    @HostBinding("pointermove")
    pointermove(e: PointerEvent) {
        const pointerX = e.clientX;
        const pointerY = e.clientY;
        // TODO: Compute back from screen coordinates to actual chart coordinates
        // TODO: Filter all dots that the pointer is over
        // TODO: Pick the last of them which should be the one drawn on top

        const canvasBoundingClient = this.canvasElementRef.nativeElement.getBoundingClientRect();
        const xRange = this.scales.xAxisScale.range();
        const xDomain = this.scales.xAxisScale.domain();
        const yRange = this.scales.yAxisScale.range();
        const yDomain = this.scales.yAxisScale.domain();

        const absoluteX = pointerX - canvasBoundingClient.x;
        const xRelativeDistance = (absoluteX - xRange[0]) / (xRange[1] - xRange[0]);
        let xDomainDistance: number;
        let xTolerance: number;
        let lowerXBoundary: number;
        let upperXBoundary: number;

        if (this.scales.xAxisModel.xAxisScaleType === ScaleType.Linear) {
            xDomainDistance = xDomain[1] - xDomain[0];
            const xDomainValue = xDomain[0] + xRelativeDistance * xDomainDistance;
            xTolerance = Math.abs(xDomainDistance * 0.005);
            lowerXBoundary = xDomainValue - xTolerance;
            upperXBoundary = xDomainValue + xTolerance;
        } else if (this.scales.xAxisModel.xAxisScaleType === ScaleType.Logarithmic) {
            xDomainDistance = Math.log10(xDomain[1]) - Math.log10(xDomain[0]);
            lowerXBoundary = Math.pow(10,
                Math.log10(xDomain[0]) + xDomainDistance * xRelativeDistance - xDomainDistance * xRelativeDistance * 0.005
            );
            upperXBoundary = Math.pow(10,
                Math.log10(xDomain[0]) + xDomainDistance * xRelativeDistance + xDomainDistance * xRelativeDistance * 0.005
            );
        }

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

        const dots = this.model
            ? this.model.map(x => x.series)
                .reduce(matrixToMany, [])
                .map(x => x.dots)
                .reduce(matrixToMany, [])
                .filter(x => {

                    if (x.x >= lowerXBoundary
                        && x.x <= upperXBoundary
                        && x.y >= lowerYBoundary
                        && x.y <= upperYBoundary) {
                        return true;
                    }

                    return false;

                })
            : [];

        if (dots.length > 0) {
            const dot = dots[dots.length - 1];
            console.log(dot);
        } else {

        }

    }
}


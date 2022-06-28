import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { AxisScales } from "../../shared/models";
import { ConnectedScatterGroup, ConnectedScatterPlotConfig, ConnectedScatterPlotControlLine } from "../models";
import { observeAttribute$, Size } from "dgp-ng-app";
import { combineLatest, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { mapStrokeToArray } from "../../stroke/functions";

@Component({
    selector: "dgp-connected-scatter-plot-data-canvas",
    template: `
        <canvas #canvas
                [width]="scales.xAxisScale.range()[1]"
                [height]="scales.yAxisScale.range()[1]"
                [style.margin-left.px]="config.margin.left"
                [style.margin-top.px]="config.margin.top"
                [style.margin-right.px]="config.margin.right"
                [style.margin-bottom.px]="config.margin.bottom"></canvas>`,
    styles: [`
        :host {
            position: absolute;
            top: 0;
            bottom: 0;
            pointer-events: none;
            user-select: none;
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

                        if (series.showVertices) {
                            series.dots.forEach(dot => {

                                const centerX = this.scales.xAxisScale(dot.x);
                                const centerY = this.scales.yAxisScale(dot.y);

                                ctx.beginPath();
                                ctx.arc(centerX, centerY, 2.5, 0, 2 * Math.PI, false);

                                ctx.fill();
                                ctx.lineWidth = 5;
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

}

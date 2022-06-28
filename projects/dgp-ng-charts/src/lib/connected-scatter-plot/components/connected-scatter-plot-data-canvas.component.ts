import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { AxisScales } from "../../shared/models";
import { ConnectedScatterGroup, ConnectedScatterPlotConfig, ConnectedScatterPlotControlLine } from "../models";
import { observeAttribute$ } from "dgp-ng-app";
import { Subscription } from "rxjs";

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

    private modelSubscription: Subscription;
    private controlLinesSubscription: Subscription;

    @Input()
    scales: AxisScales;

    @Input()
    config: ConnectedScatterPlotConfig;

    @Input()
    model: readonly ConnectedScatterGroup[];
    readonly model$ = observeAttribute$(this as DgpConnectedScatterPlotDataCanvasComponent, "model");

    @Input()
    controlLines?: ReadonlyArray<ConnectedScatterPlotControlLine>;
    readonly controlLines$ = observeAttribute$(this as DgpConnectedScatterPlotDataCanvasComponent, "controlLines");

    ngAfterViewInit(): void {
        this.modelSubscription = this.model$.subscribe(model => {
            const canvas = this.canvasElementRef.nativeElement;
            const ctx = canvas.getContext("2d");

            if (model) {
                model.forEach(group => {
                    group.series.forEach(series => {
                        series.dots.forEach(dot => {

                            const centerX = this.scales.xAxisScale(dot.x);
                            const centerY = this.scales.yAxisScale(dot.y);

                            ctx.beginPath();
                            ctx.arc(centerX, centerY, 2.5, 0, 2 * Math.PI, false);
                            ctx.fillStyle = series.colorHex;
                            ctx.fill();
                            ctx.lineWidth = 5;
                            ctx.strokeStyle = series.colorHex;
                            ctx.stroke();
                        });

                        ctx.beginPath();
                        ctx.lineWidth = 1.5;
                        series.dots.forEach((dot, index) => {

                            const x = this.scales.xAxisScale(dot.x);
                            const y = this.scales.yAxisScale(dot.y);

                            if (index === 0) {
                                ctx.moveTo(x, y);
                            }

                            ctx.lineTo(x, y);
                        });

                        ctx.stroke();

                    });
                });
            }

        });
        this.controlLinesSubscription = this.controlLines$.subscribe(controlLines => {

        });
    }

    ngOnDestroy(): void {
        if (!this.modelSubscription?.closed) this.modelSubscription.unsubscribe();
        if (!this.controlLinesSubscription?.closed) this.controlLinesSubscription.unsubscribe();
    }

}

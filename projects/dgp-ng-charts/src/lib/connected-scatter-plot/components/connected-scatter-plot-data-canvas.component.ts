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
            const context = canvas.getContext("2d");

            if (model) {
                model.forEach(group => {
                    group.series.forEach(series => {
                        series.dots.forEach(dot => {

                            const centerX = this.scales.xAxisScale(dot.x);
                            const centerY = this.scales.yAxisScale(dot.y);

                            context.beginPath();
                            context.arc(centerX, centerY, 4, 0, 2 * Math.PI, false);
                            context.fillStyle = series.colorHex;
                            context.fill();
                            context.lineWidth = 5;
                            context.strokeStyle = series.colorHex;
                            context.stroke();
                        });

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

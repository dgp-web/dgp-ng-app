import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { combineLatest, Subscription } from "rxjs";
import { observeAttribute$, Size } from "dgp-ng-app";
import { BoxGroup, BoxPlotConfig, BoxPlotControlLine, BoxPlotScales } from "../models";
import { debounceTime } from "rxjs/operators";
import { mapStrokeToArray } from "../../stroke/functions";

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
export class DgpBoxPlotDataCanvasComponent implements AfterViewInit, OnDestroy {

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
                    group.boxes.forEach(box => {
                        ctx.fillStyle = box.colorHex;
                        ctx.strokeStyle = box.colorHex;
                        ctx.lineWidth = 1.5;

                        /**
                         * Draw some antenna
                         */
                        const x1 = this.scales.xAxisSubgroupKVS[group.boxGroupId](box.boxId)
                            + this.scales.xAxisSubgroupKVS[group.boxGroupId].bandwidth() / 2;

                        const x2 = x1;

                        const y1 = this.scales.yAxisScale(box.quantiles.min);
                        const y2 = this.scales.yAxisScale(box.quantiles.lower);

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();



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

        // TODO

    }
}

import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AxisScales } from "../../shared/models";
import { defaultConnectedScatterPlotConfig } from "../constants";
import { ConnectedScatterPlotConfig } from "../models";

@Component({
    selector: "dgp-connected-scatter-plot-data-canvas",
    template: `
        <canvas *ngIf="scales && config"
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
export class DgpConnectedScatterPlotDataCanvasComponent {

    @Input()
    scales: AxisScales;

    @Input()
    config: ConnectedScatterPlotConfig;

}

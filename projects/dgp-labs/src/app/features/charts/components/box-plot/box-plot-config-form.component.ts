import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { BoxPlot, BoxPlotConfig } from "dgp-ng-charts";

@Component({
    selector: "dgp-box-plot-config-form",
    template: `
        <dgp-cardinal-y-axis-config [model]="model"
                                    (modelChange)="setModel($event)"
                                    [disabled]="disabled"></dgp-cardinal-y-axis-config>

        <dgp-inspector>
            <dgp-inspector-section>
                <dgp-inspector-item label="Jitter width">
                    <input type="number"
                           [ngModel]="config.jitterWidth"
                           (ngModelChange)="updateJitterWidth($event)">
                </dgp-inspector-item>
            </dgp-inspector-section>
        </dgp-inspector>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxPlotConfigFormComponent extends DgpModelEditorComponentBase<BoxPlot> {

    @Input()
    config: BoxPlotConfig;

    @Output()
    readonly configChange = new EventEmitter<BoxPlotConfig>();

    updateConfig(config: Partial<BoxPlotConfig>) {
        this.config = {
            ...this.config,
            ...config
        };
        this.configChange.emit(this.config);
    }

    updateJitterWidth(jitterWidth?: number) {
        this.updateConfig({jitterWidth});
    }

}

import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { BoxPlot } from "dgp-ng-charts";

@Component({
    selector: "dgp-box-plot-config-form",
    template: `
        <dgp-cardinal-y-axis-config [model]="model"
                                    (modelChange)="setModel($event)"
                                    [disabled]="disabled"></dgp-cardinal-y-axis-config>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxPlotConfigFormComponent extends DgpModelEditorComponentBase<BoxPlot> {

}

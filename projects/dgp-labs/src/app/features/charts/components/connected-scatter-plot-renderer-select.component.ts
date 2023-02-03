import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { ConnectedScatterPlotRenderer } from "dgp-ng-charts";

@Component({
    selector: "dgp-connected-scatter-plot-renderer-select",
    template: `
        <select [disabled]="disabled"
                [ngModel]="model"
                (ngModelChange)="setModel($event)">
            <option [ngValue]="rendererEnum.SVG">
                SVG
            </option>
            <option [ngValue]="rendererEnum.Hybrid">
                Hybrid
            </option>
        </select>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectedScatterPlotRendererSelectComponent extends DgpModelEditorComponentBase<ConnectedScatterPlotRenderer> {
    readonly rendererEnum = ConnectedScatterPlotRenderer;
}

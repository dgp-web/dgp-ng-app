import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase, isNullOrUndefined } from "dgp-ng-app";
import { ConnectedScatterGroup, Shape } from "dgp-ng-charts";

@Component({
    selector: "dgp-connected-scatter-group-form",
    template: `
        <dgp-inspector>
            <dgp-inspector-item label="Shape"
                                matIconName="category">
                <dgp-shape-select [model]="model.shape"
                                  [disabled]="disabled"
                                  (modelChange)="updateShape($event)"></dgp-shape-select>
            </dgp-inspector-item>

            <dgp-inspector-item matIconName="palette"
                                label="Color">
                <input type="color"
                       [ngModel]="model.colorHex"
                       [disabled]="disabled"
                       (ngModelChange)="updateColorHex($event)">
            </dgp-inspector-item>

            <dgp-inspector-item matIconName="scatter_plot"
                                label="Show vertices">
                <input type="checkbox"
                       [ngModel]="model.showVertices"
                       [disabled]="disabled"
                       (ngModelChange)="updateShowVertices($event)">
            </dgp-inspector-item>

            <dgp-inspector-item matIconName="show_chart"
                                label="Show edges">
                <input type="checkbox"
                       [ngModel]="model.showEdges"
                       [disabled]="disabled"
                       (ngModelChange)="updateShowEdges($event)">
            </dgp-inspector-item>
        </dgp-inspector>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectedScatterGroupFormComponent extends DgpModelEditorComponentBase<ConnectedScatterGroup> {

    updateShape(shape: Shape) {
        this.updateModel({shape});
    }

    updateColorHex(colorHex: any) {
        this.updateModel({colorHex});
    }

    updateShowVertices(showVertices: boolean) {
        this.updateModel({showVertices});
    }

    updateShowEdges(showEdges: boolean) {
        this.updateModel({showEdges});
    }

    showVertices(selectedDataGroup: ConnectedScatterGroup) {
        return isNullOrUndefined(selectedDataGroup.showVertices) || selectedDataGroup.showVertices;
    }

    showEdges(selectedDataGroup: ConnectedScatterGroup) {
        return isNullOrUndefined(selectedDataGroup.showEdges) || selectedDataGroup.showEdges;
    }

}

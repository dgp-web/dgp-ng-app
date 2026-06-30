import { ChangeDetectionStrategy, Component } from "@angular/core";
import { defaultHeatmapDemoConfig } from "../../constants/heatmap/default-heatmap-demo-config.constant";
import { heatmapDemoConfigMetadata } from "../../constants/heatmap/heatmap-demo-config-metadata.constant";
import { HeatmapDemoConfig } from "../../models/heatmap/heatmap-demo-config.model";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { validateAttribute } from "data-modeling";

@Component({
    selector: "dgp-heatmap-demo-config-form",
    template: `
        <dgp-inspector [showFieldIcons]="false"
                       [responsive]="false">
            <dgp-inspector-item [metadata]="modelMetadata.attributes.rows">

                <mat-form-field [subscriptSizing]="'dynamic'">
                    <input matInput
                           type="number"
                           appIntegerOnly
                           dgpInputMetadata
                           [metadata]="modelMetadata.attributes.rows"
                           [ngModel]="model.rows"
                           [ngModelOptions]="{updateOn: 'blur'}"
                           (ngModelChange)="updateRows($event)">
                    <mat-hint>Integer between 1 and 1000</mat-hint>
                </mat-form-field>

            </dgp-inspector-item>

            <dgp-inspector-item [metadata]="modelMetadata.attributes.columns">
                <mat-form-field>
                    <input matInput
                           type="number"
                           appIntegerOnly
                           dgpInputMetadata
                           [metadata]="modelMetadata.attributes.columns"
                           [ngModel]="model.columns"
                           [ngModelOptions]="{updateOn: 'blur'}"
                           (ngModelChange)="updateColumns($event)">
                    <mat-hint>Integer between 1 and 1000</mat-hint>
                </mat-form-field>
            </dgp-inspector-item>

            <dgp-inspector-item [metadata]="modelMetadata.attributes.useNullValues">
                <mat-radio-group [ngModel]="model.useNullValues"
                                 (ngModelChange)="updateUseNullValues($event)">
                    <mat-radio-button style="margin-right: 16px;"
                                      [value]="true">Yes
                    </mat-radio-button>
                    <mat-radio-button [value]="false">No</mat-radio-button>
                </mat-radio-group>
            </dgp-inspector-item>
        </dgp-inspector>
    `,
    styles: [`
        dgp-inspector {
            display: flex;
            flex-direction: column;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatmapDemoConfigFormComponent extends DgpModelEditorComponentBase<HeatmapDemoConfig> {

    model = defaultHeatmapDemoConfig;
    readonly modelMetadata = heatmapDemoConfigMetadata;


    updateRows(rows: number) {
        const validationResult = validateAttribute({
            value: rows,
            modelId: "",
            attributePath: "rows",
            modelType: "HeatmapDemoConfig",
            attributeMetadata: heatmapDemoConfigMetadata.attributes.rows
        });
        if (validationResult.isValid) {
            this.updateModel({rows});
        }
    }

    updateColumns(columns: number) {
        const validationResult = validateAttribute({
            value: columns,
            modelId: "",
            attributePath: "columns",
            modelType: "HeatmapDemoConfig",
            attributeMetadata: heatmapDemoConfigMetadata.attributes.columns
        });
        if (validationResult.isValid) {
            this.updateModel({columns});
        }
    }

    updateUseNullValues(useNullValues: boolean) {
        this.updateModel({useNullValues});
    }

}

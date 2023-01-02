import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "../../utils/model-editor.component-base";
import { InspectorConfig } from "../../inspector/models";
import { ModelMetadata } from "data-modeling";
import { ThemePalette } from "@angular/material/core";
import { map } from "rxjs/operators";
import { notNullOrUndefined } from "../../utils/null-checking.functions";

export const inspectorConfigMetadata: ModelMetadata<InspectorConfig> = {
    attributes: {
        fieldLabelThemeColor: {
            label: "Label color",
            icon: "label",
            description: `Theme color of data labels.`,
            type: "string",
            defaultValue: undefined
        },
        maxContentWidth: {
            label: "Content width",
            icon: "space_bar",
            description: `Space reserved for displayed values.`,
            type: "string",
            defaultValue: "240px"
        },
        responsive: {
            label: "Responsive",
            icon: "repartition",
            description: `Display values below labels if there's little space`,
            type: "boolean",
            defaultValue: true
        },
        showFieldDescriptions: {
            label: "Descriptions",
            icon: "description",
            description: `Whether and where to display descriptions.`,
            type: "boolean",
            defaultValue: true
        },
        showFieldIcons: {
            label: "Icons",
            icon: "category",
            description: `Display icons for data fields.`,
            type: "boolean",
            defaultValue: true
        }
    }
};

@Component({
    selector: "dgp-inspector-config",
    template: `
        <dgp-inspector *ngIf="model"
                       [fieldLabelThemeColor]="model.fieldLabelThemeColor"
                       [maxContentWidth]="model.maxContentWidth"
                       [responsive]="model.responsive"
                       [showFieldDescriptions]="model.showFieldDescriptions"
                       [showFieldIcons]="model.showFieldIcons">

            <dgp-inspector-section label="General">

                <dgp-inspector-item [metadata]="inspectorConfigMetadata.attributes.responsive">
                    <mat-form-field>
                        <mat-select [ngModel]="model.responsive"
                                    (ngModelChange)="updateResponsive($event)">
                            <mat-option [value]="false">No</mat-option>
                            <mat-option [value]="true">Yes</mat-option>
                        </mat-select>
                    </mat-form-field>
                </dgp-inspector-item>

            </dgp-inspector-section>

            <dgp-inspector-section label="Fields">

                <dgp-inspector-item [metadata]="inspectorConfigMetadata.attributes.showFieldDescriptions">
                    <mat-form-field>
                        <mat-select [ngModel]="model.showFieldDescriptions"
                                    (ngModelChange)="updateShowFieldDescription($event)">
                            <mat-option [value]="false">No</mat-option>
                            <mat-option [value]="true">Yes</mat-option>
                            <mat-option [value]="'onHover'">On hover</mat-option>
                        </mat-select>
                    </mat-form-field>
                </dgp-inspector-item>

                <dgp-inspector-item [metadata]="inspectorConfigMetadata.attributes.showFieldIcons">
                    <mat-form-field>
                        <mat-select [ngModel]="model.showFieldIcons"
                                    (ngModelChange)="updateShowFieldDescription($event)">
                            <mat-option [value]="false">No</mat-option>
                            <mat-option [value]="true">Yes</mat-option>
                        </mat-select>
                    </mat-form-field>
                </dgp-inspector-item>

                <dgp-inspector-item [metadata]="inspectorConfigMetadata.attributes.fieldLabelThemeColor">
                    <mat-form-field>
                        <mat-select [ngModel]="model.fieldLabelThemeColor"
                                    (ngModelChange)="updateFieldLabelThemeColor($event)">
                            <mat-option [value]="null"></mat-option>
                            <mat-option [value]="'primary'">Primary</mat-option>
                            <mat-option [value]="'accent'">Accent</mat-option>
                            <mat-option [value]="'warn'">Warn</mat-option>
                        </mat-select>
                    </mat-form-field>
                </dgp-inspector-item>

                <dgp-inspector-item [metadata]="inspectorConfigMetadata.attributes.maxContentWidth">
                    <mat-form-field>
                        <input matInput
                               type="number"
                               [ngModel]="maxContentWidth$ | async"
                               (ngModelChange)="updateMaxContentWidth($event)"
                               [min]="96"
                               [step]="1">
                    </mat-form-field>
                </dgp-inspector-item>

            </dgp-inspector-section>

        </dgp-inspector>
    `,
    styles: [`
        mat-form-field {
            width: 100%;
            font-size: smaller;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpInspectorConfigComponent extends DgpModelEditorComponentBase<InspectorConfig> {

    readonly inspectorConfigMetadata = inspectorConfigMetadata;

    readonly maxContentWidth$ = this.model$.pipe(
        map(model => {
            if (!model) return null;
            return +model.maxContentWidth.replace("px", "");
        })
    );

    updateShowFieldDescription(showFieldDescriptions: boolean | "onHover") {
        this.updateModel({showFieldDescriptions});
    }

    updateResponsive(responsive: boolean) {
        this.updateModel({responsive});
    }

    updateShowFieldIcons(showFieldIcons: boolean) {
        this.updateModel({showFieldIcons});
    }

    updateFieldLabelThemeColor(fieldLabelThemeColor: ThemePalette) {
        this.updateModel({fieldLabelThemeColor});
    }

    updateMaxContentWidth(maxContentWidth: number) {
        let maxContentWidthString: string;

        if (notNullOrUndefined(maxContentWidth)) maxContentWidthString = maxContentWidth + "px";

        this.updateModel({maxContentWidth: maxContentWidthString});
    }

}

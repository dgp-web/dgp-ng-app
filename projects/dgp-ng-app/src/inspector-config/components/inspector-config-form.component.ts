import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "../../utils/model-editor.component-base";
import { InspectorConfig } from "../../inspector/models";
import { ThemePalette } from "@angular/material/core";
import { map } from "rxjs/operators";
import { notNullOrUndefined } from "../../utils/null-checking.functions";
import { inspectorConfigMetadata } from "../../inspector/constants";

@Component({
    selector: "dgp-inspector-config-form",
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
                                    (ngModelChange)="updateShowFieldIcons($event)">
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
                    <dgp-spacer></dgp-spacer>
                    <mat-slider [ngModel]="maxContentWidth$ | async"
                                (ngModelChange)="updateMaxContentWidth($event)"
                                [thumbLabel]="true"
                                [min]="160"
                                [max]="480"
                                [step]="1"
                                style="width: 160px;"></mat-slider>
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
export class DgpInspectorConfigFormComponent extends DgpModelEditorComponentBase<InspectorConfig> {

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

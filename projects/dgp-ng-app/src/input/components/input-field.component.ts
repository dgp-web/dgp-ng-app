import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DgpView } from "../../utils/view";
import { AttributeMetadata } from "data-modeling";
import { InspectorConfig } from "../../inspector/models/inspector-config.model";
import { ThemePalette } from "@angular/material/core";

@Component({
    selector: "dgp-input-field",
    template: `
        <dgp-inspector [fieldLabelThemeColor]="fieldLabelThemeColor"
                       [showFieldIcons]="showFieldIcons"
                       [maxContentWidth]="maxContentWidth"
                       [responsive]="responsive"
                       [showFieldDescriptions]="showFieldDescriptions">
            <dgp-inspector-item [metadata]="metadata">
                <div class="input-with-hint">
                    <ng-content></ng-content>
                    <dgp-input-hint [model]="model"
                                    [metadata]="metadata"></dgp-input-hint>
                </div>
            </dgp-inspector-item>

            <dgp-input-error-info [model]="model"
                                  [metadata]="metadata"></dgp-input-error-info>

        </dgp-inspector>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            padding: 0;
            overflow: auto;
        }

        .input-with-hint {
            display: flex;
            flex-direction: column;
            max-width: 320px;
            width: 100%;
        }


        /* TODO(mdc-migration): The following rule targets internal classes of list that may no longer apply for the MDC version. */
        mat-list {
            padding: 0;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpInputFieldComponent extends DgpView<any> implements InspectorConfig {

    @Input()
    metadata: AttributeMetadata<any>;

    @Input()
    fieldLabelThemeColor: ThemePalette;

    @Input()
    maxContentWidth: string;

    @Input()
    showFieldDescriptions: boolean | "onHover";

    @Input()
    showFieldIcons: boolean;

    @Input()
    responsive: boolean;


}

import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AttributeMetadata } from "data-modeling";
import { DgpModelEditorComponentBase } from "../../utils/model-editor.component-base";

@Component({
    selector: "dgp-input",
    template: `
        <dgp-input-field [metadata]="metadata"
                         [disabled]="disabled"
                         [model]="model"
                         (modelChange)="setModel($event)"></dgp-input-field>

        <dgp-input-info [metadata]="metadata"
                        [disabled]="disabled"
                        [model]="model"></dgp-input-info>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            position: relative;
            margin-left: 16px;
            width: 100%;
        }

        dgp-input-field {
            flex-grow: 1;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpInputComponent extends DgpModelEditorComponentBase<any> {

    @Input()
    metadata: AttributeMetadata<any>;

    @Input()
    label: string;

    @Input()
    description: string;

    @Input()
    matIconName: string;

}

import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AttributeMetadata } from "data-modeling";
import { DgpModelEditorComponentBase } from "../../utils/model-editor.component-base";

@Component({
    selector: "dgp-inspector-input-item",
    template: `
        <dgp-inspector-item [metadata]="metadata"
                            [matIconName]="matIconName"
                            [label]="label"
                            [description]="description">

            <dgp-input [metadata]="metadata"
                       [disabled]="disabled"
                       [model]="model"
                       (modelChange)="setModel($event)"></dgp-input>

        </dgp-inspector-item>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            padding-top: 8px;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpInspectorInputItemComponent extends DgpModelEditorComponentBase<any> {

    @Input()
    metadata: AttributeMetadata<any>;

    @Input()
    label: string;

    @Input()
    description: string;

    @Input()
    matIconName: string;

}

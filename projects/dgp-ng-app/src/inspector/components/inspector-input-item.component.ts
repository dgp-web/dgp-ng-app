import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AttributeMetadata } from "data-modeling";
import { DgpModelEditorComponentBase } from "../../utils/model-editor.component-base";
import { notNullOrUndefined } from "../../utils/null-checking.functions";

@Component({
    selector: "dgp-inspector-input-item",
    template: `
        <dgp-inspector-item [metadata]="metadata"
                            [matIconName]="matIconName"
                            [label]="label"
                            [description]="description">

            <dgp-spacer></dgp-spacer>

            <div class="input-container">
                <dgp-input [metadata]="metadata"
                           [disabled]="disabled"
                           [model]="model"
                           (modelChange)="setModel($event)"></dgp-input>
                <div *ngIf="hasMax()"
                     class="input-info">
                    <dgp-spacer></dgp-spacer>
                    <div class="limits">
                        {{model?.length || 0}}/{{metadata.max}}
                    </div>
                </div>
            </div>

        </dgp-inspector-item>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            padding-top: 8px;
        }

        .input-container {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            position: relative;
        }

        .input-info {
            display: flex;
            font-size: smaller;
            opacity: 0.7;
        }

        dgp-input {
            flex-grow: 1;
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

    hasMax() {
        return notNullOrUndefined(this.metadata) && notNullOrUndefined(this.metadata.max);
    }
}

import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { ModelMetadata } from "data-modeling";

/**
 * Renders metadata of a model
 */
@Component({
    selector: "dgp-model-description",
    template: `
        <dgp-inspector *ngIf="model">

            <dgp-inspector-section [matIconName]="model.icon"
                                   label="General">

                <dgp-inspector-item label="Label"
                                    matIconName="label">
                    {{model.label}}
                </dgp-inspector-item>

                <dgp-inspector-item label="Description"
                                    matIconName="description">
                    {{model.description}}
                </dgp-inspector-item>

            </dgp-inspector-section>

            <dgp-inspector-section *ngIf="model.attributes"
                                   label="Attributes"
                                   matIconName="list">


                <ng-container *ngFor="let attributeKey of getAttributeKeys()">

                    <dgp-inspector-item *ngIf="model.attributes[attributeKey] as attributeMetadata"
                                        [label]="attributeKey"
                                        [matIconName]="attributeMetadata.icon"
                                        [description]="attributeMetadata.description">
                        {{attributeMetadata.label}}

                        <table additionalInfo>

                            <tr>
                                <th>
                                    required
                                </th>
                                <td>
                                    {{attributeMetadata.isRequired}}
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    secret
                                </th>
                                <td>
                                    {{attributeMetadata.isSecret}}
                                </td>
                            </tr>

                        </table>
                    </dgp-inspector-item>

                </ng-container>
            </dgp-inspector-section>

            <dgp-inspector-section *ngIf="model.relationships"
                                   label="Relationships"
                                   matIconName="account_tree">


            </dgp-inspector-section>

        </dgp-inspector>
    `,
    styles: [`
        table {
            margin: 16px auto;
            flex-grow: 1;
            width: 100%;
        }

        th {
            padding: 8px 0;
            font-weight: normal;
            text-align: start;
        }

        td {
            text-align: end;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelDescriptionComponent extends DgpView<ModelMetadata<any, any>> {

    getAttributeKeys() {
        return Object.keys(this.model.attributes);
    }
}

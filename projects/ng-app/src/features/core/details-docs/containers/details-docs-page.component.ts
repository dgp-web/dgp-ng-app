import { ChangeDetectionStrategy, Component } from "@angular/core";
import { detailsDemoTemplate } from "../components/details-demo.template";
import { ModelMetadata } from "data-modeling";
import { Details } from "../../../../../../dgp-ng-app/src/details/models";
import { notNullOrUndefined } from "dgp-ng-app";

export const detailsMetadata: ModelMetadata<Details> = {
    attributes: {
        expanded: {
            label: "expanded",
            type: "boolean",
            defaultValue: true,
            description: `Controls whether the panel is expanded or not.`
        },
        expandedChange: {
            label: "expandedChange",
            type: "Observable<boolean>",
            description: `Emits when the panel is opened or closed by the user.`
        },
        expandable: {
            label: "expandable",
            type: "boolean",
            defaultValue: true,
            description: `Controls whether the state of the panel can be changed.`
        },
        summary: {
            label: "summary",
            type: "string",
            description: `The heading of the panel that is always visible.`
        },
        togglePosition: {
            label: "togglePosition",
            type: "'start' | 'end'",
            defaultValue: "start",
            description: `Defines where the caret for opening and closing is placed.`
        }
    }
};

@Component({
    selector: "dgp-details-docs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle/>
            Details
        </dgp-page-header>

        <dgp-docs-page>

            <dgp-docs-page-content>

                <dgp-docs-chapter-title>
                    Details
                </dgp-docs-chapter-title>

                <p>
                    Open or close panels with additional information.
                </p>

                <mat-tab-group>
                    <mat-tab label="Demo">
                        <dgp-details-demo/>
                    </mat-tab>
                    <mat-tab label="Code">
                        <dgp-docs-code-block [code]="demoCode"/>
                    </mat-tab>
                </mat-tab-group>

                <dgp-docs-section-title>
                    Parameters
                </dgp-docs-section-title>

                <!-- TODO: Extract API table -->
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Metadata</th>
                        <th>Description</th>
                    </tr>
                    <tr *ngFor="let attributeMetadata of attributes">
                        <td>
                            {{ attributeMetadata.label }}
                        </td>
                        <td>
                            {{ attributeMetadata.type }}
                        </td>
                        <td>
                            <ng-container *ngIf="hasDefaultValue(attributeMetadata)">
                                default value: {{ attributeMetadata.defaultValue }}
                            </ng-container>

                        </td>
                        <td>
                            {{ attributeMetadata.description }}
                        </td>
                    </tr>
                </table>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`
        table {
            border-collapse: collapse;
            width: 100%;
        }

        td, th {
            border: 1px solid gray;
        }

        th, td {
            text-align: left;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsDocsPageComponent {
    readonly demoCode = detailsDemoTemplate;
    readonly attributes = Object.values(detailsMetadata.attributes);

    hasDefaultValue(attributeMetadata: any) {
        return notNullOrUndefined(attributeMetadata.defaultValue);
    }
}

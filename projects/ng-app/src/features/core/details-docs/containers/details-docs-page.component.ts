import { ChangeDetectionStrategy, Component } from "@angular/core";
import { detailsDemoTemplate } from "../components/details-demo.template";

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

                <table>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Metadata</th>
                        <th>Description</th>
                    </tr>
                    <tr>
                        <td>
                            expanded
                        </td>
                        <td>
                            Input
                        </td>
                        <td>
                            boolean
                        </td>
                        <td>
                            default value: true
                        </td>
                        <td>
                            Controls whether the panel is expanded or not.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            expandedChange
                        </td>
                        <td>
                            Output
                        </td>
                        <td>
                            boolean
                        </td>
                        <td>

                        </td>
                        <td>
                            Emits when the panel is opened or closed by the user.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            expandable
                        </td>
                        <td>
                            Input
                        </td>
                        <td>
                            boolean
                        </td>
                        <td>
                            default value: true
                        </td>
                        <td>
                            Controls whether the state of the panel can be changed.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            togglePosition
                        </td>
                        <td>
                            Input
                        </td>
                        <td>
                            "start" | "end"
                        </td>
                        <td>
                            default value: "start"
                        </td>
                        <td>
                            Defines where the caret for opening and closing is placed.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <i>regular content</i>
                        </td>
                        <td>
                            content-slot
                        </td>
                        <td>

                        </td>
                        <td>

                        </td>
                        <td>
                            The panel content is just placed between the tags.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            summary
                        </td>
                        <td>
                            content-slot
                        </td>
                        <td>

                        </td>
                        <td>

                        </td>
                        <td>
                            The heading of the panel that is always visible.
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
}

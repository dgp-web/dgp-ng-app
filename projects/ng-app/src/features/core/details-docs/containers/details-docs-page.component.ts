import { Component, ChangeDetectionStrategy } from "@angular/core";

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

                <dgp-docs-section-title>
                    Demo
                </dgp-docs-section-title>

                <dgp-details style="margin-top: 8px; margin-bottom: 8px;"
                             [expanded]="false">

                    <ng-container summary>
                        John Doe
                    </ng-container>

                    Has a lot of work to do. He represents male humans
                    whenever sample data is needed.

                </dgp-details>


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

        th {
            text-align: left;
        }

        td {
            text-align: center;
        }
   `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsDocsPageComponent {

}

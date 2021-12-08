import { Component, ChangeDetectionStrategy } from "@angular/core";
import * as _ from "lodash";

@Component({
    selector: "dgp-table-cell-editor-docs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Table-cell editor
        </dgp-page-header>
        <dgp-docs-page>
            <dgp-docs-page-content>

                <dgp-docs-chapter-title>
                    Table-cell editor
                </dgp-docs-chapter-title>

                <p>
                    Editing functionality for table cells.
                </p>

                <dgp-docs-section-title>Demo</dgp-docs-section-title>

                <table>
                    <tr>
                        <th>String column</th>
                        <th>Number column</th>
                        <th>Boolean column</th>
                        <th>Complex-form column</th>
                    </tr>
                    <tr>
                        <td>
                            <dgp-table-cell (editorOpened)="editedModel = model.string"
                                            (editorClosed)="model.string = editedModel"
                                            #stringCell>

                                {{ model.string }}

                                <mat-form-field *dgpTableCellEditor>
                                    <mat-label>
                                        String
                                    </mat-label>
                                    <input #stringInput
                                           matInput
                                           [(ngModel)]="editedModel"
                                           (keydown.enter)="stringCell.closeCellEditorDialog()"
                                           (keydown.tab)="stringCell.closeCellEditorDialog()"
                                           maxlength="16">
                                    <mat-hint align="end">
                                        {{ stringInput.value ? stringInput.value.length : 0 }} / 16
                                    </mat-hint>
                                </mat-form-field>

                            </dgp-table-cell>
                        </td>
                        <td>
                            <dgp-table-cell #numberCell
                                            (editorOpened)="editedModel = model.number"
                                            (editorClosed)="model.number = editedModel">

                                {{ model.number }}

                                <ng-container *dgpTableCellEditor>

                                    <mat-form-field>
                                        <mat-label>
                                            Number
                                        </mat-label>
                                        <input matInput
                                               type="number"
                                               [(ngModel)]="editedModel"
                                               (keydown.enter)="numberCell.closeCellEditorDialog()"
                                               (keydown.tab)="numberCell.closeCellEditorDialog()">
                                    </mat-form-field>

                                </ng-container>

                            </dgp-table-cell>
                        </td>
                        <td>
                            <dgp-table-cell (editorOpened)="editedModel = model.boolean"
                                            (editorClosed)="model.boolean = editedModel">

                                {{ model.boolean }}

                                <ng-container *dgpTableCellEditor>

                                    <mat-slide-toggle [(ngModel)]="editedModel"></mat-slide-toggle>

                                </ng-container>

                            </dgp-table-cell>
                        </td>

                        <td>
                            <dgp-table-cell (editorOpened)="setObjectModel()"
                                            (editorClosed)="model.object = editedModel; editedModel = null;"
                                            #complexCell>

                                {{ model.object.firstName }} {{ model.object.lastName }}

                                <ng-container *dgpTableCellEditor>

                                    <mat-form-field>
                                        <mat-label>
                                            First name
                                        </mat-label>
                                        <input #firstNameInput
                                               matInput
                                               [(ngModel)]="editedModel.firstName"
                                               maxlength="16"
                                               (keydown.enter)="complexCell.closeCellEditorDialog()">
                                        <mat-hint align="end">
                                            {{ firstNameInput.value ? firstNameInput.value.length : 0 }} / 16
                                        </mat-hint>
                                    </mat-form-field>

                                    <mat-form-field>
                                        <mat-label>
                                            First name
                                        </mat-label>
                                        <input #lastNameInput
                                               matInput
                                               [(ngModel)]="editedModel.lastName"
                                               maxlength="16"
                                               (keydown.enter)="complexCell.closeCellEditorDialog()"
                                               (keydown.tab)="complexCell.closeCellEditorDialog()">
                                        <mat-hint align="end">
                                            {{ lastNameInput.value ? lastNameInput.value.length : 0 }} / 16
                                        </mat-hint>
                                    </mat-form-field>

                                </ng-container>

                            </dgp-table-cell>
                        </td>

                    </tr>
                </table>


                <dgp-docs-section-title>
                    1: Import DgpTableCellModule in your feature module.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="moduleImportCode"></dgp-docs-code-block>

                <dgp-docs-section-title>
                    2: Add the component to the template.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="templateCode"
                                     language="html"></dgp-docs-code-block>


            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`
        table {
            margin: 16px auto;
            flex-grow: 1;
            max-width: 640px;
            width: 100%;
        }

        th {
            padding: 8px 16px;
            border: 1px solid gainsboro;
        }

        td {
            border: 1px solid gainsboro;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellEditorDocsPageComponent {

    editedModel: any;

    model = {
        string: "My text",
        number: 42,
        boolean: true,
        object: {
            firstName: "John",
            lastName: "Doe"
        }
    };

    readonly moduleImportCode = `
import { DgpTableCellModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpTableCellModule,
        // ...
    ]
})
export class FeatureModule {}
    `;

    readonly templateCode = `
<td>
    <dgp-table-cell (editorOpened)="editedModel = model.string"
                    (editorClosed)="model.string = editedModel">

        {{ model.string }}

        <mat-form-field *dgpTableCellEditor>
            <mat-label>
                String
            </mat-label>
            <input matInput
                   [(ngModel)]="editedModel"
                   (keydown.enter)="stringCell.closeCellEditorDialog()">
            <mat-hint align="end">
        </mat-form-field>

    </dgp-table-cell>
</td>
    `;

    setObjectModel() {
        this.editedModel = _.clone(this.model.object);
    }
}

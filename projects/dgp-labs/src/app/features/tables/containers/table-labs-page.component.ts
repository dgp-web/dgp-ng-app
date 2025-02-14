import { ChangeDetectionStrategy, Component } from "@angular/core";
import { EditableTable } from "dgp-ng-tables";

@Component({
    selector: "dgp-table-labs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle/>
            Editable table
        </dgp-page-header>

        <dgp-editable-table dgpEditableTableModel
                            [tableModel]="editableTable"/>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableLabsPageComponent {

    readonly editableTable: EditableTable = {
        columns: [{
            columnKey: "label",
            label: "Label",
        }],
        rows: [{
            rowKey: "01"
        }],
        model: [{
            columnKey: "label",
            rowKey: "01",
            value: "Jason",
        }]
    };

}

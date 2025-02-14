import { ChangeDetectionStrategy, Component } from "@angular/core";
import { EditableTable, FormatMaskType, TableCellContent, TableColumn, TableRow } from "dgp-ng-tables";
import { Many } from "data-modeling";

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
            position: 1,
            formatMask: {
                type: FormatMaskType.Auto
            }
        }],
        rows: [{
            rowKey: "01",
            position: 1,
        }],
        model: [{
            columnKey: "label",
            rowKey: "01",
            value: "Jason",
        }],
        canAddRows: true,
        canAddColumns: true,
        canEditCellFormatMasks: true,
        canEditColumnFormatMasks: true,
        canMoveRows: true,
        canMoveColumns: true,
        canRemoveRows: true,
        canRemoveColumns: true,
        canResizeColumns: true,
        canResizeRows: true,
        sizingStrategy: "default",
        cells: []
    };

}

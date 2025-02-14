import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Many } from "data-modeling";
import { TableRow } from "../models/structure/row/table-row.model";
import { TableColumn } from "../models/structure/column/table-column.model";
import { TableCell } from "../models/structure/cell/table-cell.model";
import { TableCellContent } from "../models/model/table-cell-content.model";
import { EditableTable } from "../models/editable-table.model";

@Component({
    selector: "dgp-editable-table",
    template: ``,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpEditableTableComponent implements EditableTable {

    // TODO: Add output
    @Input()
    sizingStrategy: "default";

    // TODO: Add output
    @Input()
    model: Many<TableCellContent>;

    // TODO: Add output
    @Input()
    rows: Many<TableRow>;

    // TODO: Add output
    @Input()
    columns: Many<TableColumn>;

    // TODO: Add output
    @Input()
    cells: Many<TableCell>;

    /**
     * Row editing capabilities
     */

    @Input()
    canAddRows: boolean;

    @Input()
    canRemoveRows: boolean;

    @Input()
    canMoveRows: boolean;

    @Input()
    canResizeRows: boolean;

    /**
     * Column editing capabilities
     */

    @Input()
    canAddColumns: boolean;

    @Input()
    canRemoveColumns: boolean;

    @Input()
    canMoveColumns: boolean;

    @Input()
    canResizeColumns: boolean;

    @Input()
    canEditColumnFormatMasks: boolean;

    /**
     * Cell editing capabilities
     */

    @Input()
    canEditCellFormatMasks: boolean;

}

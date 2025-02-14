import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from "@angular/core";
import { Many } from "data-modeling";
import { TableRow } from "../models/structure/row/table-row.model";
import { TableColumn } from "../models/structure/column/table-column.model";
import { TableCell } from "../models/structure/cell/table-cell.model";
import { TableCellContent } from "../models/model/table-cell-content.model";
import { EditableTable } from "../models/editable-table.model";
import { ColumnKey } from "../models/structure/column/column-key.model";
import { RowKey } from "../models/structure/row/row-key.model";
import { DgpModelEditorComponentBase, observeAttribute$ } from "dgp-ng-app";
import { map } from "rxjs/operators";

export const trackByColumnKey: TrackByFunction<ColumnKey> = (index, item) => item.columnKey;

export const trackByRowKey: TrackByFunction<RowKey> = (index, item) => item.rowKey;

@Component({
    selector: "dgp-editable-table",
    template: `
        <table>
            <tr>
                <ng-container *ngFor="let column of columns; trackBy: trackByColumnKey">
                    <th>{{ column.label }}</th>
                </ng-container>
            </tr>

            <tr *ngFor="let row of rows; trackBy: trackByRowKey">
                <ng-container *ngFor="let column of columns; trackBy: trackByColumnKey">
                    <td>{{ getCellContent$(row, column) | async }}</td>
                </ng-container>
            </tr>
        </table>
    `,
    styles: [`
        table {
            border-collapse: collapse;
        }

        th {
            border: 1px solid gray;
        }

        td {
            border: 1px solid gray;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpEditableTableComponent extends DgpModelEditorComponentBase<Many<TableCellContent>> implements EditableTable {

    readonly trackByColumnKey = trackByColumnKey;
    readonly trackByRowKey = trackByRowKey;

    readonly indexedModel$ = this.model$.pipe(
        map(model => {
            if (!model) return {};

            const result = {};

            model.forEach(cellContent => {
                if (!result[cellContent.rowKey]) result[cellContent.rowKey] = {};

                result[cellContent.rowKey][cellContent.columnKey] = cellContent.value;
            });

            return result;
        })
    );

    // TODO: Add output
    @Input()
    sizingStrategy: "default";

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

    getCellContent$(row: RowKey, column: ColumnKey) {
        return this.indexedModel$.pipe(
            map(indexedModel => {
                const rowData = indexedModel[row.rowKey];
                if (!rowData) return null;
                return rowData[column.columnKey];
            })
        );
    }
}

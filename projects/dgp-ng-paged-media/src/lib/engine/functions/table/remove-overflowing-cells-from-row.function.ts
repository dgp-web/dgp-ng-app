import { OverflowingColumnsInfo } from "./get-overflowing-columns-info.function";
import { Many } from "data-modeling";

export interface OverflowingCell {
    readonly columnKey?: string;
    readonly tableCell: HTMLTableCellElement;
}

export interface OverflowingCellsInfo {
    readonly originalRowIndex: number;
    readonly cells: Many<OverflowingCell>;
    readonly lastVisibleColumnIndex: number;
}

export function removeOverflowingCellsFromRow(payload: OverflowingColumnsInfo & {
    readonly tableRow: HTMLTableRowElement;
    readonly originalRowIndex: number;
}): OverflowingCellsInfo {
    const tableRow = payload.tableRow;
    const originalRowIndex = payload.originalRowIndex;
    const lastVisibleColumnIndex = payload.lastVisibleColumnIndex;
    const columnKeys = payload.columnKeys;

    const cells = new Array<OverflowingCell>();

    tableRow.querySelectorAll("td").forEach((tableCell, cellIndex) => {

        if (cellIndex > lastVisibleColumnIndex) {
            tableCell.remove();

            cells.push({
                tableCell,
                columnKey: columnKeys[cellIndex - lastVisibleColumnIndex - 1]
            });
        }

    });

    return {originalRowIndex, cells, lastVisibleColumnIndex};
}

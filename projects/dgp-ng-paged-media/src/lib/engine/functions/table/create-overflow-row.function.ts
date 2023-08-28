import { OverflowingCells } from "./remove-overflowing-cells-from-row.function";

export interface OverflowRow {
    readonly originalRowIndex: number;
    readonly tableRow: HTMLTableRowElement;
}

export function createOverflowRow(payload: OverflowingCells): OverflowRow {
    const originalRowIndex = payload.originalRowIndex;
    const cells = payload.cells;

    const tableRow = document.createElement("tr");
    cells.forEach((cell, index) => {

        if (index !== 0) {
            tableRow.innerHTML += "<br>";
        }

        if (cell.columnKey) tableRow.innerHTML += cell.columnKey + ": ";

        tableRow.innerHTML += cell.tableCell.innerHTML;

    });

    return {tableRow, originalRowIndex};
}

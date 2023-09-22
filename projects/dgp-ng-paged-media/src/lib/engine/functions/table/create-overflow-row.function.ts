import { OverflowingCellsInfo } from "./remove-overflowing-cells-from-row.function";

export interface OverflowRow {
    readonly originalRowIndex: number;
    readonly tableRow: HTMLTableRowElement;
}

export function createOverflowRow(payload: OverflowingCellsInfo): OverflowRow {
    const originalRowIndex = payload.originalRowIndex;
    const cells = payload.cells;
    const lastVisibleColumnIndex = payload.lastVisibleColumnIndex;

    const tableRow = document.createElement("tr");
    const tableCell = document.createElement("td");
    tableCell.style.padding = "16px";
    tableCell.style.fontSize = "small";
    tableCell.colSpan = lastVisibleColumnIndex + 1;
    tableRow.appendChild(tableCell);

    cells.forEach((cell, index) => {

        if (index !== 0) {
           // tableCell.innerHTML += "<br>";
            tableCell.innerHTML += "; ";
        }

        if (cell.columnKey) tableCell.innerHTML += "<strong>" + cell.columnKey + "</strong>: ";

        tableCell.innerHTML += cell.tableCell.innerHTML;

    });

    return {tableRow, originalRowIndex};
}

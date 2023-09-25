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
    const listBox = document.createElement("div");
    listBox.classList.add("dgp-overflow-table-row__list-box");
    tableCell.appendChild(listBox);

    tableCell.colSpan = lastVisibleColumnIndex + 1;
    tableRow.appendChild(tableCell);

    cells.forEach((cell, index) => {

        const listItem = document.createElement("div");
        listItem.classList.add("dgp-overflow-table-row__list-item");
        listBox.appendChild(listItem);

        if (cell.columnKey) {
            const columnKey = document.createElement("div");
            columnKey.classList.add("dgp-overflow-table-row__list-item__column-key");
            listItem.appendChild(columnKey);

            columnKey.innerHTML = cell.columnKey;
        }
        const value = document.createElement("div");
        value.classList.add("dgp-overflow-table-row__list-item__value");
        listItem.appendChild(value);

        value.innerHTML = cell.tableCell.innerHTML;

    });

    return {tableRow, originalRowIndex};
}

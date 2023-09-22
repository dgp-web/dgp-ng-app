import { PageContentSize } from "../../models";
import { Many, Mutable } from "data-modeling";

export interface OverflowingColumnsInfo {
    readonly columnKeys?: Many<string>;
    readonly lastVisibleColumnIndex: number;
}

export function getOverflowingColumnsInfo(payload: {
    readonly table: HTMLTableElement;
    readonly pageContentSize: PageContentSize;
}): OverflowingColumnsInfo {

    const table = payload.table;
    const pageContentSize = payload.pageContentSize;

    const result: Mutable<OverflowingColumnsInfo> = {
        columnKeys: [],
        lastVisibleColumnIndex: null
    };

    const utilityTable = document.createElement("table");
    document.body.append(utilityTable);

    const headerRow = document.createElement("tr");
    utilityTable.appendChild(headerRow);

    /**
     * Iterate over the header cells
     */
    table.querySelector("tr")
        .querySelectorAll("th")
        .forEach((columnCell, columnIndex) => {

            table.querySelectorAll("tr").forEach((regularRow, regularRowIndex) => {
                if (regularRowIndex === 0) return;

                let utilityTableRow: HTMLTableRowElement;

                if (columnIndex === 0) {
                    utilityTableRow = document.createElement("tr");
                    utilityTable.appendChild(utilityTableRow);
                } else {
                    utilityTableRow = utilityTable.querySelectorAll("tr").item(regularRowIndex);
                }

                const headerCell = document.createElement("th");
                headerCell.innerHTML = columnCell.innerHTML;
                headerRow.appendChild(headerCell);

                regularRow.querySelectorAll("td, th").forEach((cell, cellIndex) => {
                    if (cellIndex !== columnIndex) return;

                    const tag = cell.tagName;
                    const utilityCell = document.createElement(tag);
                    utilityCell.innerHTML = cell.innerHTML;
                    utilityTableRow.appendChild(utilityCell);

                });

            });

            if (utilityTable.clientWidth > pageContentSize.width) {
                console.log("Width exceeded");
            }

        });


    utilityTable.remove();

    return result;
}

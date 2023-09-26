import { PageContentSize } from "../../models";
import { Many, Mutable } from "data-modeling";
import { toColumnKey } from "./to-column-key.function";

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
    utilityTable.style.maxWidth = pageContentSize.width + pageContentSize.widthUnit;

    const headerRow = document.createElement("tr");
    utilityTable.appendChild(headerRow);

    let isResultFound = false;

    /**
     * Iterate over the header cells
     */
    table.querySelector("tr")
        .querySelectorAll("th")
        .forEach((columnCell, columnIndex) => {

            if (isResultFound) return;

            const headerCell = document.createElement("th");
            headerCell.innerHTML = columnCell.innerHTML;
            headerRow.appendChild(headerCell);

            table.querySelectorAll("tr").forEach((regularRow, regularRowIndex) => {

                if (regularRowIndex === 0) return;

                let utilityTableRow: HTMLTableRowElement;

                if (columnIndex === 0) {
                    utilityTableRow = document.createElement("tr");
                    utilityTable.appendChild(utilityTableRow);
                } else {
                    utilityTableRow = utilityTable.querySelectorAll("tr").item(regularRowIndex);
                }

                regularRow.querySelectorAll("td, th").forEach((cell, cellIndex) => {
                    if (cellIndex !== columnIndex) return;

                    const tag = cell.tagName;
                    const utilityCell = document.createElement(tag);
                    utilityCell.style.width = cell.clientWidth + "px";
                    utilityCell.innerHTML = cell.innerHTML;
                    utilityTableRow.appendChild(utilityCell);

                });

            });

            console.log("utilityTable.clientWidth", utilityTable.clientWidth);
            console.log("utilityTable.scrollWidth", utilityTable.scrollWidth);

            if (utilityTable.clientWidth >= Math.floor(pageContentSize.width)) {
                result.lastVisibleColumnIndex = columnIndex - 1;

                table.querySelector("tr")
                    .querySelectorAll("th")
                    .forEach((tableCell) => {
                        const tableCellIndex = tableCell.cellIndex;

                        if (tableCellIndex > result.lastVisibleColumnIndex) {
                            result.columnKeys.push(toColumnKey(tableCell));
                        }

                    });

                isResultFound = true;
            }

        });


    utilityTable.remove();

    return result;
}


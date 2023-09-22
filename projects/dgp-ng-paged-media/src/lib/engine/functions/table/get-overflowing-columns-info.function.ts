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

    const headerRow = document.createElement("tr");
    utilityTable.appendChild(headerRow);

    /**
     * Iterate over the header cells
     */
    table.querySelector("tr")
        .querySelectorAll("th")
        .forEach((th, columnIndex) => {

            table.querySelectorAll("tr").forEach((regularRow, regularRowIndex) => {
                if (regularRowIndex === 0) return;

                
            });

        });

    return result;
}

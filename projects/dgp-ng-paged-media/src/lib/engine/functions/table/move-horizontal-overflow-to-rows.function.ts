import { getOverflowingColumnsInfo, OverflowingColumnsInfo } from "./get-overflowing-columns-info.function";
import { PageContentSize } from "../../models";
import { removeOverflowingCellsFromRow } from "./remove-overflowing-cells-from-row.function";
import { createOverflowRow, OverflowRow } from "./create-overflow-row.function";
import { addOverflowRows } from "./add-overflow-rows.function";
import { isNullOrUndefined } from "dgp-ng-app";

export function tryTrimHeaderRow(payload: OverflowingColumnsInfo & {
    readonly headerRow: HTMLTableRowElement;
}) {

    const headerRow = payload.headerRow;

    headerRow.querySelectorAll("th").forEach((th, index) => {

        if (th.cellIndex > payload.lastVisibleColumnIndex) {
            th.remove();
        }

    });

}

export function moveHorizontalOverflowToRows(payload: {
    readonly table: HTMLTableElement;
    readonly pageContentSize: PageContentSize;
}): HTMLTableElement {
    let table = payload.table;
    const pageContentSize = payload.pageContentSize;

    const overflowingColumnsInfo = getOverflowingColumnsInfo({
        table,
        pageContentSize
    });

    if (isNullOrUndefined(overflowingColumnsInfo.lastVisibleColumnIndex)) return table;

    tryTrimHeaderRow({
        ...overflowingColumnsInfo,
        headerRow: table.querySelector("tr")
    });

    const rows = table.querySelectorAll("tr");

    const overflowRows = new Array<OverflowRow>();

    rows.forEach((tableRow, originalRowIndex) => {

        if (originalRowIndex === 0) return;

        const overflowingCellsInfo = removeOverflowingCellsFromRow({
            ...overflowingColumnsInfo,
            tableRow,
            originalRowIndex
        });

        const overflowRow = createOverflowRow(overflowingCellsInfo);
        overflowRows.push(overflowRow);
    });

    table = addOverflowRows({
        table,
        overflowRows
    });

    return table;
}

import { getOverflowingColumnsInfo } from "./get-overflowing-columns-info.function";
import { PageContentSize } from "../../models";
import { removeOverflowingCellsFromRow } from "./remove-overflowing-cells-from-row.function";
import { createOverflowRow, OverflowRow } from "./create-overflow-row.function";
import { addOverflowRows } from "./add-overflow-rows.function";

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

    // TODO: try trim header row

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

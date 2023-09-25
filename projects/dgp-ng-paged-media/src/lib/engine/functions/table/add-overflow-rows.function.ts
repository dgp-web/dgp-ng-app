import { Many } from "data-modeling";
import { OverflowRow } from "./create-overflow-row.function";

export function insertAfter(newNode: Node, existingNode: Node) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

export function addOverflowRows(payload: {
    readonly overflowRows: Many<OverflowRow>;
    readonly table: HTMLTableElement;
}): HTMLTableElement {
    const table = payload.table;
    const overflowRows = payload.overflowRows;
    const originalRows = table.querySelectorAll("tr");

    originalRows.forEach((originalRow, index) => {

        overflowRows.forEach(overflowRow => {

            if (index === overflowRow.originalRowIndex) {
                insertAfter(overflowRow.tableRow, originalRow);
            }

        });
    });

    return table;
}

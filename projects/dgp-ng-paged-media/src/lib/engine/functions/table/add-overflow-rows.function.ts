import { Many } from "data-modeling";
import { OverflowRow } from "./create-overflow-row.function";

export function addOverflowRows(payload: {
    readonly overflowRows: Many<OverflowRow>;
    readonly table: HTMLTableElement;
}): HTMLTableElement {
    const table = payload.table;
    const overflowRows = payload.overflowRows;

    return table;
}

import { OverflowingCells } from "./remove-overflowing-cells-from-row.function";

export interface OverflowRow {
    readonly originalRowIndex: number;
    readonly tableRow: HTMLTableRowElement;
}

export function createOverflowRow(payload: {
    readonly overflowingCells: OverflowingCells;
}): OverflowRow {
    return null;
}

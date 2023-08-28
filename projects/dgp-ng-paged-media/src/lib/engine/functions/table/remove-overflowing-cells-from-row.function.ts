import { OverflowingColumnsInfo } from "./get-overflowing-columns-info.function";
import { Many } from "data-modeling";

export interface OverflowingCell {
    readonly columnKey?: string;
    readonly tableCell: HTMLTableCellElement;
}

export interface OverflowingCellsInfo {
    readonly originalRowIndex: number;
    readonly cells: Many<OverflowingCell>;
}

export function removeOverflowingCellsFromRow(payload: OverflowingColumnsInfo & {
    readonly tableRow: HTMLTableRowElement;
    readonly originalRowIndex: number;
}): OverflowingCellsInfo {
    return null;
}

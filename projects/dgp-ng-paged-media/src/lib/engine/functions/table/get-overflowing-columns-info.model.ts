import { PageContentSize } from "../../models";
import { Many } from "data-modeling";

export interface OverflowingColumnsInfo {
    readonly columnKeys?: Many<string>;
    readonly lastVisibleColumnIndex: number;
}

export function getOverflowingColumnInfos(payload: {
    readonly table: HTMLTableElement;
    readonly pageContentSize: PageContentSize;
}): OverflowingColumnsInfo {
    return null;
}

import { HTMLSection, PageContentSize, PagedHTMLComputationEngine } from "../models";
import { extractHTMLItemsFromSection } from "./extract-html-items-from-section.function";
import { createHTMLWrapperElement } from "./create-html-wrapper-element.function";
import { getOuterHeight } from "./get-outer-height.function";
import { checkHeight } from "./check-height.function";
import { Many } from "data-modeling";

export interface OverflowingColumnInfo {
    readonly columnKeys?: Many<string>;
    readonly lastVisibleColumnIndex: number;
}

export function getOverflowingColumnInfos(payload: {
    readonly table: HTMLTableElement;
    readonly pageContentSize: PageContentSize;
}): OverflowingColumnInfo {
    return null;
}

export interface OverflowingCell {
    readonly columnKey?: string;
    readonly tableCell: HTMLTableCellElement;
}

export function removeOverflowingCells(payload: OverflowingColumnInfo & {
    readonly tableRow: HTMLTableRowElement;
}): Many<OverflowingCell> {
    return null;
}

export interface OverflowRow {
    readonly originalRowIndex: number;
    readonly tableRow: HTMLTableRowElement;
}

export function addOverflowRows(payload: {
    readonly overflowRows: Many<OverflowRow>;
    readonly table: HTMLTableElement;
}): HTMLTableElement {
    const table = payload.table;
    const overflowRows = payload.overflowRows;

    return table;
}

export function moveHorizontalOverflowToRows(payload: {
    readonly table: HTMLTableElement;
}): HTMLTableElement {
    const table = payload.table;

    return table;
}

export function processHTMLTableSection(payload: {
    readonly engine: PagedHTMLComputationEngine;
    readonly htmlSection: HTMLSection;
    readonly pageContentSize: PageContentSize;
}) {
    const engine = payload.engine;
    const htmlSection = payload.htmlSection;
    const pageContentSize = payload.pageContentSize;

    const refTable = htmlSection.nativeElement.querySelector("table");
    const htmlItems = extractHTMLItemsFromSection(htmlSection);

    let table = createHTMLWrapperElement("table", pageContentSize);
    refTable.classList.forEach(x => {
        table.classList.add(x);
    });

    htmlItems.forEach(htmlItem => {
        const helpTable = createHTMLWrapperElement("table", pageContentSize);
        helpTable.appendChild(htmlItem);

        const height = getOuterHeight(table);
        const height02 = getOuterHeight(helpTable);
        checkHeight({height, pageContentSize});

        if (height + height02 <= engine.currentPageRemainingHeight) {
            table.appendChild(htmlItem);
        } else {
            engine.currentPage.itemsOnPage.push(table);
            engine.finishPage();

            document.body.removeChild(table);
            table = createHTMLWrapperElement("table", pageContentSize);
            refTable.classList.forEach(x => {
                table.classList.add(x);
            });
            table.appendChild(htmlItem);
        }

        document.body.removeChild(helpTable);
    });

    engine.currentPage.itemsOnPage.push(table);
    const height1 = getOuterHeight(table);
    engine.currentPageRemainingHeight -= height1;
    document.body.removeChild(table);
}

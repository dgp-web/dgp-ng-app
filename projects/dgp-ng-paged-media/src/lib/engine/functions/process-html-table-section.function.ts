import { HTMLSection, PageContentSize, PagedHTMLComputationEngine } from "../models";
import { createHTMLWrapperElement } from "./create-html-wrapper-element.function";
import { getOuterHeight } from "./get-outer-height.function";
import { checkHeight } from "./check-height.function";
import { moveHorizontalOverflowToRows } from "./table/move-horizontal-overflow-to-rows.function";
import { extractHTMLItemsFromTableSection } from "./extract-html-items-from-table-section.function";

export function tryGetTableHeaderRow(payload: HTMLTableElement): HTMLTableRowElement {
    return payload.querySelector("tr");
}

export function processHTMLTableSection(payload: {
    readonly engine: PagedHTMLComputationEngine;
    readonly htmlSection: HTMLSection;
    readonly pageContentSize: PageContentSize;
}) {
    const engine = payload.engine;
    const htmlSection = payload.htmlSection;
    const pageContentSize = payload.pageContentSize;

    let refTable = htmlSection.nativeElement.querySelector("table");

    if (refTable.classList.contains("dgp-overflow-table-rows")) {

        refTable = moveHorizontalOverflowToRows({
            table: refTable, pageContentSize
        });

    }

    let headerRow: HTMLTableRowElement;

    if (refTable.classList.contains("dgp-repeated-table-header-row")) {
        headerRow = tryGetTableHeaderRow(refTable);
    }

    const htmlItems = extractHTMLItemsFromTableSection(refTable);

    let table = createHTMLWrapperElement("table", pageContentSize);

    refTable.classList.forEach(x => {
        table.classList.add(x);
    });

    htmlItems.forEach(htmlItem => {
        const helpTable = createHTMLWrapperElement("table", pageContentSize);
        helpTable.appendChild(htmlItem);
        refTable.classList.forEach(x => {
            helpTable.classList.add(x);
        });

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
            if (refTable.classList.contains("dgp-repeated-table-header-row")) {
                const repeatedHeaderRow = document.createElement("tr");
                repeatedHeaderRow.innerHTML = headerRow.innerHTML;
                table.appendChild(repeatedHeaderRow);
            }
            table.appendChild(htmlItem);
        }

        document.body.removeChild(helpTable);
    });

    engine.currentPage.itemsOnPage.push(table);
    const height1 = getOuterHeight(table);
    engine.currentPageRemainingHeight -= height1;
    document.body.removeChild(table);
}

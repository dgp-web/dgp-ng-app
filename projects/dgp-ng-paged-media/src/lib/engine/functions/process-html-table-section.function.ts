import { HTMLSection, PageContentSize, PagedHTMLComputationEngine } from "../models";
import { extractHTMLItemsFromSection } from "./extract-html-items-from-section.function";
import { createHTMLWrapperElement } from "./create-html-wrapper-element.function";
import { getOuterHeight } from "./get-outer-height.function";

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

        if (height <= engine.currentPageRemainingHeight) {
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

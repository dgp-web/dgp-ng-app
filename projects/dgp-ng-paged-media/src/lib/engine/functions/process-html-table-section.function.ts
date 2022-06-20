import { HTMLSection, PagedHTMLComputationEngine, PageSize } from "../models";
import { extractHTMLItemsFromSection } from "./extract-html-items-from-section.function";
import { createHTMLWrapperElement } from "./create-html-wrapper-element.function";

export function processHTMLTableSection(payload: {
    readonly engine: PagedHTMLComputationEngine;
    readonly htmlSection: HTMLSection;
    readonly pageSize: PageSize;
}) {
    const engine = payload.engine;
    const htmlSection = payload.htmlSection;
    const pageSize = payload.pageSize;

    const htmlItems = extractHTMLItemsFromSection(htmlSection);

    let table = createHTMLWrapperElement("table", pageSize);

    htmlItems.forEach(htmlItem => {
        const helpTable = createHTMLWrapperElement("table", pageSize);
        helpTable.appendChild(htmlItem);

        const height = table.getBoundingClientRect().height + helpTable.getBoundingClientRect().height;

        if (height <= engine.currentPageRemainingHeight) {
            table.appendChild(htmlItem);
        } else {
            engine.currentPage.itemsOnPage.push(table);
            engine.finishPage();

            document.body.removeChild(table);
            table = createHTMLWrapperElement("table", pageSize);
        }

        document.body.removeChild(helpTable);
    });

    engine.currentPage.itemsOnPage.push(table);
    const height1 = table.getBoundingClientRect().height;
    engine.currentPageRemainingHeight -= height1;
    document.body.removeChild(table);
}

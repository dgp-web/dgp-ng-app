import { HTMLSection, PagedHTMLComputationEngine, PageSize } from "../models";
import { extractHTMLItemsFromSection } from "./extract-html-items-from-section.function";
import { checkHeight } from "./check-height.function";

export function processHTMLHeadingSection(payload: {
    readonly engine: PagedHTMLComputationEngine;
    readonly htmlSection: HTMLSection;
    readonly pageSize: PageSize;
}) {
    const engine = payload.engine;
    const htmlSection = payload.htmlSection;
    const pageSize = payload.pageSize;
    const htmlItems = extractHTMLItemsFromSection(htmlSection);
    htmlItems.forEach(htmlItem => {
        htmlItem.style.width = pageSize.width + pageSize.widthUnit;

        const height = htmlItem.getBoundingClientRect().height;
        checkHeight({height, pageSize});

        if (height <= engine.currentPageRemainingHeight) {
            engine.currentPage.itemsOnPage.push(htmlItem);
            engine.currentPageRemainingHeight -= height;
        } else {
            engine.finishPage();

            engine.currentPage.itemsOnPage.push(htmlItem);
            engine.currentPageRemainingHeight -= height;
        }
    });
}

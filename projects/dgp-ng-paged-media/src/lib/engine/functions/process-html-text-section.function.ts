import { HTMLSection, PageContentSize, PagedHTMLComputationEngine } from "../models";
import { extractHTMLItemsFromSection } from "./extract-html-items-from-section.function";
import { checkHeight } from "./check-height.function";
import { getOuterHeight } from "./get-outer-height.function";

export function processHTMLTextSection(payload: {
    readonly engine: PagedHTMLComputationEngine;
    readonly htmlSection: HTMLSection;
    readonly pageContentSize: PageContentSize;
}) {
    const engine = payload.engine;
    const htmlSection = payload.htmlSection;
    const pageContentSize = payload.pageContentSize;

    const htmlItems = extractHTMLItemsFromSection(htmlSection);
    htmlItems.forEach(htmlItem => {
        htmlItem.style.width = pageContentSize.width + pageContentSize.widthUnit;

        const height = getOuterHeight(htmlItem);
        checkHeight({height, pageContentSize});

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


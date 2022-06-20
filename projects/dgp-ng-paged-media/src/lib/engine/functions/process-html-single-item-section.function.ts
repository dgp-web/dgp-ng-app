import { HTMLSection, PagedHTMLComputationEngine, PageSize } from "../models";
import { checkHeight } from "./check-height.function";

export function processHTMLSingleItemSection(payload: {
    readonly engine: PagedHTMLComputationEngine;
    readonly htmlSection: HTMLSection;
    readonly pageSize: PageSize;
}) {
    const engine = payload.engine;
    const htmlSection = payload.htmlSection;
    const pageSize = payload.pageSize;
    const htmlItem = htmlSection.nativeElement;

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
}

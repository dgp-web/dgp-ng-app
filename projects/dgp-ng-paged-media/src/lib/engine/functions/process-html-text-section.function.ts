import { HTMLSection, PagedHTMLComputationEngine, PageSize } from "../models";
import { extractHTMLItemsFromSection } from "./extract-html-items-from-section.function";
import { createHTMLParagraphElement } from "./create-html-paragraph-element.function";
import { checkHeight } from "./check-height.function";

export function processHTMLTextSection(payload: {
    readonly engine: PagedHTMLComputationEngine;
    readonly htmlSection: HTMLSection;
    readonly pageSize: PageSize;
}) {
    const engine = payload.engine;
    const htmlSection = payload.htmlSection;
    const pageSize = payload.pageSize;

    if (htmlSection.type === "text") {
        const htmlItems = extractHTMLItemsFromSection(htmlSection);
        htmlItems.forEach(htmlItem => {
            htmlItem.style.width = pageSize.width + pageSize.widthUnit;

            const height = htmlItem.getBoundingClientRect().height;
            checkHeight({height, pageSize});

            const container = createHTMLParagraphElement(htmlItem);

            if (height <= engine.currentPageRemainingHeight) {
                engine.currentPage.itemsOnPage.push(container);
                engine.currentPageRemainingHeight -= height;
            } else {
                engine.finishPage();

                engine.currentPage.itemsOnPage.push(container);
                engine.currentPageRemainingHeight -= height;
            }
        });

    }
}

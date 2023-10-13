import { HTMLPageContent, PageContentSize, PagedHTMLComputationEngine } from "../models";
import { createPagedHTMLComputationEngineState } from "./create-paged-html-computation-engine-state.function";

export function extractLonelyHeadings(currentPage: HTMLPageContent): HTMLElement {
    const resultContainer = document.createElement("div");

    const lastHtmlItem = currentPage.itemsOnPage[currentPage.itemsOnPage.length - 1];

    const itemsThatWantContent = new Array<HTMLElement>();
    let isSearchActive = true;

    for (let i = lastHtmlItem.children.length - 1; i >= 0; i--) {
        if (!isSearchActive) continue;

        const item = lastHtmlItem.children.item(i);
        if (item.tagName === "H1") {
            lastHtmlItem.removeChild(item);
            itemsThatWantContent.push(item as HTMLElement);
            console.log("Should remove h1");
        } else {
            isSearchActive = false;
        }
    }

    if (itemsThatWantContent.length === 0) return null;

    itemsThatWantContent.forEach(x => resultContainer.appendChild(x));

    console.log(resultContainer);

    return resultContainer;
}

export function createPagedHTMLComputationEngine(payload: {
    readonly pageContentSize: PageContentSize;
}): PagedHTMLComputationEngine {
    const state = createPagedHTMLComputationEngineState(payload);

    const engine: Partial<PagedHTMLComputationEngine> = state;

    engine.finishPage = () => {
        const containerDiv = extractLonelyHeadings(engine.currentPage);

        engine.pages.push(engine.currentPage);
        state.currentPage = {itemsOnPage: []};

        if (containerDiv) {
            state.currentPage.itemsOnPage.push(containerDiv);
        }

        state.currentPageRemainingHeight = payload.pageContentSize.height;
    };

    return engine as PagedHTMLComputationEngine;

}

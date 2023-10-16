import { HTMLPageContent, PageContentSize, PagedHTMLComputationEngine } from "../models";
import { createPagedHTMLComputationEngineState } from "./create-paged-html-computation-engine-state.function";
import { getOuterHeight } from "./get-outer-height.function";

// TODO: don't remove if there are no other items on the page

export function isLonelyItemCandidate(element: Element) {
    return element.tagName === "H1"
        || element.tagName === "H2"
        || element.tagName === "H3"
        || element.tagName === "H4"
        || element.tagName === "H5"
        || element.classList.contains("dgp-not-last-item-on-page");
}

export function extractLonelyHeadings(currentPage: HTMLPageContent): HTMLElement {
    const resultContainer = document.createElement("div");

    const lastHtmlItem = currentPage.itemsOnPage[currentPage.itemsOnPage.length - 1];

    const itemsThatWantContent = new Array<HTMLElement>();
    let isSearchActive = true;

    if (isLonelyItemCandidate(lastHtmlItem)) {
        isSearchActive = false;

        currentPage.itemsOnPage = currentPage.itemsOnPage
            .filter((x, i) => i !== currentPage.itemsOnPage.length - 1);
        itemsThatWantContent.push(lastHtmlItem as HTMLElement);
    }

    for (let i = lastHtmlItem.children.length - 1; i >= 0; i--) {
        if (!isSearchActive) continue;

        const item = lastHtmlItem.children.item(i);
        if (isLonelyItemCandidate(item)) {
            lastHtmlItem.removeChild(item);
            itemsThatWantContent.push(item as HTMLElement);
        } else {
            isSearchActive = false;
        }
    }

    if (itemsThatWantContent.length === 0) return null;

    itemsThatWantContent.forEach(x => resultContainer.appendChild(x));

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

        state.currentPageRemainingHeight = payload.pageContentSize.height;

        if (containerDiv) {
            const bodyElement = document.querySelector("body");
            /**
             * Needed for correct height computation that includes margins
             */
            containerDiv.style.display = "flex";
            containerDiv.style.flexDirection = "column";
            bodyElement.append(containerDiv);
            const containerHeight = getOuterHeight(containerDiv);
            bodyElement.removeChild(containerDiv);

            state.currentPage.itemsOnPage.push(containerDiv);
            state.currentPageRemainingHeight -= containerHeight;
        }
    };

    return engine as PagedHTMLComputationEngine;

}

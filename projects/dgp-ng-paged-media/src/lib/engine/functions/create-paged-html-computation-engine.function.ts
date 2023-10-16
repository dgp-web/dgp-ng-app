import { HTMLPageContent, PageContentSize, PagedHTMLComputationEngine, PagedHTMLComputationEngineState } from "../models";
import { createPagedHTMLComputationEngineState } from "./create-paged-html-computation-engine-state.function";
import { getOuterHeight } from "./get-outer-height.function";
import { notNullOrUndefined } from "dgp-ng-app";
import * as _ from "lodash";
import { isLonelyItemCandidate } from "./lonely-items/is-lonely-item-candidate.function";

// TODO: don't remove if there are no other items on the page

export function extractLonelyItems(currentPage: HTMLPageContent): HTMLElement {
    const backup = _.cloneDeep(currentPage);

    const resultContainer = document.createElement("div");

    const itemsThatWantContent = new Array<HTMLElement>();

    let isSearchActive = true;

    outer: for (let i = currentPage.itemsOnPage.length - 1; i >= 0; i--) {
        const lastHtmlItem = currentPage.itemsOnPage[i];
        if (!isSearchActive) continue outer;

        /**
         * Check item itself
         */
        if (isLonelyItemCandidate(lastHtmlItem)) {
            currentPage.itemsOnPage[i] = null;
            itemsThatWantContent.push(lastHtmlItem as HTMLElement);
        } else {
            /**
             * Check children
             */
            let isLonelyChildFound = false;

            inner: for (let j = lastHtmlItem.children.length - 1; j >= 0; j--) {
                if (!isSearchActive) continue inner;

                const item = lastHtmlItem.children.item(j);
                if (isLonelyItemCandidate(item)) {
                    lastHtmlItem.removeChild(item);
                    itemsThatWantContent.push(item as HTMLElement);
                } else {
                    isSearchActive = false;
                    isLonelyChildFound = true;
                }
            }

            if (!isLonelyChildFound) {
                isSearchActive = false;
            } else {
                if (lastHtmlItem.children.length === 0) {
                    currentPage.itemsOnPage[i] = null;
                }
            }
        }
    }

    currentPage.itemsOnPage = currentPage.itemsOnPage.filter(notNullOrUndefined);

    itemsThatWantContent.reverse();

    if (itemsThatWantContent.length === 0) return null;

    // TODO: check
    /**
     * Revert if there is nothing more on the page
     */
    if (currentPage.itemsOnPage.length === 0 || currentPage.itemsOnPage[0].children.length === 0) {
        Object.assign(currentPage, backup);
        return null;
    } else {
        itemsThatWantContent.forEach(x => resultContainer.appendChild(x));
    }

    return resultContainer;
}

export function addLonelyItemsToNewPage(payload: {
    readonly lonelyItemsContainer: HTMLElement;
    readonly state: PagedHTMLComputationEngineState;
}) {
    const lonelyItemsContainer = payload.lonelyItemsContainer;
    const state = payload.state;

    if (lonelyItemsContainer) {
        const bodyElement = document.querySelector("body");
        /**
         * Needed for correct height computation that includes margins
         */
        lonelyItemsContainer.style.display = "flex";
        lonelyItemsContainer.style.flexDirection = "column";
        bodyElement.append(lonelyItemsContainer);
        const containerHeight = getOuterHeight(lonelyItemsContainer);
        bodyElement.removeChild(lonelyItemsContainer);

        state.currentPage.itemsOnPage.push(lonelyItemsContainer);
        state.currentPageRemainingHeight -= containerHeight;
    }
}

export function createPagedHTMLComputationEngine(payload: {
    readonly pageContentSize: PageContentSize;
}): PagedHTMLComputationEngine {
    const state = createPagedHTMLComputationEngineState(payload);

    const engine: Partial<PagedHTMLComputationEngine> = state;

    engine.finishPage = () => {
        const lonelyItemsContainer = extractLonelyItems(engine.currentPage);

        engine.pages.push(engine.currentPage);
        state.currentPage = {itemsOnPage: []};

        state.currentPageRemainingHeight = payload.pageContentSize.height;

        addLonelyItemsToNewPage({lonelyItemsContainer, state});
    };

    return engine as PagedHTMLComputationEngine;

}

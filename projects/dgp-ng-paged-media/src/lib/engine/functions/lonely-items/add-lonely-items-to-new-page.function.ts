import { PagedHTMLComputationEngineState } from "../../models";
import { getOuterHeight } from "../get-outer-height.function";

export function tryAddLonelyItemsToNewPage(payload: {
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

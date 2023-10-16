import { PageContentSize, PagedHTMLComputationEngine } from "../models";
import { createPagedHTMLComputationEngineState } from "./create-paged-html-computation-engine-state.function";
import { tryExtractLonelyItems } from "./lonely-items/extract-lonely-items.function";
import { tryAddLonelyItemsToNewPage } from "./lonely-items/add-lonely-items-to-new-page.function";

export function createPagedHTMLComputationEngine(payload: {
    readonly pageContentSize: PageContentSize;
}): PagedHTMLComputationEngine {
    const state = createPagedHTMLComputationEngineState(payload);

    const engine: Partial<PagedHTMLComputationEngine> = state;

    engine.finishPage = (isLastPage?: boolean) => {
        let lonelyItemsContainer: HTMLElement;
        if (!isLastPage) {
            lonelyItemsContainer = tryExtractLonelyItems(engine.currentPage);
        }

        engine.pages.push(engine.currentPage);
        state.currentPage = {itemsOnPage: []};

        state.currentPageRemainingHeight = payload.pageContentSize.height;

        if (!isLastPage) {
            tryAddLonelyItemsToNewPage({lonelyItemsContainer, state});
        }

    };


    return engine as PagedHTMLComputationEngine;

}

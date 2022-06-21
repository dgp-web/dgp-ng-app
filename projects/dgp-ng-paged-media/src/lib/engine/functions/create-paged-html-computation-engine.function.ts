import { PagedHTMLComputationEngine, PageContentSize } from "../models";
import { createPagedHTMLComputationEngineState } from "./create-paged-html-computation-engine-state.function";

export function createPagedHTMLComputationEngine(payload: {
    readonly pageContentSize: PageContentSize;
}): PagedHTMLComputationEngine {
    const state = createPagedHTMLComputationEngineState(payload);

    const engine: Partial<PagedHTMLComputationEngine> = state;

    engine.finishPage = () => {
        engine.pages.push(engine.currentPage);
        state.currentPage = {itemsOnPage: []};
        state.currentPageRemainingHeight = payload.pageContentSize.height;
    };

    return engine as PagedHTMLComputationEngine;

}

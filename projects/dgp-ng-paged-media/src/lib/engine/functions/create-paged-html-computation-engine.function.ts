import { PagedHTMLComputationEngine, PageSize } from "../models";
import { createPagedHTMLComputationEngineState } from "./create-paged-html-computation-engine-state.function";

export function createPagedHTMLComputationEngine(payload: {
    readonly pageSize: PageSize;
}): PagedHTMLComputationEngine {
    const state = createPagedHTMLComputationEngineState(payload);

    const engine: Partial<PagedHTMLComputationEngine> = state;

    engine.reset = () => {
        state.currentPage = {itemsOnPage: []};
        state.currentPageRemainingHeight = payload.pageSize.height;
    };

    return engine as PagedHTMLComputationEngine;

}

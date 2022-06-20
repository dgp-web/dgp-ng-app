import { HTMLPageContent, PagedHTMLComputationEngineState, PageSize } from "../models";

export function createPagedHTMLComputationEngineState(payload: {
    readonly pageSize: PageSize;
}): PagedHTMLComputationEngineState {
    const pages = new Array<HTMLPageContent>();
    const currentPage: HTMLPageContent = {itemsOnPage: []};
    const currentPageRemainingHeight = payload.pageSize.height;

    return {pages, currentPage, currentPageRemainingHeight};
}


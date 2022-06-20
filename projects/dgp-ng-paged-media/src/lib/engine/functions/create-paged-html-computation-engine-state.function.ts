import { HTMLPage, PagedHTMLComputationEngineState, PageSize } from "../models";

export function createPagedHTMLComputationEngineState(payload: {
    readonly pageSize: PageSize;
}): PagedHTMLComputationEngineState {
    const pages = new Array<HTMLPage>();
    const currentPage: HTMLPage = {itemsOnPage: []};
    const currentPageRemainingHeight = payload.pageSize.height;

    return {pages, currentPage, currentPageRemainingHeight};
}


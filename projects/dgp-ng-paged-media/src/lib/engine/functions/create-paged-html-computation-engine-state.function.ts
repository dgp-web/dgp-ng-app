import { HTMLPageContent, PageContentSize, PagedHTMLComputationEngineState } from "../models";

export function createPagedHTMLComputationEngineState(payload: {
    readonly pageContentSize: PageContentSize;
}): PagedHTMLComputationEngineState {
    const pages = new Array<HTMLPageContent>();
    const currentPage: HTMLPageContent = {itemsOnPage: []};
    const currentPageRemainingHeight = payload.pageContentSize.height;

    return {pages, currentPage, currentPageRemainingHeight};
}


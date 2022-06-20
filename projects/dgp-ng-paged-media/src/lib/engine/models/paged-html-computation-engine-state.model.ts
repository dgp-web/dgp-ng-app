import { HTMLPage } from "./html-page.model";

export interface PagedHTMLComputationEngineState {
    pages: HTMLPage[];
    currentPage: HTMLPage;
    currentPageRemainingHeight: number;
}


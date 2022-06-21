import { HTMLPageContent } from "./html-page-content.model";

export interface PagedHTMLComputationEngineState {
    pages: HTMLPageContent[];
    currentPage: HTMLPageContent;
    currentPageRemainingHeight: number;
}


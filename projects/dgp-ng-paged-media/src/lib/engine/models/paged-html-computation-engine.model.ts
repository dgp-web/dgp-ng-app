import { PagedHTMLComputationEngineState } from "./paged-html-computation-engine-state.model";

export interface PagedHTMLComputationEngine extends PagedHTMLComputationEngineState {
    finishPage(isLastPage?: boolean): void;
}

import { HTMLSection, PagedHTMLComputationEngine, PageSize } from "../models";

export function processHTMLHeadingSection(payload: {
    readonly engine: PagedHTMLComputationEngine;
    readonly htmlSection: HTMLSection;
    readonly pageSize: PageSize;
}) {
    const engine = payload.engine;
    const htmlSection = payload.htmlSection;
    const pageSize = payload.pageSize;
    
}

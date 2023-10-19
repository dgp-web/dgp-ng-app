import { HTMLSection, PageContentSize, PagedHTMLContent } from "../models";
import { Many } from "data-modeling";
import { createPagedHTMLComputationEngine } from "./create-paged-html-computation-engine.function";
import { processHTMLTextSection } from "./process-html-text-section.function";
import { processHTMLTableSection } from "./process-html-table-section.function";
import { processHTMLSingleItemSection } from "./process-html-single-item-section.function";

export function computePagedHTML(payload: {
    readonly pageContentSize: PageContentSize;
    readonly htmlSections: Many<HTMLSection>;
}): PagedHTMLContent {

    const engine = createPagedHTMLComputationEngine(payload);
    const pageContentSize = payload.pageContentSize;

    payload.htmlSections.forEach(htmlSection => {

        if (htmlSection.type === "text") {
            processHTMLTextSection({engine, pageContentSize, htmlSection});
        } else if (htmlSection.type === "table") {
            processHTMLTableSection({engine, pageContentSize, htmlSection});
        } else if (htmlSection.type === "singleItem") {
            processHTMLSingleItemSection({engine, pageContentSize, htmlSection});
        }

    });

    engine.finishPage(true);
    return {pages: engine.pages};
}


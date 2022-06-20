import { HTMLSection, PagedHTML, PageSize } from "../models";
import { Many } from "data-modeling";
import { createPagedHTMLComputationEngine } from "./create-paged-html-computation-engine.function";
import { processHTMLTextSection } from "./process-html-text-section.function";
import { processHTMLTableSection } from "./process-html-table-section.function";
import { processHTMLSingleItemSection } from "./process-html-single-item-section.function";

export function computePagedHTML(payload: {
    readonly pageSize: PageSize;
    readonly htmlSections: Many<HTMLSection>;
}): PagedHTML {

    const engine = createPagedHTMLComputationEngine(payload);
    const pageSize = payload.pageSize;

    payload.htmlSections.forEach(htmlSection => {

        if (htmlSection.type === "text") {
            processHTMLTextSection({engine, pageSize, htmlSection});
        } else if (htmlSection.type === "table") {
            processHTMLTableSection({engine, pageSize, htmlSection});
        } else if (htmlSection.type === "singleItem") {
            processHTMLSingleItemSection({engine, pageSize, htmlSection});
        }

    });

    engine.finishPage();
    return {pages: engine.pages};
}


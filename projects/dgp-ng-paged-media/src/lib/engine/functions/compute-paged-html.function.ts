import { HTMLSection, PagedHTML, PageSize } from "../models";
import { Many } from "data-modeling";
import { createPagedHTMLComputationEngine } from "./create-paged-html-computation-engine.function";
import { createHTMLParagraphElement, createHTMLTableElement } from "./create-html-paragraph-element.function";
import { extractHTMLItemsFromSection } from "./extract-html-items-from-section.function";
import { createHTMLWrapperElement } from "./create-html-wrapper-element.function";

// TODO: text section, table section
export function computePagedHTML(payload: {
    readonly pageSize: PageSize;
    readonly htmlSections: Many<HTMLSection>;
}): PagedHTML {

    const engine = createPagedHTMLComputationEngine(payload);

    payload.htmlSections.forEach(htmlSection => {

        if (htmlSection.type === "text") {
            const htmlItems = extractHTMLItemsFromSection(htmlSection);
            htmlItems.forEach(htmlItem => {
                /**
                 * We set the width so we get the correct height
                 */
                htmlItem.style.width = payload.pageSize.width + payload.pageSize.widthUnit;

                const height = htmlItem.getBoundingClientRect().height;
                if (height > payload.pageSize.height) throw Error("Item height exceeds page height. This is not allowed.");

                const container = createHTMLParagraphElement(htmlItem);

                if (height <= engine.currentPageRemainingHeight) {
                    engine.currentPage.itemsOnPage.push(container);
                    engine.currentPageRemainingHeight -= height;
                } else {
                    /**
                     * Finalize HTML page
                     */
                    engine.pages.push(engine.currentPage);
                    engine.reset();

                    engine.currentPage.itemsOnPage.push(container);
                    engine.currentPageRemainingHeight -= height;
                }
            });

        } else if (htmlSection.type === "table") {

            const htmlItems = extractHTMLItemsFromSection(htmlSection);

            let table = createHTMLWrapperElement("table", payload.pageSize);

            htmlItems.forEach(htmlItem => {
                // TODO: handle header row
                const helpTable = createHTMLWrapperElement("table", payload.pageSize);
                helpTable.appendChild(htmlItem);

                const height = table.getBoundingClientRect().height + helpTable.getBoundingClientRect().height;
                if (height > payload.pageSize.height) throw Error("Item height exceeds page height. This is not allowed.");

                if (height <= engine.currentPageRemainingHeight) {
                    table.appendChild(htmlItem);
                } else {
                    engine.currentPage.itemsOnPage.push(createHTMLTableElement(table));
                    engine.pages.push(engine.currentPage);
                    engine.reset();

                    document.body.removeChild(table);
                    table = createHTMLWrapperElement("table", payload.pageSize);
                }

                document.body.removeChild(helpTable);
            });

            engine.currentPage.itemsOnPage.push(createHTMLTableElement(table));
            engine.pages.push(engine.currentPage);
            const height1 = table.getBoundingClientRect().height;
            engine.currentPageRemainingHeight -= height1;
            document.body.removeChild(table);

        } else if (htmlSection.type === "heading") {
            // TODO
        }

    });

    return {pages: engine.pages};
}


import { HTMLSection, PagedHTML, PageSize } from "../models";
import { Many } from "data-modeling";
import { createPagedHTMLComputationEngine } from "./create-paged-html-computation-engine.function";
import { createHTMLParagraphElement, createHTMLTableElement } from "./create-html-paragraph-element.function";
import { extractHTMLItemsFromSection } from "./extract-html-items-from-section.function";

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
            // TODO: Iterate over rows and create a wrapper row in a table
            const htmlItems = extractHTMLItemsFromSection(htmlSection);

            let table = document.createElement("table");
            document.body.appendChild(table);
            table.style.width = payload.pageSize.width + payload.pageSize.widthUnit;

            htmlItems.forEach(htmlItem => {
                // TODO: handle header row
                const helpTable = document.createElement("table");
                helpTable.style.width = payload.pageSize.width + payload.pageSize.widthUnit;
                helpTable.appendChild(htmlItem);
                document.body.appendChild(helpTable);

                const height = table.getBoundingClientRect().height + helpTable.getBoundingClientRect().height;
                if (height > payload.pageSize.height) throw Error("Item height exceeds page height. This is not allowed.");

                if (height <= engine.currentPageRemainingHeight) {
                    table.appendChild(htmlItem);
                } else {
                    engine.currentPage.itemsOnPage.push(createHTMLTableElement(table));
                    engine.pages.push(engine.currentPage);
                    engine.reset();

                    document.body.removeChild(table);
                    table = document.createElement("table");
                    table.style.width = payload.pageSize.width + payload.pageSize.widthUnit;
                    document.body.appendChild(table);
                }

                document.body.removeChild(helpTable);
            });

            // TODO: add last table
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

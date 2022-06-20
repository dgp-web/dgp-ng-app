import { HTMLSection, PagedHTML, PageSize } from "../models";
import { Many } from "data-modeling";
import { createPagedHTMLComputationEngine } from "./create-paged-html-computation-engine.function";
import { createHTMLParagraphElement, createHTMLTableElement } from "./create-html-paragraph-element.function";
import { extractHTMLItemsFromSection } from "./extract-html-items-from-section.function";
import { createHTMLWrapperElement } from "./create-html-wrapper-element.function";

export function computePagedHTML(payload: {
    readonly pageSize: PageSize;
    readonly htmlSections: Many<HTMLSection>;
}): PagedHTML {

    const engine = createPagedHTMLComputationEngine(payload);

    payload.htmlSections.forEach(htmlSection => {

        if (htmlSection.type === "text") {
            const htmlItems = extractHTMLItemsFromSection(htmlSection);
            htmlItems.forEach(htmlItem => {
                htmlItem.style.width = payload.pageSize.width + payload.pageSize.widthUnit;

                const height = htmlItem.getBoundingClientRect().height;
                checkHeight({height, pageSize: payload.pageSize});

                const container = createHTMLParagraphElement(htmlItem);

                if (height <= engine.currentPageRemainingHeight) {
                    engine.currentPage.itemsOnPage.push(container);
                    engine.currentPageRemainingHeight -= height;
                } else {
                    engine.finishPage();

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
                checkHeight({height, pageSize: payload.pageSize});

                if (height <= engine.currentPageRemainingHeight) {
                    table.appendChild(htmlItem);
                } else {
                    engine.currentPage.itemsOnPage.push(createHTMLTableElement(table));
                    engine.finishPage();

                    document.body.removeChild(table);
                    table = createHTMLWrapperElement("table", payload.pageSize);
                }

                document.body.removeChild(helpTable);
            });

            engine.currentPage.itemsOnPage.push(createHTMLTableElement(table));
            const height1 = table.getBoundingClientRect().height;
            engine.currentPageRemainingHeight -= height1;
            document.body.removeChild(table);

        } else if (htmlSection.type === "heading") {
            // TODO
        }

    });

    engine.finishPage();
    return {pages: engine.pages};
}

export function checkHeight(payload: {
    readonly height: number;
    readonly pageSize: PageSize;
}) {
    const height = payload.height;
    const pageSize = payload.pageSize;

    if (height > pageSize.height) throw Error("Item height exceeds page height. This is not allowed.");
}

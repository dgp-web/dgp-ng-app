import { HTMLSection, PageContentSize, PagedHTMLComputationEngine } from "../models";
import { checkHeight } from "./check-height.function";
import { getOuterHeight } from "./get-outer-height.function";
import { createHTMLWrapperElement } from "./create-html-wrapper-element.function";
import { extractHTMLItemsFromTextSection } from "./extract-html-items-from-text-section.function";

export function processHTMLTextSection(payload: {
    readonly engine: PagedHTMLComputationEngine;
    readonly htmlSection: HTMLSection;
    readonly pageContentSize: PageContentSize;
}) {
    const engine = payload.engine;
    const htmlSection = payload.htmlSection;
    const pageContentSize = payload.pageContentSize;

    const refElement = htmlSection.nativeElement;
    const htmlItems = extractHTMLItemsFromTextSection(htmlSection.nativeElement) as NodeListOf<HTMLElement>;

    let div = createHTMLWrapperElement("div", pageContentSize);
    refElement.classList.forEach(x => {
        if (x !== "dgp-hide-in-print") div.classList.add(x);
    });

    htmlItems.forEach(htmlItem => {
        const helpDiv = createHTMLWrapperElement("div", pageContentSize);
        /**
         * Needed for correct height computation that includes margins
         */
        helpDiv.style.display = "flex";
        helpDiv.style.flexDirection = "column";
        helpDiv.appendChild(htmlItem);

        const height = getOuterHeight(div);
        const height02 = getOuterHeight(helpDiv);
        checkHeight({height, pageContentSize});

        if (height + height02 <= engine.currentPageRemainingHeight) {
            div.appendChild(htmlItem);
        } else {
            if (div.children.length > 0) {
                engine.currentPage.itemsOnPage.push(div);
            }
            engine.finishPage();

            document.body.removeChild(div);
            div = createHTMLWrapperElement("div", pageContentSize);
            refElement.classList.forEach(x => {
                if (x !== "dgp-hide-in-print") div.classList.add(x);
            });
            div.appendChild(htmlItem);
        }

        document.body.removeChild(helpDiv);
    });

    engine.currentPage.itemsOnPage.push(div);
    const height1 = getOuterHeight(div);
    engine.currentPageRemainingHeight -= height1;
    document.body.removeChild(div);

}

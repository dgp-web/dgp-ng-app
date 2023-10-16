import { HTMLPageContent } from "../../models";
import { hasOnlyLonelyItems } from "./has-only-lonely-items.function";
import { isLonelyItemCandidate } from "./is-lonely-item-candidate.function";
import { notNullOrUndefined } from "dgp-ng-app";

export function tryExtractLonelyItems(currentPage: HTMLPageContent): HTMLElement {
    if (hasOnlyLonelyItems(currentPage)) return null;

    const resultContainer = document.createElement("div");

    const itemsThatWantContent = new Array<HTMLElement>();

    let isSearchActive = true;

    outer: for (let i = currentPage.itemsOnPage.length - 1; i >= 0; i--) {
        const lastHtmlItem = currentPage.itemsOnPage[i];
        if (!isSearchActive) continue outer;

        /**
         * Check item itself
         */
        if (isLonelyItemCandidate(lastHtmlItem)) {
            currentPage.itemsOnPage[i] = null;
            itemsThatWantContent.push(lastHtmlItem as HTMLElement);
        } else {
            /**
             * Check children
             */
            let isLonelyChildFound = false;

            inner: for (let j = lastHtmlItem.children.length - 1; j >= 0; j--) {
                if (!isSearchActive) continue inner;

                const item = lastHtmlItem.children.item(j);
                if (isLonelyItemCandidate(item)) {
                    lastHtmlItem.removeChild(item);
                    itemsThatWantContent.push(item as HTMLElement);
                } else {
                    isSearchActive = false;
                    isLonelyChildFound = true;
                }
            }

            if (!isLonelyChildFound) {
                isSearchActive = false;
            } else {
                if (lastHtmlItem.children.length === 0) {
                    currentPage.itemsOnPage[i] = null;
                }
            }
        }
    }

    currentPage.itemsOnPage = currentPage.itemsOnPage.filter(notNullOrUndefined);

    itemsThatWantContent.reverse();

    if (itemsThatWantContent.length === 0) return null;

    itemsThatWantContent.forEach(x => resultContainer.appendChild(x));

    return resultContainer;
}

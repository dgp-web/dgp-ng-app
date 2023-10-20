import { HTMLPageContent } from "../../models";
import { isLonelyItemCandidate } from "./is-lonely-item-candidate.function";
import { areAllHtmlChildrenLonely } from "./are-all-html-children-lonely.function";

export function hasOnlyLonelyItems(currentPage: HTMLPageContent): boolean {

    return currentPage.itemsOnPage.every(itemOnPage => {

        // TODO: check if we have a table with only one row with THs are lonely
        if (isLonelyItemCandidate(itemOnPage)) return true;
        if (areAllHtmlChildrenLonely(itemOnPage)) return true;

        return false;
    });

}

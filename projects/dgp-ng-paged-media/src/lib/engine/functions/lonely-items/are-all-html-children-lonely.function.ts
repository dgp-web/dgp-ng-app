import { isLonelyItemCandidate } from "./is-lonely-item-candidate.function";

export function areAllHtmlChildrenLonely(payload: HTMLElement) {

    for (let i = 0; i < payload.children.length; i++) {
        const child = payload.children.item(i);
        if (!isLonelyItemCandidate(child)) return false;
    }

    return false;
}

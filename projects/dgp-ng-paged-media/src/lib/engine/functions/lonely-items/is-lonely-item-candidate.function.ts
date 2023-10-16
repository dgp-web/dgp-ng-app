export function isLonelyItemCandidate(element: Element) {
    return element.tagName === "H1"
        || element.tagName === "H2"
        || element.tagName === "H3"
        || element.tagName === "H4"
        || element.tagName === "H5"
        || element.classList.contains("dgp-not-last-item-on-page");
}

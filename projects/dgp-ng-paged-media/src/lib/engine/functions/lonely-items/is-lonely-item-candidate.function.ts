export function isTableWithOnlyHeaderRow(element: Element): boolean {
    if (element.tagName !== "TABLE") return false;
    const tableRows = element.querySelectorAll("tr") as NodeListOf<HTMLTableRowElement>;
    if (tableRows.length !== 1) return false;

    const tableRow = tableRows[0];

    return tableRow.querySelectorAll("th").length > 0
        && tableRow.querySelectorAll("td").length === 0;

}

export function isLonelyItemCandidate(element: Element) {
    return element.tagName === "H1"
        || element.tagName === "H2"
        || element.tagName === "H3"
        || element.tagName === "H4"
        || element.tagName === "H5"
        // TODO: This can probably be removed since those are not added
        || isTableWithOnlyHeaderRow(element)
        || element.classList.contains("dgp-not-last-item-on-page");
}

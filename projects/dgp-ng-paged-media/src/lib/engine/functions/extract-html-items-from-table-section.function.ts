export function extractHTMLItemsFromTableSection(payload: HTMLElement): NodeListOf<HTMLTableRowElement> {
    return payload.querySelectorAll("tr");
}

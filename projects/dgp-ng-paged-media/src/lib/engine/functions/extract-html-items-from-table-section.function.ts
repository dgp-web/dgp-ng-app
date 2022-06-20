export function extractHTMLItemsFromTableSection(payload: HTMLElement): any {
    return payload.querySelectorAll("tr");
}

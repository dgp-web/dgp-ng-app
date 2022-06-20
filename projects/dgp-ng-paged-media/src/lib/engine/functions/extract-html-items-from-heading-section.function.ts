export function extractHTMLItemsFromHeadingSection(payload: HTMLElement) {
    return payload.querySelectorAll("h1, h2, h3, h4, h5, h6");
}

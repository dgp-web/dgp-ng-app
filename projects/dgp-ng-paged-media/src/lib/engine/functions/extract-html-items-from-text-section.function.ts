export function extractHTMLItemsFromTextSection(payload: HTMLElement) {
    return payload.querySelectorAll("p, ul, ol, pre, h1, h2, h3, h4, h5, h6");
}


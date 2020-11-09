export function serializeDOMNode(svgNode: Node) {
    return new XMLSerializer().serializeToString(svgNode);
}

export function svgString2ImageSrc(svgString: string): string {
    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
}

export function getChartViewBox(payload: {
    readonly containerDOMRect: DOMRectReadOnly;
}): string {
    const rect = payload.containerDOMRect;

    const height = rect.height;
    const width = rect.width;

    return "0 0 " + width + " " + height;
}

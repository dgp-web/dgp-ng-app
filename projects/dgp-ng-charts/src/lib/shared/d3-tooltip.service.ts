import * as d3 from "d3";

function createTooltip(payload: {
    readonly nativeElement: HTMLElement
}) {
    return d3.select(payload.nativeElement)
        .append("div")
        .attr("class", "tooltip")
        .style("position", "fixed")
        .style("visibility", "hidden");
}


function showTooltip(payload: {
    readonly tooltipD3Element: d3.Selection<HTMLDivElement, unknown, null, undefined>;
    readonly referenceD3Element: d3.Selection<Element, unknown, null, undefined>;

    readonly text: string;
}) {
    const node = payload.referenceD3Element.node();
    const rect = node.getBoundingClientRect();

    payload.tooltipD3Element.style("visibility", "visible")
        .style("top", rect.top - 24 + "px")
        .style("left", rect.left + 24 + "px")
        .text(payload.text);
}

function hideTooltip(payload: {
    readonly tooltipD3Element: d3.Selection<HTMLDivElement, unknown, null, undefined>;
}) {
    payload.tooltipD3Element.style("visibility", "hidden");
}

export const d3TooltipService = {
    createTooltip,
    showTooltip,
    hideTooltip
};

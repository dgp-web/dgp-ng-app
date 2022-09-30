export function serializeDOMNode(svgNode: Node) {
    return new XMLSerializer().serializeToString(svgNode);
}

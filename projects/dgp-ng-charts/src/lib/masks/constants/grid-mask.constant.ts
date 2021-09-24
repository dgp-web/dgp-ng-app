import { SVGMask } from "../models";
import { horizontalLinesPattern, verticalLinesPattern } from "../../patterns/constants";

export const gridMask: SVGMask = {
    svgMaskId: "grid-mask",
    label: "Grid",
    svgPatternIds: [
        horizontalLinesPattern.svgPatternId,
        verticalLinesPattern.svgPatternId
    ]
};

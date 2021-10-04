import { SVGMask } from "../models";
import { verticalLinesPattern } from "../../patterns/constants";

export const verticalLinesMask: SVGMask = {
    svgMaskId: "vertical-lines-mask",
    label: "Vertical lines",
    svgPatternIds: [
        verticalLinesPattern.svgPatternId
    ]
};

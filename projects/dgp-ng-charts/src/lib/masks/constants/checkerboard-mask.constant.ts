import { SVGMask } from "../models";
import { checkerboardPattern } from "../../patterns/constants";

export const checkerboardMask: SVGMask = {
    svgMaskId: "checkerboard-mask",
    label: "Checkerboard",
    svgPatternIds: [
        checkerboardPattern.svgPatternId
    ]
};

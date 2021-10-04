import { SVGMask } from "../models";
import { diagonalCheckerboardPattern } from "../../patterns/constants";

export const diagonalCheckerboardMask: SVGMask = {
    svgMaskId: "diagonal-checkerboard-mask",
    label: "Diagonal checkerboard",
    svgPatternIds: [
        diagonalCheckerboardPattern.svgPatternId
    ]
};

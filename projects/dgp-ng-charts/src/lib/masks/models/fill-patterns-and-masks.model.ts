import { SVGPatterns } from "../../patterns/models";
import { SVGMasks } from "./svg-masks.model";

export interface FillPatternsAndMasks {
    readonly patterns: SVGPatterns;
    readonly masks: SVGMasks;
}

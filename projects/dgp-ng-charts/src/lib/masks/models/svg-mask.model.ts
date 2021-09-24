import { Many } from "data-modeling";

export interface SVGMask {
    readonly svgMaskId: string;
    readonly svgPatternIds: Many<string>;
    readonly label: string;
}

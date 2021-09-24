import { SVGSymbol } from "../../../models/box/box-data/svg-symbol.model";
import { Many } from "data-modeling";
import { rectangleSymbol } from "./rectangle-symbol.constant";
import { circleSymbol } from "./circle-symbol.constant";
import { triangleSymbol } from "./triangle-symbol.constant";
import { triangleDownSymbol } from "./triangle-down-symbol.constant";
import { triangleRightSymbol } from "./triangle-right-symbol.constant";
import { triangleLeftSymbol } from "./triangle-left-symbol.constant";
import { starSymbol } from "./star-symbol.constant";
import { rhombusSymbol } from "./rhombus-symbol.constant";

export const svgSymbols: Many<SVGSymbol> = [
    circleSymbol,
    rectangleSymbol,
    triangleSymbol,
    triangleDownSymbol,
    triangleRightSymbol,
    triangleLeftSymbol,
    starSymbol,
    rhombusSymbol
];

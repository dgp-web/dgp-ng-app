import { Shape, SVGSymbol } from "../models";
import { circleSymbol } from "./circle-symbol.constant";
import { rectangleSymbol } from "./rectangle-symbol.constant";
import { rhombusSymbol } from "./rhombus-symbol.constant";
import { triangleSymbol } from "./triangle-symbol.constant";
import { triangleDownSymbol } from "./triangle-down-symbol.constant";
import { triangleLeftSymbol } from "./triangle-left-symbol.constant";
import { triangleRightSymbol } from "./triangle-right-symbol.constant";
import { starSymbol } from "./star-symbol.constant";

export const shapeMap = new Map<Shape, SVGSymbol>([
    [Shape.Circle, circleSymbol],
    [Shape.Rectangle, rectangleSymbol],
    [Shape.Rhombus, rhombusSymbol],
    [Shape.Triangle, triangleSymbol],
    [Shape.TriangleDown, triangleDownSymbol],
    [Shape.TriangleLeft, triangleLeftSymbol],
    [Shape.TriangleRight, triangleRightSymbol],
    [Shape.Star, starSymbol]
]);

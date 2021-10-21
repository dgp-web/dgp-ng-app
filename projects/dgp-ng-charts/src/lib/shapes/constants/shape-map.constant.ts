import { Shape, SVGShape } from "../models";
import { circleShape } from "./circle-shape.constant";
import { rectangleShape } from "./rectangle-shape.constant";
import { rhombusShape } from "./rhombus-shape.constant";
import { triangleShape } from "./triangle-shape.constant";
import { triangleDownShape } from "./triangle-down-shape.constant";
import { triangleLeftShape } from "./triangle-left-shape.constant";
import { triangleRightShape } from "./triangle-right-shape.constant";
import { starShape } from "./star-shape.constant";
import { crossShape } from "./cross-shape.constant";

export const shapeMap = new Map<Shape, SVGShape>([
    [Shape.Circle, circleShape],
    [Shape.Cross, crossShape],
    [Shape.Rectangle, rectangleShape],
    [Shape.Rhombus, rhombusShape],
    [Shape.Triangle, triangleShape],
    [Shape.TriangleDown, triangleDownShape],
    [Shape.TriangleLeft, triangleLeftShape],
    [Shape.TriangleRight, triangleRightShape],
    [Shape.Star, starShape]
]);

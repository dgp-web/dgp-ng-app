import { Many } from "data-modeling";
import { rectangleShape } from "./rectangle-shape.constant";
import { circleShape } from "./circle-shape.constant";
import { triangleShape } from "./triangle-shape.constant";
import { triangleDownShape } from "./triangle-down-shape.constant";
import { triangleRightShape } from "./triangle-right-shape.constant";
import { triangleLeftShape } from "./triangle-left-shape.constant";
import { starShape } from "./star-shape.constant";
import { rhombusShape } from "./rhombus-shape.constant";
import { SVGShape } from "../models";

export const svgShapes: Many<SVGShape> = [
    circleShape,
    rectangleShape,
    triangleShape,
    triangleDownShape,
    triangleRightShape,
    triangleLeftShape,
    starShape,
    rhombusShape
];

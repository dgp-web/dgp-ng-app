import { circleShape } from "./circle-shape.constant";
import { rectangleShape } from "./rectangle-shape.constant";
import { triangleShape } from "./triangle-shape.constant";
import { triangleDownShape } from "./triangle-down-shape.constant";
import { triangleRightShape } from "./triangle-right-shape.constant";
import { triangleLeftShape } from "./triangle-left-shape.constant";
import { rhombusShape } from "./rhombus-shape.constant";
import { starShape } from "./star-shape.constant";

export let svgShapeKeys = {
    circle: circleShape.svgShapeId,
    rectangle: rectangleShape.svgShapeId,
    triangle: triangleShape.svgShapeId,
    triangleDown: triangleDownShape.svgShapeId,
    triangleRight: triangleRightShape.svgShapeId,
    triangleLeft: triangleLeftShape.svgShapeId,
    star: starShape.svgShapeId,
    rhombus: rhombusShape.svgShapeId
};

import { Shape } from "../../shapes/models";
import { Size } from "dgp-ng-app";
import { computeCrossPoints } from "../../shapes/functions/compute-cross-points.function";
import { computeRhombusPoints } from "../../shapes/functions/compute-rhombus-points.function";
import { computeTrianglePoints } from "../../shapes/functions/compute-triangle-points.function";
import { computeTriangleDownPoints } from "../../shapes/functions/compute-triangle-down-points.function";
import { computeTriangleLeftPoints } from "../../shapes/functions/compute-triangle-left-points.function";
import { computeTriangleRightPoints } from "../../shapes/functions/compute-triangle-right-points.function";
import { computeStarPoints } from "../../shapes/functions/compute-star-points.function";

export function computePointsForShape(payload: {
    readonly shape: Shape;
} & Size) {

    switch (payload.shape) {
        case Shape.Cross:
            return computeCrossPoints(payload);
        case Shape.Rhombus:
            return computeRhombusPoints(payload);
        case Shape.Triangle:
            return computeTrianglePoints(payload);
        case Shape.TriangleDown:
            return computeTriangleDownPoints(payload);
        case Shape.TriangleLeft:
            return computeTriangleLeftPoints(payload);
        case Shape.TriangleRight:
            return computeTriangleRightPoints(payload);
        case Shape.Star:
            return computeStarPoints(payload);
    }

}

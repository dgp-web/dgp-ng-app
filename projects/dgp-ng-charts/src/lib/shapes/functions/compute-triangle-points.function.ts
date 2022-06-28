import { Size } from "dgp-ng-app";
import { Many } from "data-modeling";
import { Point } from "../models";

export function computeTrianglePoints(payload: Size): Many<Point> {
    const width = payload.width;
    const height = payload.height;

    return [
        [width / 2, 0],
        [width, height],
        [0, height]
    ];
}

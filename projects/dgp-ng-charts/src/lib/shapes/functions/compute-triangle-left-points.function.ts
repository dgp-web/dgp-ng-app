import { Size } from "dgp-ng-app";
import { Many } from "data-modeling";
import { Point } from "../models";

export function computeTriangleLeftPoints(payload: Size): Many<Point> {
    const width = payload.width;
    const height = payload.height;

    return [
        [0, height / 2],
        [width, 0],
        [width, height]
    ];
}

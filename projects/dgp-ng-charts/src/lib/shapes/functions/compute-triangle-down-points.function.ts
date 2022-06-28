import { Size } from "dgp-ng-app";
import { Many } from "data-modeling";
import { Point } from "../models";

export function computeTriangleDownPoints(payload: Size): Many<Point> {
    const width = payload.width;
    const height = payload.height;

    return [
        [0, 0],
        [width, 0],
        [width / 2, height]
    ];
}

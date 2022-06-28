import { Size } from "dgp-ng-app";
import { Many } from "data-modeling";
import { Point } from "../models";

export function computeCrossPoints(payload: Size): Many<Point> {
    const width = payload.width;
    const height = payload.height;

    return [
        [0, height * 0.3],
        [width * 0.3, 0],
        [width / 2, height * 0.2],
        [width * 0.7, 0],
        [width, height * 0.3],
        [width * 0.8, height / 2],
        [width, height * 0.7],
        [width * 0.7, height],
        [width / 2, height * 0.8],
        [width * 0.3, height],
        [0, height * 0.7],
        [width * 0.2, height * 0.5]
    ];
}

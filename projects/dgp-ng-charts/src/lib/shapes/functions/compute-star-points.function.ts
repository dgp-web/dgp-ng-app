import { Size } from "dgp-ng-app";
import { Many } from "data-modeling";
import { Point } from "../models";

export function computeStarPoints(payload: Size): Many<Point> {
    const width = payload.width;
    const height = payload.height;

    return [
        [0, height * 0.4],
        [width * 0.33, height * 0.3],
        [width / 2, 0],
        [width * 0.66, height * 0.3],
        [width, height * 0.4],
        [width * 0.76, height * 0.64],
        [width * 0.8, height],
        [width * 0.5, height * 0.8],
        [width * 0.2, height],
        [width * 0.24, height * 0.7],
        [0, height * 0.4]
    ];
}

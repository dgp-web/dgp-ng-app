import { Many } from "data-modeling";
import { Point } from "../models";

export function serializePoints(points: Many<Point>): string {
    return points.map(x => x.join(" ")).join(", ");
}

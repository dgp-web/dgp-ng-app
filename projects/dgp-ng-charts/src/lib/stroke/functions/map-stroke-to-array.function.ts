import { Stroke } from "../models";
import { Many } from "data-modeling";

export function mapStrokeToArray(stroke: Stroke): Many<number> {
    switch (stroke) {
        default:
        case Stroke.Default:
            return [0, 0];
        case Stroke.Dashed:
            return [16, 8];
        case Stroke.Dotted:
            return [8, 8];
        case Stroke.DashDotted:
            return [16, 8, 8, 8];
    }
}

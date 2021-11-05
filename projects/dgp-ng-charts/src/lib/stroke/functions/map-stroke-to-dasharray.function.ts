import { Stroke } from "../models";

export function mapStrokeToStrokeDasharray(stroke: Stroke): string {
    switch (stroke) {
        default:
        case Stroke.Default:
            return "0, 0";
        case Stroke.Dashed:
            return "16, 8";
        case Stroke.Dotted:
            return "8, 8";
        case Stroke.DashDotted:
            return "16, 8, 8, 8";
    }
}

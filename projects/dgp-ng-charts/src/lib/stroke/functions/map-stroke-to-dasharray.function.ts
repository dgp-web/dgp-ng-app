import { Stroke } from "../models";
import { mapStrokeToArray } from "./map-stroke-to-array.function";

export function mapStrokeToStrokeDasharray(stroke: Stroke): string {
    const array = mapStrokeToArray(stroke);
    return array.join(", ");
}

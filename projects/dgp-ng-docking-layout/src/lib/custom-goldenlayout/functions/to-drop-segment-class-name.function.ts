import { DropSegment } from "../models/drop-segment.model";

export function toDropSegmentClassName(payload: DropSegment): string {
    return "lm_" + payload;
}

import { DropSegment } from "../models/drop-segment.model";

export function createDropSegmentClassName(payload: DropSegment): string {
    return "lm_" + payload;
}

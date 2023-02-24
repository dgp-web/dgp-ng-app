import { Many } from "data-modeling";
import { Side } from "../models/side.model";
import { DropSegment } from "../models/drop-segment.model";

export const sides: Many<DropSegment> = [
    DropSegment.Right,
    DropSegment.Left,
    DropSegment.Bottom
];

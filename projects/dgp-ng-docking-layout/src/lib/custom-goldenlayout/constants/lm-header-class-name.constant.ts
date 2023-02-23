import { toDropSegmentClassName } from "../functions/to-drop-segment-class-name.function";
import { DropSegment } from "../models/drop-segment.model";

export const lmHeaderClassName = toDropSegmentClassName(DropSegment.Header);

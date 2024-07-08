import { DropSegment } from "../models/drop-segment.model";
import { StackOnDropAssignmentInfo } from "../models/stack-on-drop-assignment-info.model";

export function computeStackOnDropAssignmentInfo(payload: {
    readonly dropSegment: DropSegment;
    readonly parentType: "row" | "column";
}): StackOnDropAssignmentInfo {

    const dropSegment = payload.dropSegment;
    const parentType = payload.parentType;

    const isVertical = dropSegment === DropSegment.Top || dropSegment === DropSegment.Bottom;
    const isHorizontal = dropSegment === DropSegment.Left || dropSegment === DropSegment.Right;
    const insertBefore = dropSegment === DropSegment.Top || dropSegment === DropSegment.Left;
    const hasCorrectParent = (isVertical && parentType === "column") || (isHorizontal && parentType === "row");
    const dimension = isVertical ? "height" : "width";

    return {
        isVertical,
        isHorizontal,
        insertBefore,
        hasCorrectParent,
        dimension
    };
}

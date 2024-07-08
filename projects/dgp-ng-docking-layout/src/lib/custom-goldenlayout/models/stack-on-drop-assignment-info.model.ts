export interface StackOnDropAssignmentInfo {
    readonly dimension: "height" | "width";
    readonly hasCorrectParent: boolean;
    readonly insertBefore: boolean;
    readonly isHorizontal: boolean;
    readonly isVertical: boolean;
}

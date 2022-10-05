import { AngleType } from "./angle-type.model";

export interface Rotate {
    readonly rotateX?: number;
    readonly rotateY?: number;
    readonly rotationAngle?: number;
    readonly rotationAngleType?: AngleType.Degree;
}

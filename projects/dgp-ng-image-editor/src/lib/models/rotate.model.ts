import { AngleType } from "./angle-type.model";

export interface Rotate {
    readonly rotationAngle?: number;
    readonly rotationAngleType?: AngleType.Degree;
}

export interface Position {
    readonly horizontal?: number;
    readonly isHorizontalRelative?: boolean;
    readonly vertical?: number;
    readonly isVerticalRelative?: boolean;
}

export interface Scale {
    readonly width?: number;
    readonly isWidthRelative?: number;
    readonly height?: number;
    readonly isHeightRelative?: number;
}

export enum AngleType {
    Degree = "degree"
}

export interface Rotate {
    readonly angle?: number;
    readonly angleType?: AngleType.Degree;
}

export interface Shear {
    readonly horizontal?: number;
    readonly isHorizontalRelative?: boolean;
    readonly vertical?: number;
    readonly isVerticalRelative?: boolean;
    readonly angleType?: AngleType.Degree;
}

export interface Transform {
    readonly position: Position;
    readonly rotate: Rotate;
    readonly scale: Scale;
    readonly shear: Shear;
}

export interface Size {
    readonly width?: number;
    readonly isWidthRelative?: number;
    readonly height?: number;
    readonly isHeightRelative?: number;
}

export interface RegionOfInterest {
    readonly position: Position;
    readonly size: Size;
}

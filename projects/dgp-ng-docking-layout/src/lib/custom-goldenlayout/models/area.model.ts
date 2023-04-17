import { DropTarget } from "./drop-target.model";

export interface AreaSides<T extends string | number = number> {
    readonly x1: T;
    readonly y1: T;
    readonly x2: T;
    readonly y2: T;
}

export interface AreaSize<T extends string | number = number> extends AreaSides<T> {
    readonly surface: number;
}

export interface Area<T extends string | number = number> extends AreaSize<T> {
    readonly surface: number;
    readonly side?: keyof AreaSides<T>;
    readonly contentItem: DropTarget;
}

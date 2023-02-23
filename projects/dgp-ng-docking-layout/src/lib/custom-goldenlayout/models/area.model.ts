import { DropTarget } from "./drop-target.model";

export interface AreaSides {
    readonly x1: number | string;
    readonly y1: number | string;
    readonly x2: number | string;
    readonly y2: number | string;
}

export interface AreaSize extends AreaSides {
    readonly surface: number;
}

export interface Area extends AreaSize {
    readonly surface: number;
    readonly side?: keyof AreaSides;
    readonly contentItem: DropTarget;
}

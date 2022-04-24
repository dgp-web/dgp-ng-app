import { AbstractContentItemComponent } from "../components/abstract-content-item.component";

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
    readonly contentItem: AbstractContentItemComponent;
}

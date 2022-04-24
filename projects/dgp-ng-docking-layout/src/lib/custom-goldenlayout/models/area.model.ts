import { AbstractContentItemComponent } from "../components/abstract-content-item.component";

export interface Area {
    readonly x1: number;
    readonly y1: number;
    readonly x2: number;
    readonly y2: number;
    readonly surface: number;
    readonly contentItem: AbstractContentItemComponent;
}

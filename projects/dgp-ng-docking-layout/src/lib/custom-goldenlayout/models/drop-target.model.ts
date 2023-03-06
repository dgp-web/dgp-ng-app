import { AbstractContentItemComponent } from "../components/shared/abstract-content-item.component";
import { Area, AreaSides } from "./area.model";

export interface DropTarget {
    _$onDrop(contentItem: AbstractContentItemComponent, area?: Area): void;

    highlightDropZone(x: number, y: number, areaSides?: AreaSides): void;
}

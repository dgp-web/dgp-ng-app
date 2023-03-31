import { AbstractContentItemComponent } from "../components/shared/abstract-content-item.component";
import { Area, AreaSides } from "./area.model";
import { GlComponent } from "../components/component.component";

export interface DropTarget {
    _$onDrop(contentItem: AbstractContentItemComponent | GlComponent, area?: Area): void;

    highlightDropZone(x: number, y: number, areaSides?: AreaSides): void;
}

import { Area, AreaSides } from "./area.model";
import { GlComponent } from "../components/component.component";

export interface DropTarget {
    onDrop(contentItem: any | GlComponent, area?: Area): void;

    highlightDropZone(x: number, y: number, areaSides?: AreaSides): void;
}

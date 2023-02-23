import { AbstractContentItemComponent } from "../components/abstract-content-item.component";
import { Area } from "./area.model";

export interface DropTarget {
    _$onDrop(contentItem: AbstractContentItemComponent, area?: Area): void;
}

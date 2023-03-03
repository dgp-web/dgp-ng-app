import { Vector2 } from "../../common";
import { AbstractContentItemComponent } from "../components/abstract-content-item.component";
import { DragListenerDirective } from "../components/drag-listener.directive";

export interface DragStartEvent {
    readonly coordinates: Vector2;
    readonly contentItem: AbstractContentItemComponent;
    readonly dragListener: DragListenerDirective;
}

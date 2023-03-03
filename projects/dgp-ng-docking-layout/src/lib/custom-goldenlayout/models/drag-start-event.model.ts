import { Vector2 } from "../../common";
import { DragListenerDirective } from "../components/drag-listener.directive";

export interface DragStartEvent {
    readonly coordinates: Vector2;
    readonly dragListener: DragListenerDirective;
}

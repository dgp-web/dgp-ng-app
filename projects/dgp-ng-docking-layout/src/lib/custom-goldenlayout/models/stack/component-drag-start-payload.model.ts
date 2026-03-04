import { Vector2 } from "../../../common";
import type { DragListenerDirective } from "../../components/drag-and-drop/drag-listener.directive";
import type { GlComponent } from "../../components/component.component";
import { DropSegment } from "../drop-segment.model";

export interface ComponentDragStartPayload {
    readonly coordinates: Vector2;
    readonly dragListener: DragListenerDirective;
    readonly contentItemComponent: GlComponent;
    readonly side: DropSegment;
    readonly sided: boolean;
}


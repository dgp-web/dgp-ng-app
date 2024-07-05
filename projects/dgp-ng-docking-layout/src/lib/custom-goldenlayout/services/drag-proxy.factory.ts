import { Injectable } from "@angular/core";
import { DockingLayoutService } from "../docking-layout.service";
import { Vector2 } from "../../common";
import type { DragListenerDirective } from "../components/drag-and-drop/drag-listener.directive";
import type { GlComponent } from "../components/component.component";
import { DragProxy } from "../components/drag-and-drop/drag-proxy.component";
import type { StackComponent } from "../components/tabs/stack.component";

@Injectable()
export class DragProxyFactory {

    constructor(
        private readonly dockingLayoutService: DockingLayoutService
    ) {
    }

    create(payload: {
        readonly coordinates: Vector2,
        readonly dragListener: DragListenerDirective,
        readonly contentItem: GlComponent,
        readonly originalParent: StackComponent
    }): DragProxy {
        return new DragProxy(
            payload.coordinates,
            payload.dragListener,
            this.dockingLayoutService,
            payload.contentItem,
            payload.originalParent
        );
    }

}

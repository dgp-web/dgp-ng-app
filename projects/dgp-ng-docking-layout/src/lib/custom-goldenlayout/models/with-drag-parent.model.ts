import { DragProxy } from "../components/drag-and-drop/drag-proxy.component";

export interface WithDragParent {
    setDragParent(payload: DragProxy);
}

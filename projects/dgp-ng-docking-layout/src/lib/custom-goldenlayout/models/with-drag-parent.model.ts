import { DragProxy } from "../components/drag-and-drop/_drag-proxy.component";

export interface WithDragParent {
    setDragParent(payload: DragProxy);
}

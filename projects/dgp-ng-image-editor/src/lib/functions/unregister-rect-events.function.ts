import { fabric } from "fabric";

export function unregisterRectEvents(rect: fabric.Rect) {
    rect.off("modified");
}

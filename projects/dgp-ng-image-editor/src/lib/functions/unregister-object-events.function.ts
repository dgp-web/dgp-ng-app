import { fabric } from "fabric";

export function unregisterObjectEvents(payload: fabric.Object) {
    payload.off("modified");
}

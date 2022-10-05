import { fabric } from "fabric";
import { isCanvasValid } from "./is-canvas-valid.function";

export function tryAddTo(payload: fabric.Canvas) {
    return (rect: fabric.Object) => {
        if (!isCanvasValid(payload)) return;
        payload.add(rect);
    };
}

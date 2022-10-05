import { fabric } from "fabric";

export function registerUpdateHandler(handler: (e: fabric.IEvent) => void) {
    return (x: fabric.Object) => x.on("modified", handler);
}



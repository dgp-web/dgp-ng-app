import { fabric } from "fabric";
import { unregisterObjectEvents } from "./unregister-object-events.function";

export async function tryDestroyCanvas$(canvas?: fabric.Canvas) {
    if (!canvas) return;

    canvas.getObjects().forEach(unregisterObjectEvents);
    canvas.clear();
    canvas.dispose();
}

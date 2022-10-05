import { fabric } from "fabric";
import { notNullOrUndefined } from "dgp-ng-app";

export function isCanvasValid(canvas: fabric.Canvas) {
    return notNullOrUndefined(canvas)
        && notNullOrUndefined(canvas.getContext());
}

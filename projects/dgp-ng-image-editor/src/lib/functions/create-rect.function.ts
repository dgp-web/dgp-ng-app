import { fabric } from "fabric";
import { ImageRegion } from "../models";

export interface CreateRectPayload {
    readonly region: ImageRegion;
    readonly canvas: fabric.Canvas;
}

export function createRect(payload: CreateRectPayload): fabric.Rect {
    const region = payload.region;
    const canvas = payload.canvas;

    let referenceWidth = 1;
    let referenceHeight = 1;

    /* if (imageSegment.isNormalized) {
         referenceWidth = canvas.getWidth();
         referenceHeight = canvas.getHeight();
     }
 */
    const width = region.width * referenceWidth;
    const height = region.height * referenceHeight;
    const left = region.offsetX * referenceWidth;
    const top = region.offsetY * referenceHeight;

    return new fabric.Rect({
        strokeWidth: 1,
        stroke: "rgba(0,0,0,255)",
        fill: "rgba(0,0,0,255)",
        width,
        height,
        left,
        top,
        data: region,
        lockRotation: true,
        lockScalingFlip: true,
        lockSkewingX: true,
        lockSkewingY: true
    });
}

import { fabric } from "fabric";
import { ImageRegion } from "../models";

export interface CreateRectPayload {
    readonly imageRegion: ImageRegion;
    readonly canvas: fabric.Canvas;
}

export function createRect(payload: CreateRectPayload): fabric.Rect {
    const imageSegment = payload.imageRegion;
    const canvas = payload.canvas;

    let referenceWidth = 1;
    let referenceHeight = 1;

    /* if (imageSegment.isNormalized) {
         referenceWidth = canvas.getWidth();
         referenceHeight = canvas.getHeight();
     }
 */
    const width = imageSegment.width * referenceWidth;
    const height = imageSegment.height * referenceHeight;
    const left = imageSegment.offsetX * referenceWidth;
    const top = imageSegment.offsetY * referenceHeight;

    return new fabric.Rect({
        strokeWidth: 1,
        stroke: "black",
        fill: "rgba(0,0,0,0)",
        width,
        height,
        left,
        top,
        data: imageSegment,
        lockRotation: true,
        lockScalingFlip: true,
        lockSkewingX: true,
        lockSkewingY: true
    });
}

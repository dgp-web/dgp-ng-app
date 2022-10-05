import { fabric } from "fabric";
import { isCanvasValid } from "./is-canvas-valid.function";
import { ImageConfig } from "../models";

export function renderImageToCanvas$(payload: {
    readonly image: fabric.Image;
    readonly canvas: fabric.Canvas;
    readonly imageConfig: ImageConfig;
}): Promise<void> {

    const image = payload.image;
    const canvas = payload.canvas;
    const imageConfig = payload.imageConfig;

    let scaleX: number;
    let scaleY: number;

    if (imageConfig.stretch) {
        scaleX = canvas.getWidth() / image.width;
        scaleY = canvas.getHeight() / image.height;
    } else {
        scaleX = 1;
        scaleY = 1;
    }

    const top = imageConfig.offsetY || 0;
    const left = imageConfig.offsetX || 0;

    return new Promise<void>(resolve => {

        if (isCanvasValid(canvas)) canvas.clear();

        canvas.setBackgroundImage(image, () => {
            resolve();
        }, {
            lockRotation: true,
            scaleX,
            scaleY,
            top,
            left
        });

    });

}

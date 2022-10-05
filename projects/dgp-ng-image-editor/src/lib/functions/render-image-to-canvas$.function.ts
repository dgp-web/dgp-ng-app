import { fabric } from "fabric";
import { isCanvasValid } from "./is-canvas-valid.function";

export function renderImageToCanvas$(payload: {
    readonly image: fabric.Image;
    readonly canvas: fabric.Canvas;
    readonly stretch: boolean;
}): Promise<void> {

    const image = payload.image;
    const canvas = payload.canvas;
    const stretch = payload.stretch;

    let scaleX: number;
    let scaleY: number;

    if (stretch) {
        scaleX = canvas.getWidth() / image.width;
        scaleY = canvas.getHeight() / image.height;
    } else {
        scaleX = 1;
        scaleY = 1;
    }

    return new Promise<void>(resolve => {

        if (isCanvasValid(canvas)) canvas.clear();

        canvas.setBackgroundImage(image, () => {
            resolve();
        }, {
            lockRotation: true,
            scaleX,
            scaleY
        });

    });

}

import { fabric } from "fabric";
import { ImageConfig, ImageRegion } from "../models";
import { Many } from "data-modeling";
import { isCanvasValid } from "./is-canvas-valid.function";
import { getFabricImageFromUrl$ } from "./get-fabric-image-from-url$.function";
import { renderImageToCanvas$ } from "./render-image-to-canvas$.function";
import { toRectWith } from "./to-rect-with.function";
import { tryAddTo } from "./try-add-to.function";

export async function drawThingsOnCanvas$(payload: {
    readonly src: string;
    readonly canvas: fabric.Canvas;
    readonly imageConfig: ImageConfig;
    readonly regions?: Many<ImageRegion>;
}): Promise<void> {

    const src = payload.src;
    const canvas = payload.canvas;
    const imageConfig = payload.imageConfig;
    const regions = payload.regions;

    if (!isCanvasValid(canvas)) return;

    let image: fabric.Image;

    try {
        image = await getFabricImageFromUrl$(src);
        await renderImageToCanvas$({canvas, image, imageConfig});
    } catch (e) {
        console.error(e);
        return;
    }

    if (isCanvasValid(canvas)) {

        if (regions) {
            const rects = regions.map(toRectWith(canvas));
            rects.forEach(tryAddTo(canvas));
        }

        canvas.renderAll();
    }
}

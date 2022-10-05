import { fabric } from "fabric";
import { ImageRegion } from "../models";
import { createRect } from "./create-rect.function";

export function toRectWith(canvas: fabric.Canvas) {
    return (region: ImageRegion) => createRect({region, canvas});
}

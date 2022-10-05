import { fabric } from "fabric";
import { defaultCanvasOptions } from "../constants/default-canvas-options.constant";
import { limitInteractionToContainer } from "./limit-interaction-to-container.function";

export function createCanvas(target: HTMLCanvasElement): fabric.Canvas {
    const result = new fabric.Canvas(target, defaultCanvasOptions);
    limitInteractionToContainer(result);
    return result;
}

import { fabric } from "fabric";
import { constrainMovingToContainer } from "./constain-moving-to-container.function";
import { constrainScalingToContainer } from "./constrain-scaling-to-container.function";

export function limitInteractionToContainer(canvas: fabric.Canvas) {
    canvas.on("object:moving", constrainMovingToContainer);
    canvas.on("object:scaling", constrainScalingToContainer);
}

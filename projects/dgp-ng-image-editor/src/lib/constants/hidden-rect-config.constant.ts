import { fabric } from "fabric";

export const hiddenRectConfig: Partial<fabric.Rect> = {
    stroke: "",
    opacity: 0,
    selectable: false,
    hoverCursor: "default"
};

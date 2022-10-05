import { fabric } from "fabric";

export function constrainMovingToContainer(e: fabric.IEvent) {
    const rectRef = e.target as fabric.Rect;
    const canvasRef = e.target.canvas as fabric.Canvas;

    const boundingRect = rectRef.getBoundingRect();

    const topBound = 0;
    const bottomBound = canvasRef.getHeight();
    const leftBound = 0;
    const rightBound = canvasRef.getWidth();

    if (rectRef.left < leftBound) {
        rectRef.left = leftBound;
    }

    if (rectRef.top < topBound) {
        rectRef.top = topBound;
    }

    if (rectRef.left + boundingRect.width > rightBound) {
        rectRef.left = rightBound - boundingRect.width;
    }

    if (rectRef.top + boundingRect.height > bottomBound) {
        rectRef.top = bottomBound - boundingRect.height;
    }
}

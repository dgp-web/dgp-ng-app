import { fabric } from "fabric";

export function constrainScalingToContainer(event: fabric.IEvent) {
    const rectRef = event.target as fabric.Rect;
    const canvasRef = event.target.canvas as fabric.Canvas;

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

    if (rectRef.left + rectRef.getScaledWidth() > rightBound) {
        rectRef.left = rightBound - rectRef.getScaledWidth() > 0
            ? rightBound - rectRef.getScaledWidth() : 0;
    }

    if (rectRef.top + rectRef.getScaledHeight() > bottomBound) {
        rectRef.top = bottomBound - rectRef.getScaledHeight() > 0 ?
            bottomBound - rectRef.getScaledHeight() : 0;
    }
}

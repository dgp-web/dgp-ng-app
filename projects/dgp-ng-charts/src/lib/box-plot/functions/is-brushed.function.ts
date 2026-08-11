import { BrushCoordinates } from "../models";

export function isBrushed(brushCoordinates: BrushCoordinates, cx: number, cy: number) {
    const x0 = brushCoordinates[0][0];
    const x1 = brushCoordinates[1][0];
    const y0 = brushCoordinates[0][1];
    const y1 = brushCoordinates[1][1];

    return x0 <= cx
        && cx <= x1
        && y0 <= cy
        && cy <= y1;
}

export function isRectangleOverlap(
    x1: number, y1: number, w1: number, h1: number, // first rectangle
    x2: number, y2: number, w2: number, h2: number  // second rectangle
): boolean {
    return x1 < x2 + w2 && 
           x1 + w1 > x2 && 
           y1 < y2 + h2 && 
           y1 + h1 > y2;
}
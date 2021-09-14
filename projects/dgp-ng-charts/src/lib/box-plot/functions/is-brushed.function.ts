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

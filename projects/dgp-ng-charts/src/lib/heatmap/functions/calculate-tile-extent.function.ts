import * as d3 from "d3";
import * as _ from "lodash";

export interface TileExtent {
    readonly width: number;
    readonly height: number;
    readonly startCol: number;
    readonly endCol: number;
    readonly startRow: number;
    readonly endRow: number;
}

export function calculateTileExtent(payload: {
    readonly brushX: number;
    readonly brushY: number;
    readonly brushWidth: number;
    readonly brushHeight: number;
    readonly xAxis: d3.ScaleBand<any>;
    readonly yAxis: d3.ScaleBand<any>;
}): TileExtent {
    const epsilon = 1e-6;

    const bX = payload.xAxis.bandwidth();
    const domainX = payload.xAxis.domain();

    let startCol = domainX.findIndex((_, i) => Math.round((i + 1) * bX) > payload.brushX + epsilon);
    if (startCol === -1) startCol = domainX.length - 1;

    let endCol = _.findLastIndex(domainX, (_, i) => Math.round(i * bX) < payload.brushX + payload.brushWidth - epsilon);
    if (endCol === -1) endCol = 0;

    if (endCol < startCol) {
        endCol = startCol;
    }

    const bY = payload.yAxis.bandwidth();
    const domainY = payload.yAxis.domain();

    let startRow = domainY.findIndex((_, i) => Math.round((i + 1) * bY) > payload.brushY + epsilon);
    if (startRow === -1) startRow = domainY.length - 1;

    let endRow = _.findLastIndex(domainY, (_, i) => Math.round(i * bY) < payload.brushY + payload.brushHeight - epsilon);
    if (endRow === -1) endRow = 0;

    if (endRow < startRow) {
        endRow = startRow;
    }

    return {
        startCol,
        endCol,
        startRow,
        endRow,
        width: Math.max(1, endCol - startCol + 1),
        height: Math.max(1, endRow - startRow + 1)
    };
}

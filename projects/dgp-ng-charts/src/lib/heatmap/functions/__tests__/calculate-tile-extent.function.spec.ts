import * as d3 from "d3";
import { calculateTileExtent } from "../calculate-tile-extent.function";

describe("calculateTileExtent", () => {

    const xAxis = d3.scaleBand()
        .domain(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
        .range([0, 104]); // bandwidth = 10.4

    const yAxis = d3.scaleBand()
        .domain(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
        .range([0, 104]);

    it("should return 1 for a small brush entirely within a tile", () => {
        const result = calculateTileExtent({
            brushX: 2,
            brushY: 2,
            brushWidth: 5,
            brushHeight: 5,
            xAxis: xAxis as any,
            yAxis: yAxis as any
        });
        expect(result.width).toBe(1);
        expect(result.height).toBe(1);
        expect(result.startCol).toBe(0);
        expect(result.endCol).toBe(0);
    });

    it("should return 1 for a small brush at the very start of a tile", () => {
        // Tile 1 starts at Math.round(1 * 10.4) = 10
        const result = calculateTileExtent({
            brushX: 10,
            brushY: 10,
            brushWidth: 2,
            brushHeight: 2,
            xAxis: xAxis as any,
            yAxis: yAxis as any
        });
        expect(result.width).toBe(1);
        expect(result.height).toBe(1);
        expect(result.startCol).toBe(1);
        expect(result.endCol).toBe(1);
    });

    it("should return 1 for a small brush at the very end of a tile (within epsilon)", () => {
        // Tile 0 ends at Math.round(1 * 10.4) = 10
        const result = calculateTileExtent({
            brushX: 9.9999999,
            brushY: 9.9999999,
            brushWidth: 0.0000002,
            brushHeight: 0.0000002,
            xAxis: xAxis as any,
            yAxis: yAxis as any
        });
        expect(result.width).toBe(1);
        expect(result.height).toBe(1);
        // It snaps to Tile 1 because 9.9999999 + epsilon > 10
        expect(result.startCol).toBe(1);
        expect(result.endCol).toBe(1);
    });

    it("should return 2 for a brush spanning two tiles", () => {
        // Tile 0: [0, 10], Tile 1: [10, 21]
        const result = calculateTileExtent({
            brushX: 5,
            brushY: 5,
            brushWidth: 10,
            brushHeight: 10,
            xAxis: xAxis as any,
            yAxis: yAxis as any
        });
        expect(result.width).toBe(2);
        expect(result.height).toBe(2);
        expect(result.startCol).toBe(0);
        expect(result.endCol).toBe(1);
    });

    it("should handle brush at the boundary accurately (floating point)", () => {
        // If brush ends at 10.0000001, it should still be 1 tile if epsilon is 1e-6
        const result = calculateTileExtent({
            brushX: 5,
            brushY: 5,
            brushWidth: 5.0000001,
            brushHeight: 5.0000001,
            xAxis: xAxis as any,
            yAxis: yAxis as any
        });
        expect(result.width).toBe(1);
        expect(result.height).toBe(1);
    });

    it("should return 10 for a brush covering all tiles", () => {
        const result = calculateTileExtent({
            brushX: 0,
            brushY: 0,
            brushWidth: 104,
            brushHeight: 104,
            xAxis: xAxis as any,
            yAxis: yAxis as any
        });
        expect(result.width).toBe(10);
        expect(result.height).toBe(10);
    });

});

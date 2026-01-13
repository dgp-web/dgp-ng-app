import { getListItemNeighbor } from "../get-list-item-neighbor.function";

describe("getListItemNeighbor", () => {

    it(`should return the item with index + 1 for "next"`, () => {
        const collection = [1, 2, 3];
        const item = 2;

        const neighbor = getListItemNeighbor({
            collection, item, neighbor: "next"
        });

        expect(neighbor).toBe(3);
    });

    it(`should return the item with index - 1 for "previous"`, () => {
        const collection = [1, 2, 3];
        const item = 2;

        const neighbor = getListItemNeighbor({
            collection, item, neighbor: "previous"
        });

        expect(neighbor).toBe(1);
    });

});

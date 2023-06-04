import { computeDistance } from "../compute-distance.function";

describe(computeDistance.name, () => {

    it(`should return target-start`, () => {
        const target = 3;
        const start = 1;
        const result = computeDistance({
            target: 3,
            start: 1
        });
        expect(result).toBe(target - start);
    });

});

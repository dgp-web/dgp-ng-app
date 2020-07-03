import { createGuid } from "dgp-ng-app";
import { computeBoxFromValues } from "./functions";
import { Box, BoxValues } from "./models";

describe("dgp-ng-charts functions", () => {

    it(`computeBoxFromValues`, () => {

        const values: BoxValues = {
            boxValuesId: createGuid(),
            originalValues: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        };

        const boxId = createGuid();
        const boxGroupId = createGuid();

        const box = computeBoxFromValues({
            values,
            boxId,
            boxGroupId
        });

        const expectedBox: Box = {
            boxId,
            boxGroupId,
            boxValuesId: values.boxValuesId,
            quantiles: {
                max: 10,
                upper: 6.75,
                median: 5.5,
                lower: 2.25,
                min: 1
            },
            outliers: []
        };

        expect(box)
            .toEqual(expectedBox);

    });

});

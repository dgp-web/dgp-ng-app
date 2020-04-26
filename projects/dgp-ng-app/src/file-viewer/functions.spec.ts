import { getFileItemSizeLabel } from "./functions";

describe("file-viewer functions", () => {

    it(`getFileItemSizeLabel(500) should return 0.50 Kb`, () => {
        expect(getFileItemSizeLabel(500))
            .toBe("0.50 Kb");
    });

    it(`getFileItemSizeLabel(1500) should return 0.00 Mb`, () => {
        expect(getFileItemSizeLabel(1500))
            .toBe("0.00 Mb");
    });

});

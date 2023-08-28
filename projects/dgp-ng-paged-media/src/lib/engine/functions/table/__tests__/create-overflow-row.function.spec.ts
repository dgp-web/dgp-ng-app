import { createOverflowRow, OverflowRow } from "../create-overflow-row.function";
import { OverflowingCells } from "../remove-overflowing-cells-from-row.function";

describe("createOverflowRow", () => {

    const originalRowIndex = 1;
    const content01 = "Content 01";
    const content02 = "Content 02";

    it(`should create a row listing cell contents separated by <br>`, () => {
        const tableCell01 = document.createElement("td");
        tableCell01.innerHTML = content01;

        const tableCell02 = document.createElement("td");
        tableCell02.innerHTML = content02;

        const payload: OverflowingCells = {
            originalRowIndex,
            cells: [
                {tableCell: tableCell01},
                {tableCell: tableCell02}
            ]
        };

        const result = createOverflowRow(payload);

        const tableRow = document.createElement("tr");
        tableRow.innerHTML = content01 + "<br>" + content02;

        const expectedResult: OverflowRow = {originalRowIndex, tableRow};

        expect(result).toEqual(expectedResult);
    });

    xit(`should prefix rows with column labels if it exists`, () => {

    });

});

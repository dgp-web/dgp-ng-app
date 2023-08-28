import { createOverflowRow, OverflowRow } from "../create-overflow-row.function";
import { OverflowingCells } from "../remove-overflowing-cells-from-row.function";

describe("createOverflowRow", () => {

    xit(`should create a row listing cell contents separated by <br>`, () => {
        const tableCell01 = document.createElement("td");
        tableCell01.innerHTML = "Content 01";

        const tableCell02 = document.createElement("td");
        tableCell02.innerHTML = "Content 02";

        const originalRowIndex = 1;

        const payload: OverflowingCells = {
            originalRowIndex,
            cells: [{
                columnKey: undefined,
                tableCell: tableCell01
            }, {
                columnKey: undefined,
                tableCell: tableCell02
            }]
        };

        const result = createOverflowRow(payload);

        const tableRow = document.createElement("tr");
        tableRow.innerHTML = "Content 01 <br>Content 02";

        const expectedResult: OverflowRow = {originalRowIndex, tableRow};

        expect(result).toEqual(expectedResult);
    });

    xit(`should prefix rows with column labels if it exists`, () => {

    });

});

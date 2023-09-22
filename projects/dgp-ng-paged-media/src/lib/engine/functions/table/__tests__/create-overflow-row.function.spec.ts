import { createOverflowRow, OverflowRow } from "../create-overflow-row.function";
import { OverflowingCellsInfo } from "../remove-overflowing-cells-from-row.function";

describe("createOverflowRow", () => {

    const lastVisibleColumnIndex = 0;

    const originalRowIndex = 1;
    const content01 = "Content 01";
    const content02 = "Content 02";

    const columnKey01 = "Column 01";
    const columnKey02 = "Column 02";

    it(`should create a row listing cell contents separated by <br>`, () => {
        const tableCell01 = document.createElement("td");
        tableCell01.innerHTML = content01;

        const tableCell02 = document.createElement("td");
        tableCell02.innerHTML = content02;

        const payload: OverflowingCellsInfo = {
            lastVisibleColumnIndex,
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

    it(`should prefix rows with column labels if it exists`, () => {
        const tableCell01 = document.createElement("td");
        tableCell01.innerHTML = content01;

        const tableCell02 = document.createElement("td");
        tableCell02.innerHTML = content02;

        const payload: OverflowingCellsInfo = {
            lastVisibleColumnIndex,
            originalRowIndex,
            cells: [
                {tableCell: tableCell01, columnKey: columnKey01},
                {tableCell: tableCell02, columnKey: columnKey02}
            ]
        };

        const result = createOverflowRow(payload);

        const tableRow = document.createElement("tr");
        tableRow.innerHTML = columnKey01 + ": " + content01
            + "<br>"
            + columnKey02 + ": " + content02;

        const expectedResult: OverflowRow = {originalRowIndex, tableRow};

        expect(result).toEqual(expectedResult);
    });

});

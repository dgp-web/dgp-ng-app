import { OverflowRow } from "../create-overflow-row.function";
import { addOverflowRows } from "../add-overflow-rows.function";

describe("addOverflowRows", () => {

    const table = document.createElement("table");
    const originalTableRow01 = document.createElement("tr");
    const originalTableRow02 = document.createElement("tr");
    table.append(originalTableRow01, originalTableRow02);

    const overflowTableRow01 = document.createElement("tr");
    overflowTableRow01.innerHTML = "Content 01";

    const overflowRow01: OverflowRow = {
        originalRowIndex: 0,
        tableRow: overflowTableRow01
    };

    const overflowTableRow02 = document.createElement("tr");
    overflowTableRow02.innerHTML = "Content 02";

    const overflowRow02: OverflowRow = {
        originalRowIndex: 1,
        tableRow: overflowTableRow02
    };

    const overflowRows = [overflowRow01, overflowRow02];

    it(`should add rows after the index of the original rows`, () => {
        const result = addOverflowRows({overflowRows, table});
        
        const expectedResult = `<tr></tr><tr>Content 01</tr><tr></tr><tr>Content 02</tr>`;
        expect(result.innerHTML).toEqual(expectedResult);
    });

});

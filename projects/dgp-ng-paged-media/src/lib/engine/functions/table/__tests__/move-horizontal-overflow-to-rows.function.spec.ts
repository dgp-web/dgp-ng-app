import { moveHorizontalOverflowToRows } from "../move-horizontal-overflow-to-rows.function";
import { PageContentSize } from "../../../models";

describe("moveHorizontalOverflowToRows", () => {

    const pageContentSize: PageContentSize = {
        width: 400,
        height: 400,
        widthUnit: "px",
        heightUnit: "px"
    };

    /**
     * Original table
     */

    const table = document.createElement("table");

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th style='min-width: 160px;'>Attribute 01</th><th style='min-width: 160px;'>Attribute 02</th><th style='min-width: 160px;'>Attribute 03</th>";

    const regularRow = document.createElement("tr");
    regularRow.innerHTML = "<td style='min-width: 160px;'>Value 01</td><td style='min-width: 160px;'>Value 02</td><td style='min-width: 160px;'>Value 03</td>";

    table.append(headerRow, regularRow);

    /**
     * Expected table
     */

    const expectedTable = document.createElement("table");

    const expectedHeaderRow = document.createElement("tr");
    expectedHeaderRow.innerHTML = "<th style='min-width: 160px;'>Attribute 01</th><th style='min-width: 160px;'>Attribute 02</th>";

    const expectedRegularRow = document.createElement("tr");
    expectedRegularRow.innerHTML = "<td style='min-width: 160px;'>Value 01</td><td style='min-width: 160px;'>Value 02</td>";

    const expectedOverflowRow = document.createElement("tr");
    expectedOverflowRow.innerHTML = "<td style='min-width: 160px;' colspan='2'>Attribute 03: Value 03</td>";

    expectedTable.append(expectedHeaderRow, expectedRegularRow, expectedOverflowRow);

    it(`should move the third column of the regular row to a new row`, () => {
        const result = moveHorizontalOverflowToRows({table, pageContentSize});
        expect(result.innerHTML).toEqual(expectedTable.innerHTML);
    });

});

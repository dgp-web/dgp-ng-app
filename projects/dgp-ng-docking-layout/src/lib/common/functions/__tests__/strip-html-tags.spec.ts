import { stripHtmlTags } from "@dgp/common";

describe("stripHtmlTags", () => {

    it("should remove html tags form a string.", () => {

        expect(stripHtmlTags("<div style='background: green;'>Test</div>")).toBe("Test");

    });

});

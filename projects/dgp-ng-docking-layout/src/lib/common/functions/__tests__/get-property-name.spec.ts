import { getPropertyName } from "@dgp/common";

interface TestType {
    testAttribute: string;
}

describe("getPropertyName", () => {

    it("should return the name of the last attribute accessed by the passed function as a string.", () => {

        expect(getPropertyName((x: TestType) => x.testAttribute)).toBe("testAttribute");

    });


});

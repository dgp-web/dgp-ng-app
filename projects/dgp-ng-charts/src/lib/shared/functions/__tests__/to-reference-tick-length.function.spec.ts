import { toReferenceTickLength } from "../to-reference-tick-length.function";

describe("toReferenceTickLength", () => {

    it(`should replace "." and ","`, () => {
        const payload = "123,456.789";

        const process = toReferenceTickLength();
        const result = process(payload);

        expect(result).toEqual(9);
    });

});

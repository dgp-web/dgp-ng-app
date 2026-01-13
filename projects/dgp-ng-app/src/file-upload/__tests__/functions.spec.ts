import { toFileItemActionContext, toFileItemActionContextKey } from "../functions";
import { FileItem } from "../../file-viewer/models";
import { createGuid } from "../../broadcast/functions/create-guid.function";

describe("file-upload functions", () => {

    describe(`toFileItemActionContext`, () => {

        it(`should use the hashed item value as key`, () => {
            const fileItem: FileItem = {
                fileItemId: createGuid(),
                size: 5,
                fileName: "",
                creationDate: new Date(),
                url: "",
                extension: ""
            };
            const result = toFileItemActionContext(fileItem);

            expect(result.key).toBe(toFileItemActionContextKey(fileItem));
            expect(result.label).toBe("File");
            expect(result.type).toBe("fileItem");
            expect(result.value).toBe(fileItem);
        });

    });

});

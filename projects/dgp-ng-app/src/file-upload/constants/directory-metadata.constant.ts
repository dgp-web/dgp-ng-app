import { ModelMetadata } from "data-modeling";
import { Directory } from "../../file-viewer/models";

export const directoryMetadata: ModelMetadata<Directory> = {
    id: x => x.directoryId
};

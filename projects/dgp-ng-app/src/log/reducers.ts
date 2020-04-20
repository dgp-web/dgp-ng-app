import { createEntityStore } from "entity-store";
import { LogStoreFeature, LogStoreSchema } from "./models";

export const logStore = createEntityStore<LogStoreSchema, LogStoreFeature>({
    entityTypes: [
        "logEntry"
    ],
    storeFeature: "LogStore"
});

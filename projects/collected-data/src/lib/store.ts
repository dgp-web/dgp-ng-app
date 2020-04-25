import { createEntityStore } from "entity-store";
import { CollectedDataEntities, CollectedDataStoreFeature } from "./models";

export const collectedDataEntityStore = createEntityStore<CollectedDataEntities, CollectedDataStoreFeature>({
    entityTypes: [
        "collectedData",

        "collectedAttribute",
        "collectionConfig",
        "collectionTarget",
        "collectionTime",

        "collectedDataSummary",
        "collectedDataValues"
    ],
    storeFeature: "CollectedData"
});

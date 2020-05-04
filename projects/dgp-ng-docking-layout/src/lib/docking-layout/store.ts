import { createEntityStore } from "entity-store";
import { DockingLayoutEntities, DockingLayoutStoreFeature } from "./models";

export const dockingLayoutEntityStore = createEntityStore<DockingLayoutEntities, DockingLayoutStoreFeature>({
    storeFeature: "DockingLayout",
    entityTypes: [
        "dockingLayout",
        "dockingLayoutConfig"
    ]
});

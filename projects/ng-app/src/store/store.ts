import { createEntityStore, EntityStateMap } from "entity-store";

export interface User {
    readonly userId: string;
    readonly firstName: string;
    readonly lastName: string;
}

export interface AppEntities {
    readonly user: User;
}

export interface AppState extends EntityStateMap<AppEntities> {
}

export const appEntityStore = createEntityStore<AppEntities>({
    entityTypes: ["user"]
});
